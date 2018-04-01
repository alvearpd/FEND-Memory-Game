/*
 * Global Variables
 */
let allOpenCards     = [],
    currentOpenCards = [],
    moves            = 0;

// , "fas fa-camera-retro", "fas fa-camera-retro", "fas fa-car", "fas fa-car", "fas fa-chess", "fas fa-chess", "far fa-envelope", "far fa-envelope"

const iconsList          = ["fab fa-apple", "fab fa-apple", "fas fa-ban", "fas fa-ban", "far fa-bell", "far fa-bell", "fab fa-bluetooth-b", "fab fa-bluetooth-b"],
      cardsList          = document.querySelector(".cards"),
      cards              = cardsList.children,
      movesContainer     = document.querySelector(".moves"),
      modal              = document.querySelector(".modal"),
      repeatBtn          = document.querySelector(".features .play-again");
      repeatBtnFromModal = document.querySelector(".modal .play-again");

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

let firstClick = true;
/* 
* Click
*/
function cardClick() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function () {

            // Reset icon's opacity [ Reason: If cards doesn't match, the icons would become ivsibile ]
            cards[i].childNodes[0].style.opacity = "1";

            // Define 2 cards globally within this scope
            const currentCard = this;
            const previousCard = currentOpenCards[0];

            // The First Click? Start the timer!
            if(firstClick) {
                startTimer();
                firstClick = false;
            }

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

                        // Add Move
                        addMove();

                        // Rating
                        rating();
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
 * Add Move
 */
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;
}


/*
 * Check Game Over
 */
function checkOver() {
    if (iconsList.sort().toString() === allOpenCards.sort().toString()) {
        gameOverMessage();
    }
}

/* 
 * Game Over Message
 */
function gameOverMessage() {

    // Display the modal
    modal.style.top = "0";

    // Add moves to the Modal
    const totalMoves = document.querySelector("#total_moves");
    totalMoves.innerHTML = moves + 1; // [bug]: `moves` returns the count - 1

    // Add Rate
    rateContainer.innerHTML = rateHTML;

    // Stop Timer
    stopTimer();

    // Add time to the Modal
    const totalHours       = document.querySelector("#totalHours");
    const totalMinutes     = document.querySelector("#totalMinutes");
    const totalSeconds     = document.querySelector("#totalSeconds");
    totalHours.innerHTML   = hours;
    totalMinutes.innerHTML = minutes;
    totalSeconds.innerHTML = seconds;

}


/*
 * Play Again Buttons
 */
repeatBtn.addEventListener("click", function() {

    // Start the game again
    repeat();

});
repeatBtnFromModal.addEventListener("click", function () {

    // Hide the modal
    modal.style.top = "-150%";

    // Start the game again
    repeat();

});

/* 
 * Star Rating
 */

// Exact Moves
const exactMoves = iconsList.length / 2;

// All Moves
// `moves`

// Rate 
const rateContainer = document.querySelector("#total_rate");
let rateHTML = "";

const rateStep = 3;
const maxStars = exactMoves + rateStep;
const minStars = exactMoves + ( 2 * rateStep);

const stars    = document.querySelectorAll(".star");

function rating() {

    if(moves < maxStars) {
        rateHTML = "<i class='star fas fa-star'></i><i class='star fas fa-star'></i><i class='star fas fa-star'></i>";
    } else if(moves < minStars) {
        stars[2].style.color = "#444";
        rateHTML = "<i class='star fas fa-star'></i><i class='star fas fa-star'></i>";
    } else {
        stars[1].style.color = "#444";
        rateHTML = "<i class='star fas fa-star'></i>";
    }

}


/*
 * Timer [ Variables ] 
 */
const secondsContainer = document.querySelector("#seconds"),
      minutesContainer = document.querySelector("#minutes"),
      hoursContainer   = document.querySelector("#hours");
let totalTime = 0;
let incrementer;

/*
 * Timer [ Start ] 
 */
function startTimer() {

    // Start Incrementer
    incrementer = setInterval(function() {

        // Add totalTime by 1
        totalTime += 1;

        // Convert Total Time to H:M:S
        calculateTime(totalTime);

        // Change the current time values
        secondsContainer.innerHTML = seconds;
        minutesContainer.innerHTML = minutes;
        hoursContainer.innerHTML   = hours;

    }, 1000);

    
}

/*
 * Timer [ Calculate Time ] 
 */
let hours, minutes, seconds; 
function calculateTime(totalTime) {
    hours   = Math.floor( totalTime / 60 / 60);
    minutes = Math.floor( (totalTime / 60) % 60);
    seconds = totalTime % 60;

}

/*
 * Timer [ Stop ] 
 */
function stopTimer() {
    // Stop Timer
    clearInterval(incrementer);
}


/*
 * Reset Current Values
 */
function resetValues() {
    allOpenCards = [];
    currentOpenCards = [];
    moves = 0;
    movesContainer.innerHTML = "--";
    stars[1].style.color = "#ffb400";
    stars[2].style.color = "#ffb400";
    rateHTML = "";
    hoursContainer.innerHTML = "00";
    minutesContainer.innerHTML = "00";
    secondsContainer.innerHTML = "00";
    totalTime = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
}


/* 
 * Repeat Game 
 */
function repeat() {

    // Delete current cards
    while (cardsList.firstChild) {
        cardsList.removeChild(cardsList.firstChild);
    }

    // Reset Current Values
    resetValues();

    // Start the game again
    start();
}

start();
 