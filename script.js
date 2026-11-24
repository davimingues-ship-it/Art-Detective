
// ======================================================
// ÁREA 1 — BANCO DE IMAGENS
// EDITE ESTA PARTE PARA TROCAR AS PINTURAS
// ======================================================

const rodadas = [
    {
        nome: "Clássica",
        titulo: "Abaporu",
        explicacao: "Abaporu é uma obra de Tarsila do Amaral. Observe as proporções exageradas, as formas e as cores características.",
        imagens: [
            { arquivo: "images/abaporu-real.jpg", correta: true },
            { arquivo: "images/abaporu-ai-1.png", correta: false },
            { arquivo: "images/abaporu-ai-2.png", correta: false },
            { arquivo: "images/abaporu-ai-3.png", correta: false }
        ]
    },
    {
        nome: "Desafio",
        titulo: "O Grito",
        explicacao: "O Grito é uma obra de Edvard Munch. Observe as pinceladas, o céu ondulado e a expressão da figura.",
        imagens: [
            { arquivo: "images/grito-real.jpg", correta: true },
            { arquivo: "images/grito-ai-1.png", correta: false },
            { arquivo: "images/grito-ai-2.png", correta: false },
            { arquivo: "images/grito-ai-3.png", correta: false }
        ]
    },
    {
        nome: "História da Arte",
        titulo: "Mona Lisa",
        explicacao: "A Mona Lisa é uma obra de Leonardo da Vinci. Observe o sorriso, as mãos e a paisagem ao fundo.",
        imagens: [
            { arquivo: "images/monalisa-real.jpg", correta: true },
            { arquivo: "images/monalisa-ai-1.png", correta: false },
            { arquivo: "images/monalisa-ai-2.png", correta: false },
            { arquivo: "images/monalisa-ai-3.png", correta: false }
        ]
    },
    {
        nome: "Olho Clínico",
        titulo: "A Criação de Adão",
        explicacao: "A Criação de Adão é um afresco de Michelangelo. Observe as mãos, a anatomia das figuras e os detalhes do cenário.",
        imagens: [
            { arquivo: "images/criacao-real.jpg", correta: true },
            { arquivo: "images/criacao-ai-1.png", correta: false },
            { arquivo: "images/criacao-ai-2.png", correta: false },
            { arquivo: "images/criacao-ai-3.png", correta: false }
        ]
    },
    {
        nome: "Especialista",
        titulo: "O Filho do Homem",
        explicacao: "O Filho do Homem é uma obra de René Magritte. A maçã que cobre o rosto é um dos elementos mais conhecidos da pintura.",
        imagens: [
            { arquivo: "images/filho-homem-real.jpg", correta: true },
            { arquivo: "images/filho-homem-ai-1.png", correta: false },
            { arquivo: "images/filho-homem-ai-2.png", correta: false },
            { arquivo: "images/filho-homem-ai-3.png", correta: false }
        ]
    }
];

// ======================================================
// ÁREA 2 — ELEMENTOS DA PÁGINA
// NÃO ALTERE
// ======================================================

const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");

const roundTitle = document.getElementById("round-title");
const roundCounter = document.getElementById("round-counter");
const roundTheme = document.getElementById("round-theme");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");

const paintingGrid = document.getElementById("painting-grid");
const feedback = document.getElementById("feedback");

const finalScore = document.getElementById("final-score");
const finalMessage = document.getElementById("final-message");
const finalDescription = document.getElementById("final-description");
const finalCorrect = document.getElementById("final-correct");
const finalWrong = document.getElementById("final-wrong");
const finalTotal = document.getElementById("final-total");

// ======================================================
// ÁREA 3 — ESTADO DO JOGO
// NÃO ALTERE
// ======================================================

let rodadaAtual = 0;
let pontuacao = 0;
let respondido = false;
let imagensEmbaralhadas = [];

// ======================================================
// ÁREA 4 — EMBARALHAMENTO
// NÃO ALTERE
// ======================================================

function embaralhar(lista) {
    const copia = [...lista];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
}

// ======================================================
// ÁREA 5 — INICIAR E REINICIAR
// NÃO ALTERE
// ======================================================

function iniciarJogo() {
    rodadaAtual = 0;
    pontuacao = 0;
    respondido = false;

    scoreElement.textContent = pontuacao;

    homeScreen.hidden = true;
    resultScreen.hidden = true;
    gameScreen.hidden = false;

    mostrarRodada();
}

function reiniciarJogo() {
    iniciarJogo();
}

// ======================================================
// ÁREA 6 — MOSTRAR UMA RODADA
// NÃO ALTERE
// ======================================================

