var currentItem = 0;
var listToPlay = [];
var currentPlayerList = [];
var reproducao;
var isClickable = false;
var index = 0;

//game objects
var LEVEL = $("#level");
var PLAY = $("#play");
var ERROR = $("#errou")[0];

//musical notes
var NOTES = ["green", "red", "blue", "yellow"];

//function that generates a random number, that's how we decide how will be next color to be played
function generateNumber() {
    var number = Math.random();
    number = Math.floor(number * 4);

    listToPlay.push(NOTES[number]);

    LEVEL.html(listToPlay.length);
}

//it starts a self called method which plays the sequence
function playSongAndGenerateNewSong() {
    isClickable = false;
    generateNumber();
    reproducao = window.setInterval(function () {
        PlaySequence()
    }, 800);
}

function PlaySequence() {
    play(listToPlay[currentItem]);
    currentItem += 1;

    if (currentItem == listToPlay.length) {
        window.clearInterval(reproducao);
        currentItem = 0;
        setTimeout(function () {
            isClickable = true;
        }, 500)
    }
}

function play(obj) {
    var note = $("#" + obj);

    setTimeout(function () {
        note.removeClass(obj + "dark");
        note.addClass(obj + "light");
        $("#note_" + obj)[0].play();
    }, 100);

    setTimeout(function () {
        note.addClass(obj + "dark");
        note.removeClass(obj + "light");
    }, 800);
}

$(".btn").on("click", function () {
    playNote(this.id);
});

function playNote(note) {
    if (isClickable == true) {
        play(note);
        currentPlayerList.push(note);
        if (currentPlayerList[currentPlayerList.length - 1] != listToPlay[currentPlayerList.length - 1]) {
            setTimeout(function () {
                LEVEL.html(":(");
                currentPlayerList = [];
                listToPlay = [];
                PLAY.css("display", "block");
                LEVEL.css("display", "none");
                isClickable = false;
                ERROR.play();
            }, 500);

        } else if (currentPlayerList.toString() == listToPlay.toString()) {
            currentPlayerList = [];
            LEVEL.html("☺");
            setTimeout(function () {
                playSongAndGenerateNewSong();
            }, 1000)
            isClickable = false;
        }
    }
}

PLAY.on("click", function () {
    playSongAndGenerateNewSong();
    PLAY.css("display", "none");
    LEVEL.css("display", "block");
});

//Turn playable via keyboard
$(document).on("keydown", function (event) {
    var pressedKey = event.keyCode;
    if (pressedKey == 38) {
        playNote(NOTES[0]);
    } else if (pressedKey == 39) {
        playNote(NOTES[1]);
    } else if (pressedKey == 40) {
        playNote(NOTES[2]);
    } else if (pressedKey == 37) {
        playNote(NOTES[3]);
    } else if (pressedKey == 13 && PLAY.css('display') == "block") {
        playSongAndGenerateNewSong();
        PLAY.css("display", "none");
        LEVEL.css("display", "block");
    }
    console.log(event.keyCode);
});
