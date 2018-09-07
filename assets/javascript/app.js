var triviaQuestions = [{

    question : "What is the brightest star in the night sky?",
    answerList :["Leo", "Sirius", "The Big Dipper", "North Star"],
    answer : 1
}, {
    question : "What is Wasabi?",
    answerList :["Japanese Carrots", "Japanese Beats", "Japanese Horseradish", "Japanese Scalions"],
    answer : 2

}, {
    question : "What number is represented by 'D' in Roman numerals?",
    answerList :["2000", "200", "500", "1000"],
    answer : 1
}, {
    question : "According to Exodus, what is the second plague of Egypt?",
    answerList :["Frogs", "Flies", "Locust", "Dead Fish"],
    answer : 0
}, {
    question : "Porphyrophobia is the fear of what?",
    answerList :["Noodles", "Spiders", "The Moon", "The Color Purple"],
    answer : 3
}];

var currentQuestion; var correctAnswer; var incorrectAnswer; var seconds; var time; var answered; var userSelect;
var messages = {
    correct: "that's right!",
    incorrect: "wrong, that's not it.",
    endTime: "Out of time!",
    finished: "Alright! Let's see how you did."
};

// The start button wont work. I want to have it so when the button is pressed the question and answers will populate and the timer starts.
// I didnt asign the answer buttons yet I was stuck on this part and coudln't figure it out in time.

$("#strBtn").on("click", function () {
    $(this).hide();
    newGame();
});

function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    newQuestion();
}

function newQuestion() {
    $('#message').empty();
    $('#correctedAnswer').empty();
    answered = true;

    $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for (var i = 0; i < 4; i++) {
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({ 'data-index': i });
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();
    //clicking an answer will pause the time and setup answerPage
    $('.thisChoice').on('click', function () {
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}
function countdown() {
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    //sets timer to go down
    time = setInterval(showCountdown, 1000);
}
function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}
function answerPage() {
    $('#currentQuestion').empty();
    $('.thisChoice').empty(); //Clears question page
    $('.question').empty();
    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    //checks to see correct, incorrect, or unanswered
    if ((userSelect == rightAnswerIndex) && (answered == true)) {
        correctAnswer++;
        $('#message').html(messages.correct);
    } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
    }

    if (currentQuestion == (triviaQuestions.length - 1)) {
        setTimeout(scoreboard, 5000)
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 5000);
    }
}
function scoreboard() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
}

// Looked this function up online and it doesn't seem to be working neither but I think its becuase the javascript isnt running yet.
function showProgress() {
    var currentQuestionNumber = quiz.triviaQuestionIndex + i;
    var element = document.getElementById("#progress");
    element.innerHTML = "Question " + currentQuestionNumber + "of " + quiz.triviaQuestions.length;
}