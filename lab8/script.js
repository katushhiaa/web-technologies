const board = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
const movesDisplay = document.getElementById('moves');
const currentPlayerDisplay = document.getElementById('current-player');

const images = Array.from({ length: 20 }, (_, i) => `assets/img${i + 1}.png`);

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer;
let timeRemaining;
let currentPlayer = 1;
let playerMoves = [0, 0];
let totalPairs;
let isTwoPlayers = false;

function createCards(size) {
    const totalCards = size.rows * size.cols;
    const neededImages = images.slice(0, totalCards / 2); // беремо тільки потрібні картинки
    const cardValues = [];

    neededImages.forEach((_, index) => {
        cardValues.push(index, index); // кожну пару по дві
    });

    return shuffle(cardValues).map(value => ({
        value,
        flipped: false,
        matched: false
    }));
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function renderBoard(size) {
    board.style.gridTemplateColumns = `repeat(${size.cols}, 1fr)`;
    board.innerHTML = '';

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;

        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back" style="background-image: url('${images[card.value]}');"></div>
            </div>
        `;

        cardElement.addEventListener('click', () => flipCard(index));
        board.appendChild(cardElement);
    });
}


function flipCard(index) {
    const card = cards[index];
    if (card.flipped || flippedCards.length >= 2) return;

    card.flipped = true;
    flippedCards.push(index);

    const cardInner = document.querySelector(`.card[data-index="${index}"] .card-inner`);
    cardInner.classList.add('flip');

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [firstIndex, secondIndex] = flippedCards;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    if (firstCard.value === secondCard.value) {
        firstCard.matched = true;
        secondCard.matched = true;
        matchedPairs++;
    } else {
        setTimeout(() => {
            firstCard.flipped = false;
            secondCard.flipped = false;

            const firstCardInner = document.querySelector(`.card[data-index="${firstIndex}"] .card-inner`);
            const secondCardInner = document.querySelector(`.card[data-index="${secondIndex}"] .card-inner`);

            firstCardInner.classList.remove('flip');
            secondCardInner.classList.remove('flip');
        }, 500); // невелика затримка перед поверненням назад
    }

    flippedCards = [];
    moves++;

    if (isTwoPlayers) {
        playerMoves[currentPlayer - 1]++;
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        currentPlayerDisplay.textContent = `Хід: Гравець ${currentPlayer}`;
    } else {
        movesDisplay.textContent = `Ходи: ${moves}`;
    }

    checkWin();
}

function checkWin() {
    if (matchedPairs === totalPairs) {
        clearInterval(timer);
        setTimeout(() => {
            alert("Вітаємо! Ви знайшли всі пари!");
        }, 300);
    }
}

function startGame() {
    const size = getBoardSize();
    totalPairs = (size.rows * size.cols) / 2;
    cards = createCards(size);
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    playerMoves = [0, 0];
    currentPlayer = 1;
    isTwoPlayers = document.getElementById('player-count').value === '2';
    currentPlayerDisplay.textContent = isTwoPlayers ? `Хід: Гравець 1` : '';
    startTimer();
    renderBoard(size);

    document.getElementById('restart-button').style.display = 'inline-block';
}

function startTimer() {
    clearInterval(timer);
    const difficulty = document.getElementById('difficulty').value;
    timeRemaining = difficulty === 'easy' ? 180 : difficulty === 'normal' ? 120 : 60;
    updateTimer();
    timer = setInterval(() => {
        timeRemaining--;
        updateTimer();
        if (timeRemaining <= 0) {
            clearInterval(timer);
            alert('Час вичерпано!');
        }
    }, 1000);
}

function updateTimer() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `Час: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function getBoardSize() {
    const size = document.getElementById('board-size').value;
    const [cols, rows] = size.split('x').map(Number);
    return { cols, rows };
}

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('restart-button').addEventListener('click', startGame);
document.getElementById('reset-settings').addEventListener('click', () => {
    document.getElementById('board-size').value = '4x3';
    document.getElementById('difficulty').value = 'easy';
    document.getElementById('player-count').value = '1';
    document.getElementById('rounds').value = 1;
});

document.getElementById('player-count').addEventListener('change', (e) => {
    document.getElementById('player2-name').style.display = e.target.value === '2' ? 'inline-block' : 'none';
});
