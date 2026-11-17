
const startButton = document.getElementById("start-button");

const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");

const result = document.getElementById("result");

const correctAnswer = "B";

// COMEÇAR JOGO

startButton.addEventListener("click", function() {

    homeScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

});

// ESCOLHER UMA PINTURA

const paintings = document.querySelectorAll(".painting");

paintings.forEach(function(painting) {

    painting.addEventListener("click", function() {

        const selectedAnswer = painting.dataset.answer;

        if (selectedAnswer === correctAnswer) {

            result.textContent = "Parabéns! Você acertou!";

        } else {

            result.textContent = "Ops! Essa não é a pintura verdadeira.";

        }

        paintings.forEach(function(item) {
            item.disabled = true;
        });

    });

});
