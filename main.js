var wordCount = 0;

var saved = {
    wordCount: 0
}

$(document).ready(function() {
    initializeWords();
    load();
    $("#gibberish").hide();
    $(".btn-length").width($("#feed").width());
});

//An array of the alphabet, used to emulate keycodes (keycode for each letter is 65 + it's index.
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Initializes the first three words to type.
function initializeWords() {
    var r1 = Math.floor(Math.random() * words.length);
    var r2 = Math.floor(Math.random() * words.length);
    var r3 = Math.floor(Math.random() * words.length);
    $("#toType").text(words[r1]);
    $("#notTyped1").text(words[r2]);
    $("#notTyped2").text(words[r3]);
};

function updateVal() {
    $("#wordCount").text(Math.floor(saved.wordCount));
};

//Gives the "word bonus" of a word based on it's length. The average word has a length of 5 characters, so it divides the length by 5.
function wordBonus(length) {
    var bonusLength = length/5;
    return bonusLength;
};

//Adds the specified amount to wordCount and updates the #wordCount div.
function addWord(length) {
    var wordLength = 0;
    if($("#typeStyle").prop("checked")) {
        wordLength++;
    };
    wordLength += wordBonus(length);
    saved.wordCount += wordLength;
    $("#wordCount").text(Math.floor(saved.wordCount));
};

//Goes through an array printing the word, word length, and the word bonus.
function printWordLength() {
    var i = 0;
    while (i < arr.length) {
        console.log("Number " + (i));
        var length = arr[i].length
        console.log("Word: " + arr[i] + ", Length: " + length + ", Bonus: " + wordBonus(length));
        console.log("");
        i++;
    }
};

$(document).keyup(function(key) {

    //Checks if the character typed is the first character in the span "toType" and moves it to the span "typed"
    if($("#typeStyle").prop("checked")) {
        var letterToType = $("#toType").text().slice(0,1);
        var keyCodeToType = alphabet.indexOf(letterToType) + 65;
        var keyPressed = key.keyCode;
        if(keyPressed == keyCodeToType) {
            var typed = $("#typed").text();
            typed += letterToType;
            $("#typed").text(typed);
            var type = $("#toType").text();
            type = type.substr(1, type.length);
            $("#toType").text(type);
        }
    } else if(key.keyCode > 64 && key.keyCode < 91) {
        $("#gibberish").text($("#gibberish").text() + String.fromCharCode(key.keyCode));
    };

    //Used in gibberish, it resets the text area once space is pressed.
    if (key.keyCode == 32 && !$("#typeStyle").prop("checked")) {
        addWord($("#gibberish").text().length / 3);
        $("#gibberish").text("");
    };

    //Checks if space is being pressed as well as if the span #toType is empty, if so it moves the contents of each div to the left and populates
    //   the rightmost div with a random word from the array.
    if((key.keyCode == 32) && $("#toType").text() == "" && $("#typeStyle").prop("checked")) {
            addWord($("#typed").text().length);
            $("#typed2").text($("#typed1").text());
            $("#typed1").text($("#typed").text());
            $("#typed").text("");
            $("#toType").text($("#notTyped1").text());
            $("#notTyped1").text($("#notTyped2").text());
            var rand = Math.floor(Math.random() * words.length);
            $("#notTyped2").text(words[rand]);
    };

    //A test to disable checkbox checking/unchecking via spacebar.
    if(key.keyCode == 32) {
        if( $("#typeStyle").prop("checked")) {
            $("#typeStyle").prop("checked", true);
        } else {
            $("#typeStyle").prop("checked", false);
        }
    };
});

//Switches the typing system from typing words or "gibberish".
function switchType() {
    if($("#typeStyle").prop("checked")) {
        $("#typing").show();
        $("#gibberish").hide();
    }

    if(!$("#typeStyle").prop("checked")) {
        $("#typing").hide();
        $("#gibberish").show();
    }
};

//SAVING AND LOADING
function save() {
    localStorage['monkeySave'] = btoa(JSON.stringify(saved));
    console.log("Saved");
}

function load() {
    if(!localStorage['monkeySave']) return;
    var loaded = JSON.parse(atob(localStorage['monkeySave']));
    saved = loaded;
    updateVal();
}

function reset() {
    localStorage.clear();
}

window.setInterval(function() {
    save();
}, 60000);
