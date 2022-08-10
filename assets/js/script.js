var timer = document.querySelector("#timer");
var timeLeft= document.querySelector("#time-left");
var intro = document.querySelector("#intro");
var startQuizBtn = document.querySelector("#start-quiz-btn");
var quiz = document.querySelector("#quiz");
var questionText = document.querySelector("#question-text");
var choiceA = document.querySelector("#btn0");
var choiceB = document.querySelector("#btn1");
var choiceC = document.querySelector("#btn2");
var answerCheck = document.querySelector("#answer-check");
var highScores = document.querySelector("#high-scores");

var correctAns = 0;
var questionArray = 0;

const questions = [
    {
        question: "In JavaScript, what do you call a set of statements that performs a task or calculates a value?",
        choices: ["a. variable", "b. function", "c. objective"],
        answer: "b. function"
    },
    {
        question: "JavaScript arrays start with which number?",
        choices: ["a. 0", "b. 1", "c. any number you choose as a starting number"],
        answer: "a. 0"
    },
    {
        question: "What method is used for making sure code is reached or to check the value of variables?",
        choices: ["a. query selecting", "b. console logging", "c. finding attribute"],
        answer: "b. console logging"
    },
    {
        question: "Which type of conditional statement would I use to specify a new condition to test, if the first condition is false?",
        choices: ["a. switch", "b. else", "c. else if"],
        answer: "c. else if"
    }
];

var totalTime = 60;
function startQuiz() {
    intro.style.display = "none";
    questionArray = 0;
    totalTime = 60;
    timeLeft.textContent = totalTime;
    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionArray < questions.length - 1) {
                gameOver();
            }
        }
    }, 1000);
    showQuiz();
};

function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionText.textContent = questions[questionArray].question;
    choiceA.textContent = questions[questionArray].choices[0];
    choiceB.textContent = questions[questionArray].choices[1];
    choiceC.textContent = questions[questionArray].choices[2];
}

function checkAnswer(answer) {
    if (questions[questionArray].answer === questions[questionArray].choices[answer]) {
        correctAns++;
        answerCheck.textContent = "Correct!";
    }
    else {
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Incorrect. The correct answer is: " + questions[questionArray].answer;
    }
    questionArray++;
    if (questionArray < questions.length) {
        nextQuestion();
    } 
    else {
        gameOver();
    } 
}

function chooseA() {
    checkAnswer(0); 
}

function chooseB() {
    checkAnswer(1);
}

function chooseC() {
    checkAnswer(2);
}

function gameOver() {
    finalScore.textContent = correctAns;
}

startQuizBtn.addEventListener("click", startQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);



