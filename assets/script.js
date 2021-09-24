
var questions = [{
    question: "Commonly used data types do NOT include:",
    choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "1. strings"
},
{
    question: "The condition in an if / else statement is enclosed within ____.",
    choices: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
    answer: "3. parentheses"
},
{
    question: "Arrays in Javascript can be used to store ____.",
    choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
    answer: "4. all of the above"
},
{
    question: "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes"
},
{
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
    answer: "4. console.log"
}
]

var current = -1;
var timeLeft = 0;
var score = 0;

function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}


function endGame() {
    clearInterval(timer);

    var quizing = `
    <h2>All Done!</h2>
    <h3> Your final score is ` + score + `</h3>
    <input type="text" id="name" placeholder="Name"> 
    <button onclick="store()">Submit</button>`;
    document.getElementById("testBody").innerHTML = quizing;
}


function wrong() {
    timeLeft -= 10; 
    next();
}

function right() {
    score += 1;
    next();
}

function next() {
    current++;

    if (current > questions.length - 1) {
        endGame();
        return;
    }

    var quizing = "<h2>" + questions[current].question + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[current].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[answer]\">[choice]</button>"; 
        buttonCode = buttonCode.replace("[choice]", questions[current].choices[buttonLoop]);
        if (questions[current].choices[buttonLoop] == questions[current].answer) {
            buttonCode = buttonCode.replace("[answer]", "right()");
        } else {
            buttonCode = buttonCode.replace("[answer]", "wrong()");
        }
        quizing += buttonCode
    }


    document.getElementById("testBody").innerHTML = quizing;
}

function store() {
    localStorage.setItem("score", score);
    localStorage.setItem("scoreName",  document.getElementById('name').value);
    highScore();
}


function highScore() {
    var quizing = `
    <h2>` + localStorage.getItem("scoreName") + `'s score is:</h2>
    <h1>` + localStorage.getItem("score") + `</h1><br> 
    <button onclick="resetScore()">Clear score</button><button onclick="resetGame()">Play Again</button>`;
    document.getElementById("testBody").innerHTML = quizing;
}


function resetScore() {
    localStorage.setItem("score", "");
    localStorage.setItem("scoreName",  "");
    resetGame();
}


function resetGame() {
    clearInterval(timer);
    score = 0;
    current = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizing = `
    <h1>
        Coding Quiz!
    </h1>
    <h2>
    Try to answer the following coding questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!  
    </h2>
    <button onclick="start()">Start Quiz</button>`;

    document.getElementById("testBody").innerHTML = quizing;
}