
document.addEventListener("DOMContentLoaded", function () {
    const homeScreen = document.getElementById("home-screen");
    const gameScreen = document.getElementById("game-screen");
    const endScreen = document.getElementById("end-screen");

    const startButton = document.getElementById("start-button");
    const nextButton = document.getElementById("next-button");
    const restartButton = document.getElementById("restart-button");
    const quitButton = document.getElementById("quit-button");

    const cards = document.querySelectorAll(".painting-card");
    const scoreElement = document.getElementById("score");
    const roundLabel = document.getElementById("round-label");
    const resultPanel = document.getElementById("result-panel");
    const resultTag = document.getElementById("result-tag");
    const resultTitle = document.getElementById("result-title");
    const resultDescription = document.getElementById("result-description");

    const finalScore = document.getElementById("final-score");
    const finalMessage = document.getElementById("final-message");

    // ==================================================
    // ÁREA 1: EDITE AS RODADAS E AS RESPOSTAS AQUI
    // ==================================================

    const rounds = [
        {
            correct: "B",
            explanation: "A obra B foi criada por um artista humano. Repare nas características e nos detalhes da pintura."
        },
        {
            correct: "D",
            explanation: "A obra D é a pintura humana desta rodada. Observe as escolhas e os detalhes feitos pelo artista."
        },
        {
            correct: "A",
            explanation: "A obra A foi feita por uma pessoa. Nem sempre é fácil distinguir uma criação humana de uma imagem de IA!"
        },
        {
            correct: "C",
            explanation: "A obra C é a autêntica desta rodada. Parabéns por chegar até aqui!"
        }
    ];

    // ==================================================
    // ÁREA 2: FUNCIONAMENTO DO JOGO
    // Normalmente, não precisa mexer nesta parte.
    // ==================================================

    let currentRound = 0;
    let score = 0;
    let answered = false;

    function showScreen(screenToShow) {
        homeScreen.hidden = true;
        gameScreen.hidden = true;
        endScreen.hidden = true;

        screenToShow.hidden = false;
    }

    function startGame() {
        currentRound = 0;
        score = 0;
        scoreElement.textContent = score;

        showScreen(gameScreen);
        loadRound();
    }

    function loadRound() {
        answered = false;

        roundLabel.textContent =
            "RODADA " + String(currentRound + 1).padStart(2, "0") +
            " / " + String(rounds.length).padStart(2, "0");

        resultPanel.hidden = true;

        cards.forEach(function (card) {
            card.disabled = false;
            card.classList.remove("selected", "correct", "wrong");
        });
    }

    function chooseAnswer(card) {
        if (answered) return;

        answered = true;

        const selectedAnswer = card.dataset.answer;
        const correctAnswer = rounds[currentRound].correct;
        const isCorrect = selectedAnswer === correctAnswer;

        if (isCorrect) {
            score++;
            scoreElement.textContent = score;

            resultTag.textContent = "✓ RESPOSTA CERTA";
            resultTag.style.color = "var(--green)";
            resultTitle.textContent = "Você acertou!";
        } else {
            resultTag.textContent = "✕ NÃO FOI DESSA VEZ";
            resultTag.style.color = "var(--red)";
            resultTitle.textContent = "Quase! A resposta era " + correctAnswer + ".";
        }

        resultDescription.textContent = rounds[currentRound].explanation;

        cards.forEach(function (item) {
            item.disabled = true;

            if (item.dataset.answer === correctAnswer) {
                item.classList.add("correct");
            }

            if (item === card && !isCorrect) {
                item.classList.add("wrong");
            }

            if (item === card) {
                item.classList.add("selected");
            }
        });

        resultPanel.hidden = false;

        if (currentRound === rounds.length - 1) {
            nextButton.textContent = "VER RESULTADO →";
        } else {
            nextButton.textContent = "PRÓXIMA RODADA →";
        }
    }

    function nextRound() {
        currentRound++;

        if (currentRound >= rounds.length) {
            finishGame();
            return;
        }

        loadRound();
    }

    function finishGame() {
        showScreen(endScreen);
        finalScore.textContent = score + " / " + rounds.length;

        if (score === rounds.length) {
            finalMessage.textContent = "Incrível! Você acertou todas as obras!";
        } else if (score >= 2) {
            finalMessage.textContent = "Muito bem! Você tem um bom olhar para a arte.";
        } else {
            finalMessage.textContent = "Continue praticando. Nem sempre é fácil distinguir arte humana de IA!";
        }
    }

    function returnHome() {
        showScreen(homeScreen);
    }

    startButton.addEventListener("click", startGame);
    restartButton.addEventListener("click", startGame);
    nextButton.addEventListener("click", nextRound);
    quitButton.addEventListener("click", returnHome);

    cards.forEach(function (card) {
        card.addEventListener("click", function () {
            chooseAnswer(card);
        });
    });

    // O jogo sempre começa na tela inicial.
    showScreen(homeScreen);
});