function mostrarRodada() {
    respondido = false;

    const rodada = rodadas[rodadaAtual];

    roundTitle.textContent = "Rodada " + (rodadaAtual + 1);
    roundCounter.textContent =
        "RODADA " + (rodadaAtual + 1) + " DE " + rodadas.length;

    roundTheme.textContent = rodada.nome.toUpperCase();

    progressBar.style.width =
        ((rodadaAtual + 1) / rodadas.length * 100) + "%";

    paintingGrid.innerHTML = "";
    feedback.hidden = true;
    feedback.innerHTML = "";
    nextButton.hidden = true;

    imagensEmbaralhadas = embaralhar(rodada.imagens);

    const letras = ["A", "B", "C", "D"];

    imagensEmbaralhadas.forEach(function(imagem, indice) {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "answer-button";

        const img = document.createElement("img");
        img.src = imagem.arquivo;
        img.alt = "Pintura alternativa " + letras[indice];

        // Mostra um aviso se o arquivo não existir ou não carregar.
        img.onerror = function() {
            const aviso = document.createElement("div");
            aviso.className = "image-missing";
            aviso.textContent =
                "Imagem não encontrada: " + imagem.arquivo;

            img.replaceWith(aviso);
        };

        const legenda = document.createElement("span");
        legenda.className = "answer-label";

        const letra = document.createElement("span");
        letra.className = "answer-letter";
        letra.textContent = letras[indice];

        const texto = document.createElement("span");
        texto.textContent = "Alternativa " + letras[indice];

        legenda.appendChild(letra);
        legenda.appendChild(texto);

        botao.appendChild(img);
        botao.appendChild(legenda);

        botao.addEventListener("click", function() {
            verificarResposta(indice);
        });

        paintingGrid.appendChild(botao);
    });
}

// ======================================================
// ÁREA 7 — VERIFICAR A RESPOSTA
// NÃO ALTERE
// ======================================================

function verificarResposta(indiceEscolhido) {
    if (respondido) {
        return;
    }

    respondido = true;

    const respostaEscolhida = imagensEmbaralhadas[indiceEscolhido];
    const respostaCorreta = imagensEmbaralhadas.find(
        function(imagem) {
            return imagem.correta === true;
        }
    );

    const acertou = respostaEscolhida.correta === true;

    if (acertou) {
        pontuacao++;
        scoreElement.textContent = pontuacao;
    }

    const botoes = paintingGrid.querySelectorAll(".answer-button");

    botoes.forEach(function(botao, indice) {
        botao.disabled = true;

        if (imagensEmbaralhadas[indice].correta) {
            botao.classList.add("correct-answer");
        } else if (indice === indiceEscolhido) {
            botao.classList.add("wrong-answer");
        }
    });

    feedback.hidden = false;

    const titulo = document.createElement("strong");
    titulo.textContent = acertou
        ? "PARABÉNS! VOCÊ ACERTOU!"
        : "OPS! NÃO FOI DESSA VEZ!";

    const texto = document.createElement("p");

    if (acertou) {
        texto.textContent =
            "Você identificou a obra humana! " +
            rodadas[rodadaAtual].explicacao;
    } else {
        texto.textContent =
            "A resposta correta era a alternativa " +
            letrasDaResposta(respostaCorreta) + ". " +
            rodadas[rodadaAtual].explicacao;
    }

    feedback.appendChild(titulo);
    feedback.appendChild(texto);

    nextButton.textContent =
        rodadaAtual === rodadas.length - 1
            ? "VER RESULTADO FINAL →"
            : "PRÓXIMA RODADA →";

    nextButton.hidden = false;
}

function letrasDaResposta(imagemCorreta) {
    const indice = imagensEmbaralhadas.indexOf(imagemCorreta);
    return ["A", "B", "C", "D"][indice];
}

// ======================================================
// ÁREA 8 — AVANÇAR ENTRE RODADAS
// NÃO ALTERE
// ======================================================

function proximaRodada() {
    if (!respondido) {
        return;
    }

    rodadaAtual++;

    if (rodadaAtual < rodadas.length) {
        mostrarRodada();
    } else {
        mostrarResultado();
    }
}

// ======================================================
// ÁREA 9 — RESULTADO FINAL
// NÃO ALTERE
// ======================================================

function mostrarResultado() {
    gameScreen.hidden = true;
    resultScreen.hidden = false;

    const total = rodadas.length;
    const erros = total - pontuacao;

    finalScore.textContent = pontuacao + "/" + total;
    finalCorrect.textContent = pontuacao;
    finalWrong.textContent = erros;
    finalTotal.textContent = total;

    if (pontuacao === 5) {
        finalMessage.textContent = "Olho de especialista!";
        finalDescription.textContent =
            "Incrível! Você identificou todas as pinturas humanas.";
    } else if (pontuacao >= 3) {
        finalMessage.textContent = "Muito bem!";
        finalDescription.textContent =
            "Você tem um bom olhar artístico. Continue observando os detalhes!";
    } else {
        finalMessage.textContent = "Continue praticando!";
        finalDescription.textContent =
            "Distinguir arte humana de imagens de IA exige atenção e prática.";
    }
}

// ======================================================
// ÁREA 10 — CONECTAR OS BOTÕES
// NÃO ALTERE
// ======================================================

startButton.addEventListener("click", iniciarJogo);
nextButton.addEventListener("click", proximaRodada);
restartButton.addEventListener("click", reiniciarJogo);

// ======================================================
// ÁREA 11 — CONFERIR O BANCO DE IMAGENS
// NÃO ALTERE
// ======================================================

function conferirRodadas() {
    rodadas.forEach(function(rodada, indice) {
        const quantidadeCorretas = rodada.imagens.filter(
            function(imagem) {
                return imagem.correta === true;
            }
        ).length;

        if (
            rodada.imagens.length !== 4 ||
            quantidadeCorretas !== 1
        ) {
            console.error(
                "Problema na rodada " + (indice + 1) +
                ": ela precisa ter 4 imagens e exatamente 1 correta."
            );
        }
    });
}

conferirRodadas();
