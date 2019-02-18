/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    // Method to display a phrase on the game board
    addPhraseToDisplay() {
        // declare a variable to store the html string
        let html = "";
        // split the phrase into an array of words
        const words = this.phrase.split(" ");
        // loop over words array
        for (let i = 0; i < words.length; i++) {
            // split the word into an array of letters
            const letters = words[i].split("");
            // loop over the array of letters and add a string literal to the html variable for the letter
            letters.forEach(letter => {
                html += `<li class="hide letter ${letter}">${letter}</li>`;
            });
            // add a space element after each word unless it's the last word
            if (i !== words.length -1) {
                html += `<li class="space"> </li>`;
            }
        }
        // append the html blueprint to the ul element with the div with the id "phrase"
        $("#phrase ul").append(html); 
    }

    // Method to check if the clicked letter matches a letter in the phrase
    checkLetter(letter) {
        // check if the phrase includes the letter and return the result
        return this.phrase.includes(letter);
    }

    showMatchedLetter(letter) {
        // select all elements with the class of the passed in letter, remove the class "hide" and add the class "show"
        $(`.${letter}`).removeClass("hide").addClass("show");
    }
 }