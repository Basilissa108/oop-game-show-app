/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

 // declare a variable game without initializing it
 let game;

 // add an event listener to the button element with the id "btn__reset"
 $("#btn__reset").click(function() {
    // RESETTING EVERYTHING IN CASE IT'S NOT THE FIRST GAME
    // remove all li elements from the ul element within the element with the id "phrase"
    $("#phrase ul").empty();
    // set the disabled attribute on all elements with the class "key" to false and remove the classes "wrong" and "chosen"
    $(".key").attr("disabled", false).removeClass("wrong chosen");
    // set the src attribute of all img elements within elements with the class "tries" to "images/liveHeart.png"
    $(".tries img").attr("src", "images/liveHeart.png");
    // remove classes "lose" and "won" from the element with the id "overlay"
    $("#overlay").removeClass("lose won");
    // remove the keypress eventlistener (if it wasn't removed and the player pressed keys on the keyboard it would throw errors)
    document.removeEventListener("keypress", handleKeyPressEvent); 

    // instantiate a new Game object and assign it to the game variable
    game = new Game();
    // call the startGame method on the Game instance
    game.startGame();

    // add the keypress eventlistener (should usually be keydown instead as keypress is deprecated, but the project explicitly asks for a keypress eventhandler)
    document.addEventListener("keypress", handleKeyPressEvent);
 });

 $("#qwerty").click(function(e) {
    // check if the clicked element contains the class "key"
    if (e.target.classList.contains("key")) {
        // call the handleInteraction method on the game passing in the clicked element
       game.handleInteraction($(e.target));
    }
 });

 const handleKeyPressEvent = function(e) {
    // use a regular expression to check if the pressed key is a valid character and store the result in a variable
    const isAllowedCharacter = (new RegExp("[a-z]", "gi")).test(e.key);
    // check if isAllowedCharacter is true
    if (isAllowedCharacter) {
        // select the element with the class "key" which contains the value of the pressed key
        const $button = $(`.key:contains(${e.key.toLowerCase()})`);
        // call the handleInteraction method on the game passing in the button
        game.handleInteraction($button);
    }
}