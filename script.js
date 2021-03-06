const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
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

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let currentCards = [];
let gameMatches = [];
let gameScore = 0;

function handleCardClick(event) {

  let card = event.target;
  gameContainer.classList.toggle('disabled');

  if (!currentCards.length) {
    card.style.backgroundColor = card.className;
    card.setAttribute('data-picked', true);
    currentCards.push(card);
    gameContainer.classList.toggle('disabled');
  } else if (!card.dataset.picked && currentCards[0].className === card.className ) {
      card.style.backgroundColor = card.className;
      currentCards[0].removeEventListener('click', handleCardClick);
      card.removeEventListener('click', handleCardClick);
      gameMatches.push(currentCards[0], card);
      currentCards = [];
      gameContainer.classList.toggle('disabled');
      gameScore += 1;
  } else {
    card.style.backgroundColor = card.className;
    gameScore += 1;
    setTimeout(function() {
      currentCards[0].style.backgroundColor = ''
      currentCards[0].removeAttribute('data-picked')
      card.style.backgroundColor = ''
      gameContainer.classList.toggle('disabled');
      currentCards = [];
    }, 1000)
  }
  if (gameMatches.length === 10) {
    setTimeout(function() {
      let playAgain = confirm(`Game Over! Number of turns it took: ${gameScore}. Play again?`);
      if (playAgain) {
        location.reload();
      }
    }, 100);
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
