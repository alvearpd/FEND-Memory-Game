/* 
 * Create HTML List
 *
 */
const gameContainer = document.querySelector(".game-container");

/*
 * Create Cards List
 * Add it to the Game Container
 */
const cardsList = document.createElement("ul");
gameContainer.appendChild(cardsList);

/*
 * Card Grid
 */
const cardsFrag = document.createDocumentFragment();
function buildGrid(grid) {
    for (let i = 0; i < (2 * grid); i++) {
        const newCard = document.createElement("li");
        newCard.innerHTML = "<i class='fa fa-heart'></i>";
        cardsFrag.appendChild(newCard);
    }
    cardsList.appendChild(cardsFrag);

}
buildGrid(8);

/* 
 * Card Click Event
 * Make the icon visible
 * Add that card to the Open Cards list
 */
const cardsArray = document.querySelectorAll("ul li");
const openCards = [];
Array.prototype.forEach.call(cardsArray, function(el) {
    el.addEventListener("click", function() {
        // Visible the icon
        el.children[0].style.opacity = "1";
        // Add it to the Open Cards list
        openCards.push(el);
    });
})