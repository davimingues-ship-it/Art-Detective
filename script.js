
console.log("Real or AI carregado!");

// ELEMENTOS DA TELA

const startButton = document.getElementById("start-button");
const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");
const result = document.getElementById("result");

// RESPOSTA CORRETA TEMPORÁRIA

const correctAnswer = "B";

// BOTÃO COMEÇAR

if (startButton) {
    startButton.addEventListener("click", function() {
        homeScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");
    });
}

// BOTÕES DAS PINTURAS

const paintings = document.querySelectorAll(".painting");

paintings.forEach(function(painting) {

    painting.addEventListener("click", function() {

        const selectedAnswer = painting.dataset.answer;

        console.log("Você escolheu:", selectedAnswer);

        if (selectedAnswer === correctAnswer) {
            result.textContent = "PARABÉNS! VOCÊ ACERTOU!";
        } else {
            result.textContent = "OPS! RESPOSTA ERRADA! TENTE NOVAMENTE NA PRÓXIMA RODADA.";
        }

        paintings.forEach(function(item) {
            item.disabled = true;
        });

    });

});

console.log("Botões das pinturas configurados!");
