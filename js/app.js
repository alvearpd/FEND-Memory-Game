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