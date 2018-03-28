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
 *  iconsList: icons inventory
 */
const iconsList = ['far fa-edit', 'far fa-calendar', 'far fa-gem', 'far fa-paper-plane', 'far fa-play-circle', 'far fa-save', 'far fa-smile', 'far fa-snowflake', 'far fa-user'];

/*
 * getIcons(para)
 *  - Extract icons from the `iconsList` based on the grid size
 *  - Duplicate each icon to match them later ( 2 Copies from each icon)
 *  
 *  @para: the Grid Sized
 *  Return: A full list of duplicated, shuffled - by 1shuffleIcons() - icons 
 * 
 */
function getIcons(grid) {
    // Returns the elements based on the grid's size
    const icons = iconsList.slice(0, grid);
    // Duplicate each icon to match them together
    const duplicateIcons = icons.concat(icons);
    // Return the icnos after being shuffled
    return shuffleIcons(duplicateIcons);
}

/*
 * shuffleIcons(array)
 *  - Shuffle the given array
 * 
 * Return: The shuffled icons after being duplicated
 * 
 */
function shuffleIcons(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Card Grid
 */
const cardsFrag = document.createDocumentFragment();
function buildGrid(grid) {
    for (let i = 0; i < (2 * grid); i++) {
        const newCard = document.createElement("li");
        const icons = getIcons(grid);
        const currentIcon = icons[i];
        console.log(currentIcon);
        newCard.innerHTML = "<i class='" + currentIcon + "'></i>";

        cardsFrag.appendChild(newCard);
    }
    cardsList.appendChild(cardsFrag);

}
buildGrid(4);

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
            openCards.forEach(function (card) {
                card.style.backgroundColor = "green";
            });

            // NOT Matched
        } else {
            console.log("Not Matched");
            openCards.forEach(function (card) {
                card.style.backgroundColor = "red";
                setTimeout(function () {
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