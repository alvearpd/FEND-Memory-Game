/*
 * CardsList
 */
const cardsList = document.querySelector(".cards");

/*
 * Icons
 */
const iconsList = ["fab fa-apple", "fab fa-apple", "fas fa-ban", "fas fa-ban", "far fa-bell", "far fa-bell", "fab fa-bluetooth-b", "fab fa-bluetooth-b", "fas fa-camera-retro", "fas fa-camera-retro", "fas fa-car", "fas fa-car", "fas fa-chess", "fas fa-chess", "far fa-envelope", "far fa-envelope"];

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
    for(let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.className = "card";
        card.innerHTML = "<i class='" + icons[i] + "'></i>";
        cardsFragment.appendChild(card);
    }
    cardsList.appendChild(cardsFragment);

    cardClick();
}
start();