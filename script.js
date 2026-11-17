
console.log("Real or AI iniciado!");

const startButton = document.getElementById("start-button");
const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");
const result = document.getElementById("result");

const correctAnswer = "B";

// GARANTIR QUE O JOGO COMECE NA TELA INICIAL

homeScreen.hidden = false;
gameScreen.hidden = true;

// ABRIR O JOGO

startButton.addEventListener("click", function() {

    homeScreen.hidden = true;
    gameScreen.hidden = false;

    console.log("Jogo iniciado!");

});

// ESCOLHER UMA PINTURA

const paintings = document.querySelectorAll(".painting");

paintings.forEach(function(painting) {

    painting.addEventListener("click", function() {

        const selectedAnswer = painting.dataset.answer;

        if (selectedAnswer === correctAnswer) {
            result.textContent = "PARABÉNS! VOCÊ ACERTOU!";
        } else {
            result.textContent = "OPS! RESPOSTA ERRADA!";
        }

        paintings.forEach(function(item) {
            item.disabled = true;
        });

    });

});
