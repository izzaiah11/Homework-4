// DOM elements
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var inisitalsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// quiz state variables 
var currentQuestionIndex = 0;
var time = questions.length * 6;
var timerId;

function startQuiz() {
    // hiding start screen
    var startScreenEL = document.getElementById("start-screen");
    startScreenEL.setAttribute("class", "hide");

    // unhide questions section 
    questionsEl.removeAttribute("class");

    // start the timer

    timerId = setInterval(clockTick, 1000);

    // show starting time
    timerEl.textContent = time;

    getQuestion();
}

function getQuestion() {
    // get current quesitons from array

    var currentQuestion = questions[currentQuestionIndex];

    // update title to current quesiton 
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    // clear out any old question choice 
    choicesEl.innerHTML = ""

    // loop choices 
    currentQuestion.choices.forEach(function(choice, i) {
        // create new button for each choice
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + ". " + choice;

        // attach click event listener for each choice
        choiceNode.onclick = questionClick;

        // display on the page 
        choicesEl.appendChild(choiceNode);
    });
}

function questionClick() {
    // check if user quessed wrong answer
    if (this.value !== questions[currentQuestionIndex].answer){
        // take off time
        time -= 15;

        if (time < 0) {
            time = 0;
        }
        // display new time on page
        timerEl.textContent = time;
        feedbackEl.textContent = "Wrong!";
        feedbackEl.style.color = "red";
        feedbackEl.style.fontSize = "300%";
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "green";
        feedbackEl.style.fontSize = "300%";
    }
    
    // flash right/wrong
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    // next question 
    currentQuestionIndex++;

    // time checker 
    if (currentQuestionIndex === questions.length){
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {
    // stop timer
    clearInterval(timerId);

    // show end screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    // show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time; 

    // hide questions section
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    // update time
    time --;
    timerEl.textContent = time;

    // check if user ran out of time
    if (time <= 0) {
        quizEnd();
    }
}

function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();

    if (initials !== "") {
        // get saved scores from localstorage or set in empty array
        var highscores = 
        JSON.parse(window.localStorage.getItem("highscores")) || [];

        // format new score object for current user
        var newScore = {
            score: time,
            initials: initials 
        };

        // save to localstorage 
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        // redirect to next page
        window.location.href = "score.html";
    }
}

function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
        saveHighscore();
    }
}

// submit initials 
submitBtn.onclick = saveHighscore;

// start quiz
startBtn.onclick = startQuiz;

inisitalsEl.onkeyup = checkForEnter;