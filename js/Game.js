/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
     constructor() {
         this.missed = 0;
         this.phrases = this.createPhrases();
         this.activePhrase = null;
     }

     // Method to create an array of phrases to be used in the game
     createPhrases() {
         const phrases = [];
         phrases.push(new Phrase("To live will be an awfully big adventure"));
         phrases.push(new Phrase("Everything you can imagine is real"));
         phrases.push(new Phrase("Life is just a chance to grow a soul"));
         phrases.push(new Phrase("Nothing will work unless you do"));
         phrases.push(new Phrase("Where there is love there is life"));
        return phrases;
    }

    // Method to start the game
    startGame() {
        // hide the element with the id "overlay"
        $("#overlay").hide();
        // set activePhrase property to the phrase returned by the getRandomPhrase method
        this.activePhrase = this.getRandomPhrase();
        // call the addPhraseToDisplay method on the activePhrase to display the phrase to the user
        this.activePhrase.addPhraseToDisplay();  
    };

    // Method to get a random phrase to be used as the active phrase in the game
    getRandomPhrase() {
        // generate a random number between 0 and the length of the array -1 and use it as an index on the phrases array
        return this.phrases[Math.floor(Math.random() * (this.phrases.length-1))]; 
    }

    handleInteraction($button) {
        // disable the clicked button
        $button.prop("disabled", true);
        // declare a letter variable and assign the buttons value/text to it
        const letter = $button.text();
        // call the checkLetter method on the activePhrase with the clicked letter
        if (this.activePhrase.checkLetter(letter)) {
            // add the class "chosen" to the button
            $button.addClass("chosen");
            // call the showMatchedLetter method on the activePhrase
            this.activePhrase.showMatchedLetter(letter);
            // check if the game was won, if so call the gameOver method
            if (this.checkForWin()) {
                this.gameOver(true);
            };
        } else {
            // add the class "wrong" to the button
            $button.addClass("wrong");
            // call the removeLife method
            this.removeLife();
        }
    }

    // Method to check if the player has won
    checkForWin() {
        // get all elements with the class "hide"
        const hiddenLetters = $(".hide");
        // check if the length of the array is 0 to determine whether all letters have been revealed and return the result
        return hiddenLetters.length === 0;
    }

    // Method to remove a life anc end the game if the player missed 5 times
    removeLife() {
        // get all img elements with the src attribute value of "images/liveHeart.png" and select the last one
        const element = $('img[src="images/liveHeart.png"]').last();
        // set the src attribute value of the element to "images/lostHeart.png"
        element.attr("src", "images/lostHeart.png");
        // increase the number of missed by one
        this.missed = this.missed +1;
        // check if the user missed 5 times, if so call the gameOver method
        if (this.missed >= 5) {
            this.gameOver(false);
        }
    }

    // Method to end the game
    gameOver(gameWon) {
        // show the element with the id "overlay" and remove the class "start"
        $("#overlay").show().removeClass("start");
        // check if the user missed 5 times and lost or won
        if (gameWon) {
            // set the h1 elements text to a win message
            $("h1").text("Yay - you won!");
            // add the class "win" to the element with the id "overlay"
            $("#overlay").addClass("win");
        } else {
            // set the h1 elements text to a loss message
            $("h1").text("Oh - you lost!");
            // add the class "loss" to the element with the id "overlay"
            $("#overlay").addClass("lose");
        }
    }
 }