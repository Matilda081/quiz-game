const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn"); 
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is TypeScript?",
    answers: [
      {text: "A database" , correct: false},
      {text: "A superset of JavaScript", correct: true},
      {text: "A CSS library", correct: false},
      {text: "A browser", correct: false},
      {text: "A Component", correct:false},
    ],
  },

  {
    question: "What is the file extension for TypeScript?",
    answers: [
      {text: ".js", correct: false},
      {text: ".jx", correct: false},
      {text: ".ts", correct: true},
      {text: ".html", correct: false},
      {text: ".css", correct: false},
    ],
  },

   {
    question: "What does the (any) type mean?",
    answers: [
      {text: "Only numbers allowed", correct: false},
      {text: "Any type of value is allowed", correct: true},
      {text: "Only strings allowed", correct: false},
      {text: "No value allowed", correct: false},
      {text: "Only arrays allowed", correct: false},
    ],
  },

   {
    question: "What is static typing?",
    answers: [
      {text: "Writing HTML in JavaScript", correct: false},
      {text: "Running code in the browser", correct: false},
      {text: "Defining variables types to catch errors early", correct: true},
      {text: "Styling components", correct: false},
      {text: "Creating APIs", correct: false},
    ],
  },

   {
    question: "What is an enum in TypeScript",
    answers: [
      {text: "A function", correct: false},
      {text: "A loop", correct: false},
      {text: "A component", correct: false},
      {text: "A string method", correct: false},
      {text: "A set of named constants", correct: true},
    ],
  },
]

let currentQuestionIndex = 0
let score = 0
let answersDisabled = false

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  currentQuestionIndex = 0;
  score = 0;

  scoreSpan.textContent = score;
  totalQuestionSpan.textContent = quizQuestions.length;

  showQuestion();
}

function showQuestion() {
  resetAnswers();

  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  // Update progress bar
  const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    button.addEventListener("click", () => selectAnswer(button, answer.correct));

    answersContainer.appendChild(button);
  });
}

function resetAnswers() {
  answersContainer.innerHTML = "";
  answersDisabled = false;
}

function selectAnswer(button, isCorrect) {
  if (answersDisabled) return;

  answersDisabled = true;

  const buttons = answersContainer.children;

  for (let btn of buttons) {
    const question = quizQuestions[currentQuestionIndex];
    const answerObj = question.answers.find(a => a.text === btn.textContent);

    if (answerObj.correct) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("incorrect");
    }
  }

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;
  maxScoreSpan.textContent = quizQuestions.length;

  if (score === quizQuestions.length) {
    resultMessage.textContent = "Excellent 🎉";
  } else if (score >= 3) {
    resultMessage.textContent = "Good job 👍";
  } else {
    resultMessage.textContent = "Keep practicing 💪";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
}