const cards = document.querySelectorAll('.memory-card');
const resetButton = document.getElementById('reset-btn');
const messageDisplay = document.getElementById('message');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // First card flipped
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // Second card flipped
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
  }
}

function checkForMatch() {
  // Check if the cards match
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
    matchedPairs++;
    if (matchedPairs === cards.length / 2) {
      // All pairs matched, show message
      messageDisplay.textContent = 'Congratulations! You found all matches.';
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  // Cards match, disable click event
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 600);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function resetGame() {
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });

  shuffleCards();
  resetBoard();
  messageDisplay.textContent = 'Find all matches to win!';
  matchedPairs = 0;
}

function shuffleCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

// Event listeners
resetButton.addEventListener('click', resetGame);
cards.forEach(card => card.addEventListener('click', flipCard));

// Initial shuffle of cards
shuffleCards();
