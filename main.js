var wordCount = 0;

$(document).ready(function() {
    initializeWords();
    $("#gibberish").hide();
});

// Initializes the first three words to type.
function initializeWords() {
    var r1 = Math.floor(Math.random() * words.length);
    var r2 = Math.floor(Math.random() * words.length);
    var r3 = Math.floor(Math.random() * words.length);
    $("#toType").text(words[r1]);
    $("#notTyped1").text(words[r2]);
    $("#notTyped2").text(words[r3]);
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
    wordCount += wordLength;
    $("#wordCount").text(Math.floor(wordCount));
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

$(document).keypress(function(key) {

    //Checks if the character typed is the first character in the span "toType" and moves it to the span "typed"
    if($("#typeStyle").prop("checked")) {
        var charToType = $("#toType").text().charAt(0);
        var keyPressed = String.fromCharCode(key.keyCode);
        if(keyPressed.toLowerCase() == charToType) {
            var typed = $("#typed").text();
            typed += charToType;
            $("#typed").text(typed);
            var type = $("#toType").text();
            type = type.substr(1, type.length);
            $("#toType").text(type);
        };
    } else if(key.keyCode > 96 && key.keyCode < 123) {
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


window.setInterval(function() {

}, 1000);
