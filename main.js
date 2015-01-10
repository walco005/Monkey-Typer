
var saved = {
    wordCount: 0,
    wordB: .2,
    money: 0,

}

$(document).ready(function() {
    initializeWords();
    load();
    updateVal();
    $("#gibberish").hide();
    $(".btn-length").width($("#feed").width());
    $("#upgrades").hide();
    $("#prestige").hide();
});

//An array of the alphabet, used to emulate keycodes (keycode for each letter is 65 + it's index.
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Initializes the first three words to type.
function initializeWords() {
    var r1 = Math.floor(Math.random() * dictionaries[0].length);
    var r2 = Math.floor(Math.random() * dictionaries[0].length);
    $("#toType").text(dictionaries[0][r1]);
    $("#notTyped1").text(dictionaries[0][r2]);
};

function updateVal() {
    console.log(saved.wordB);
    $("#wordCount").text(Math.floor(saved.wordCount));
    $("#wordB").text(saved.wordB);
};

//Gives the "word bonus" of a word based on it's length. The average word has a length of 5 characters, so it divides the length by 5.
function wordBonus(length) {
    var bonusLength = length/5;
    return bonusLength;
};

//Adds the specified amount to wordCount and updates the #wordCount div.
function addWord(length) {
    var wordLength = 0;
    if($("#wButt").html() == "Words") {
        wordLength++;
    };
    wordLength += wordBonus(length);
    saved.wordCount += wordLength;
    updateVal();
};

//Keydown is used for typing words, to avoid the perceived "lag" in typing words
$(document).keydown(function(key) {
    //Checks if the character typed is the first character in the span "toType" and moves it to the span "typed"
    if($("#wButt").html() == "Words") {
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
    }

    //Checks if space is being pressed as well as if the span #toType is empty, if so it moves the contents of each div to the left and
    //  populates the rightmost div with a random word from the array.
    if((key.keyCode == 32) && $("#toType").text() == "" && $("#wButt").html() == "Words") {
            addWord($("#typed").text().length);
            $("#typed1").text($("#typed").text());
            $("#typed").text("");
            $("#toType").text($("#notTyped1").text());
            var rand = Math.floor(Math.random() * dictionaries[0].length);
            $("#notTyped1").text(dictionaries[0][rand]);
    }
});
//Keyup is used for typing gibberish and since it only takes in "keyup", it fixes holding down a key.
$(document).keyup(function(key) {
    if($("#wButt").html() == "Gibberish") {
        if(key.keyCode > 64 && key.keyCode < 91) {
            $("#gibberish").text($("#gibberish").text() + String.fromCharCode(key.keyCode));
        }

        //Used in gibberish, it resets the text area once space is pressed.
        if (key.keyCode == 32) {
            addWord($("#gibberish").text().length / 3);
            $("#gibberish").text("");
        }
    }
});

//Switches the typing system from typing words or "gibberish".
function switchType() {
    if($("#wButt").html() == "Gibberish") {
        $("#typing").show();
        $("#gibberish").hide();
        $("#wButt").html("Words");
    } else if($("#wButt").html() == "Words") {
        $("#typing").hide();
        $("#gibberish").show();
        $("#wButt").html("Gibberish");
    }
};

//Switch inbetween Monkeys, Upgrades, and Prestige.
function switchDisplay() {
    console.log("Trying to switch display");
    console.log($(event.target).html());
    if($(event.target).html() == "Monkeys"){
        console.log("In the monkeys");
        $("#monkeys").show();
        $("#upgrades").hide();
        $("#prestige").hide()
    } else if($(event.target).html() == "Upgrades"){
        console.log("Should be showing upgrades");
        $("#monkeys").hide();
        $("#upgrades").show();
        $("#prestige").hide();
    } else {
        console.log("Should be showing prestige");
        $("#prestige").show();
        $("#monkeys").hide();
        $("#upgrades").hide();
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
