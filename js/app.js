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
 * Icons List
 *  - Shuffle
 *  - 2 index for the same icon [ To match them ]
 */
const iconsList = ['far fa-edit', 'far fa-calendar', 'far fa-gem', 'far fa-paper-plane', 'far fa-play-circle', 'far fa-save', 'far fa-smile', 'far fa-snowflake', 'far fa-user'];

/*
 * Card Grid
 */
const cardsFrag = document.createDocumentFragment();
function buildGrid(grid) {
    for (let i = 0; i < (2 * grid); i++) {
        const newCard = document.createElement("li");
        newCard.innerHTML = "<i class='fab fa-apple'></i>";
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
let openCards = [];
Array.prototype.forEach.call(cardsArray, function (el) {
    el.addEventListener("click", function () {
        // Visible the icon
        el.children[0].style.opacity = "1";
        // Add it to the Open Cards list
        openCards.push(el);
        // Compare Cards
        compareCards();
    });
})

const firstCard = document.querySelector("ul li i");
firstCard.classList = "far fa-edit";
/*
 * Compare 2 cards
 *   - Check if the `openCards` array have 2 cards
 *   - If yes, compare them
 *   - Calculate moves
 */
let moves = 0;
const movesContainer = document.querySelector(".moves span");
function compareCards() {
    if (openCards.length == 2) {

        // Matched [ SVG Icon ]
        if (openCards[0].children[0].attributes[0].nodeValue == openCards[1].children[0].attributes[0].nodeValue) {

            console.log("matched!");
            openCards.forEach(function(card) {
                card.style.backgroundColor = "green";
            });

        // NOT Matched
        } else { 
            console.log("Not Matched");
            openCards.forEach(function(card) {
                card.style.backgroundColor = "red";
                setTimeout(function() {
                    card.style.backgroundColor = "#333";
                    card.children[0].style.opacity = "0";
                }, 500);
            });
            
        }

        // Empty the Open Cards array
        openCards = [];

        // Add move
        moves++;
        movesContainer.textContent = moves;
    }
}