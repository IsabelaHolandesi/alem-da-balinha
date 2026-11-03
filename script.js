
// MENU PARA CELULAR

const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", function () {
    menu.classList.toggle("open");
});

// FECHAR MENU AO CLICAR EM UM LINK

const linksMenu = document.querySelectorAll(".menu a");

linksMenu.forEach(function (link) {
    link.addEventListener("click", function () {
        menu.classList.remove("open");
    });
});

// MITOS E VERDADES

const cards = document.querySelectorAll(".myth-card");

cards.forEach(function (card) {
    card.addEventListener("click", function () {
        card.classList.toggle("active");

        const texto = card.querySelector("small");

        if (card.classList.contains("active")) {
            texto.textContent = "Clique para esconder";
        } else {
            texto.textContent = "Clique para revelar";
        }
    });
});

// PERGUNTAS DO QUIZ

const perguntas = [
    {
        pergunta: "A aparência de um comprimido permite identificar sua composição?",
        opcoes: [
            "Sim, sempre.",
            "Não, a aparência não garante a composição."
        ],
        resposta: 1,
        explicacao: "A composição não pode ser identificada com segurança pela aparência."
    },
    {
        pergunta: "O MDMA pode interferir na atividade do cérebro?",
        opcoes: [
            "Sim, pode afetar neurotransmissores.",
            "Não, não tem relação com o cérebro."
        ],
        resposta: 0,
        explicacao: "O MDMA interfere na atividade de neurotransmissores como serotonina, dopamina e noradrenalina."
    },
    {
        pergunta: "Os efeitos são iguais para todas as pessoas?",
        opcoes: [
            "Sim, são sempre iguais.",
            "Não, podem variar."
        ],
        resposta: 1,
        explicacao: "Os efeitos podem variar de acordo com a pessoa e com a composição da substância."
    },
    {
        pergunta: "Podem existir efeitos depois que a intoxicação passa?",
        opcoes: [
            "Sim, podem ocorrer alterações no sono e no humor.",
            "Não, os efeitos sempre terminam imediatamente."
        ],
        resposta: 0,
        explicacao: "Cansaço, alterações no sono e mudanças de humor podem ocorrer depois."
    },
    {
        pergunta: "Qual é uma atitude importante diante de uma suspeita de intoxicação grave?",
        opcoes: [
            "Ignorar e esperar passar.",
            "Procurar atendimento de emergência."
        ],
        resposta: 1,
        explicacao: "A suspeita de intoxicação grave exige atendimento médico urgente. No Brasil, o SAMU atende pelo 192."
    }
];

// ELEMENTOS DO QUIZ

const questionNumber = document.getElementById("questionNumber");
const question = document.getElementById("question");
const options = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");
const progressBar = document.getElementById("progressBar");
const quizResult = document.getElementById("quizResult");
const score = document.getElementById("score");
const restartButton = document.getElementById("restartButton");

let perguntaAtual = 0;
let pontos = 0;
let respondeu = false;

// MOSTRAR PERGUNTA

function mostrarPergunta() {

    respondeu = false;

    const atual = perguntas[perguntaAtual];

    questionNumber.textContent =
        "Pergunta " + (perguntaAtual + 1) + " de " + perguntas.length;

    question.textContent = atual.pergunta;

    options.innerHTML = "";
    feedback.textContent = "";

    nextButton.hidden = true;

    quizResult.hidden = true;
    question.hidden = false;
    options.hidden = false;
    questionNumber.hidden = false;

    progressBar.style.width =
        ((perguntaAtual + 1) / perguntas.length) * 100 + "%";

    atual.opcoes.forEach(function (opcao, indice) {

        const botao = document.createElement("button");

        botao.textContent = opcao;
        botao.classList.add("option");

        botao.addEventListener("click", function () {
            verificarResposta(indice, botao);
        });

        options.appendChild(botao);

    });

}

// VERIFICAR RESPOSTA

function verificarResposta(indice, botao) {

    if (respondeu) {
        return;
    }

    respondeu = true;

    const atual = perguntas[perguntaAtual];
    const botoes = document.querySelectorAll(".option");

    botoes.forEach(function (item) {
        item.disabled = true;
    });

    if (indice === atual.resposta) {

        pontos++;

        botao.classList.add("correct");

        feedback.textContent = "Correto! " + atual.explicacao;

    } else {

        botao.classList.add("wrong");

        botoes[atual.resposta].classList.add("correct");

        feedback.textContent = "Não foi dessa vez. " + atual.explicacao;

    }

    nextButton.hidden = false;

    if (perguntaAtual === perguntas.length - 1) {
        nextButton.textContent = "VER RESULTADO";
    } else {
        nextButton.textContent = "PRÓXIMA PERGUNTA";
    }

}

// PRÓXIMA PERGUNTA

nextButton.addEventListener("click", function () {

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {

        mostrarPergunta();

    } else {

        mostrarResultado();

    }

});

// MOSTRAR RESULTADO

function mostrarResultado() {

    question.hidden = true;
    options.hidden = true;
    questionNumber.hidden = true;
    feedback.hidden = true;
    nextButton.hidden = true;

    quizResult.hidden = false;

    score.textContent =
        "Você acertou " + pontos + " de " + perguntas.length + " perguntas!";

}

// RECOMEÇAR QUIZ

restartButton.addEventListener("click", function () {

    perguntaAtual = 0;
    pontos = 0;

    feedback.hidden = false;

    mostrarPergunta();

});

// INICIAR QUIZ

mostrarPergunta();
