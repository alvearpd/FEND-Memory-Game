/*
 * CardsList
 */
const cardsList = document.querySelector(".cards");

/*
 * Icons
 */
const iconsList = ["fab fa-apple", "fab fa-apple", "fas fa-ban", "fas fa-ban", "far fa-bell", "far fa-bell", "fab fa-bluetooth-b", "fab fa-bluetooth-b"];

// , "fas fa-camera-retro", "fas fa-camera-retro", "fas fa-car", "fas fa-car", "fas fa-chess", "fas fa-chess", "far fa-envelope", "far fa-envelope"

/*
 * Shuffle
 */
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

/*
 * Start Game
 */
function start() {
    const icons = shuffle(iconsList);
    const cardsFragment = document.createDocumentFragment();
    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.setAttribute("id", "card-" + (i + 1));
        card.innerHTML = "<i class='" + icons[i] + "'></i>";
        cardsFragment.appendChild(card);
    }
    cardsList.appendChild(cardsFragment);

    cardClick();
}


/* 
 * Open Cards
 */
let allOpenCards = [];
let currentOpenCards = [];
let moves = 0;
const movesContainer = document.querySelector(".moves");


/* 
* Click
*/
function cardClick() {
    const cards = cardsList.children;
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function () {

            // Start Timer
            timer("start");

            // Reset icon's opacity [ Reason: If cards doesn't match, the icons would become ivsibile ]
            cards[i].childNodes[0].style.opacity = "1";

            // Define 2 cards globally within this scope
            const currentCard = this;
            const previousCard = currentOpenCards[0];


            // If this element exist in `allOpenCards` arr
            if (!allOpenCards.includes(currentCard)) {

                // Check if there are 2 open cards
                if (currentOpenCards.length === 1) {

                    // If the user clicked on the same card
                    if (currentCard.id !== previousCard.id) {

                        // Open it, Add it to the `currentOpenCards` arr
                        currentCard.className = "show";
                        currentOpenCards.push(currentCard);

                        // Compare the current Card with the current one in `currentOpenCards` arr
                        if (currentCard.childNodes[0].className === previousCard.childNodes[0].className) {

                            // Correct highlight
                            currentCard.style.backgroundColor = "green";
                            previousCard.style.backgroundColor = "green";
                            currentCard.className = "animated flash";
                            previousCard.className = "animated flash";

                            // Add Current & Previous card to `allOpenCards` to compare it with the original one to determine if the game is over
                            allOpenCards.push(currentCard.childNodes[0].className, previousCard.childNodes[0].className);

                            console.log("matches!");

                            // Check over
                            checkOver();
                        } else {

                            // Back to normal
                            setTimeout(function () {
                                currentCard.className = "animated jello";
                                previousCard.className = "animated jello";
                                currentCard.style.backgroundColor = "#333";
                                currentCard.childNodes[0].style.opacity = "0";
                                previousCard.style.backgroundColor = "#333";
                                previousCard.childNodes[0].style.opacity = "0";
                            }, 500)

                            console.log("NOT MATCHES!");
                        }

                        // Empty `currentOpenCards`
                        currentOpenCards = [];
                        // Add move
                        moves++;
                        movesContainer.innerHTML = moves;
                    }


                    // Open it, Add it to the `currentOpenCards` arr
                } else {
                    currentCard.className = "show";
                    currentOpenCards.push(currentCard);
                }
            } else {

            }
        });
    }
}


/*
 * Timer
 */
let startTime,
    endTime,
    gameTime;
function timer(startOrEnd) {
    if (startOrEnd === "start") {
        if (startTime > 0) { // Have a value - Do nothing
        } else { // Don't have a value - Assign it
            startTime = Date.now();
            console.log("Timer Started! " + startTime);
        }
    }

    if (startOrEnd === "end") {
        endTime = Date.now();
        gameTime = Math.floor( (endTime - startTime) / 1000);
        return gameTime;
    }

}

/*
 * Check Game Over
 */
function checkOver() {
    if (iconsList.sort().toString() === allOpenCards.sort().toString()) {
        timer("end");
        gameOverMessage();
    }
}

/* 
 * Game Over Message
 */
function gameOverMessage() {

    // Display the modal
    const modal = document.querySelector(".modal");
    modal.style.top = "0";

    // Add moves & time to the Modal
    const totalMoves = document.querySelector("#total_moves");
    const totalTime = document.querySelector("#total_time");

    totalMoves.innerHTML = moves + 1; // [bug]: `moves` returns the count - 1
    totalTime.innerHTML = gameTime;

    // Play Again
    const repeatBtn = document.querySelector("#repeat");
    repeatBtn.addEventListener("click", function () {

        // Hide the modal
        modal.style.top = "-100%";

        // Start the game again
        repeat();
    });
}

/*
 * Play again [ repeat ]
 */
function repeat() {

    // Delete current cards
    while (cardsList.firstChild) {
        cardsList.removeChild(cardsList.firstChild);
    }

    // Reset variables to save the new data
    allOpenCards = [];
    moves = 0;
    movesContainer.innerHTML = "--";
    startTime = 0;
    endTime = 0;
    gameTime = 0;

    // Start the game again
    start();
}


start();
