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
var results = document.querySelector("#results");
var scoresDiv = document.querySelector("#scores-screen");
var scoresList = document.querySelector("#scores-list");
var finalScore = document.querySelector("#final-score");
var initialInput = document.querySelector("#initial-box");
var submitInitialsBtn = document.querySelector("#enter-initials");
var goBackBtn = document.querySelector("#go-back");
var clearScoresBtn = document.querySelector("#clear-scores");
var viewScores = document.querySelector("#view-scores");
var listOfScores = document.querySelector("#scores-list");

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
    },
    {
        question: "What do you call a function running in parallel with other functions?",
        choices: ["a. callback", "b. relay", "c.asynchronous"],
        answer: "c. asynchronous"
    }
];

var totalTime = 75;
function startQuiz() {
    intro.style.display = "none";
    quiz.style.display = "block";
    results.style.display = "none";
    questionArray = 0;
    totalTime = 75;
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
    results.style.display= "block";
    quiz.style.display = "none";
    finalScore.textContent = correctAns;
}

function storeScores(event) {
    scoresDiv.style.display = "block";
    var savedScores = localStorage.getitem("scores");
    var scoresArray;
    if (savedScores === null) {
        scoresArray = [];
    } 
    else {
        scoresArray = JSON.parse(savedScores)
    }
    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };
    console.log(userScore);
    scoresArray.push(userScore);
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("scores", scoresArrayString);
    showScores();
}

var i = 0;
function showScores() {
    intro.style.display = "none";
    quiz.style.display = "none";
    scoresDiv.style.display = "block";
    results.style.display = "none";
    var savedScores = localStorage.getItem("scores");
    if (savedScores === null) {
        return;
    }
    var storedScores = JSON.parse(savedScores);
    for (; i < storedScores.length; i++) {
        var eachNewScore = document.createElement("p");
        eachNewScore.innerHTML = storedScores[i].initials + ": " + storedScores[i].score;
        listOfScores.appendChild(eachNewScore);
    }
}



startQuizBtn.addEventListener("click", startQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
submitInitialsBtn.addEventListener("click", function(event) {
    storeScores(event);
});
viewScores.addEventListener("click", function(event) {
    showScores(event);
});
goBackBtn.addEventListener("click", function() {
    intro.style.display = "block";
    scoresDiv.style.display = "none";
});
clearScoresBtn.addEventListener("click", function() {
    window.localStorage.removeItem("scores");
});



