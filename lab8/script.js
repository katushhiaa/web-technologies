// ===== Ініціалізація глобальних змінних =====
const gameBoard = document.querySelector('.memory-game');
const restartButton = document.getElementById('restart');
const startButton = document.getElementById('start-game');
const resetButton = document.getElementById('reset-settings');
const movesCounter = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const playersSelect = document.getElementById('players');
const player2Label = document.getElementById('player2-label');
const currentPlayerDisplay = document.getElementById('current-player');
const resultDisplay = document.getElementById('result');

const imagesList = [
    'img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png',
    'img7.png', 'img8.png', 'img9.png', 'img10.png'
];

let playersData = [];
let roundsData = [];
let totalRounds = 1;
let currentRound = 1;
let moves = 0;
let matchedPairs = 0;
let flippedCards = [];
let totalPairs = 0;
let countdown;
let boardSize;
let players;

// ====== Функціональні частини гри ======

// Ініціалізація гравців
function initPlayers() {
    const name1 = document.getElementById('player1').value || 'Гравець 1';
    const name2 = document.getElementById('player2').value || 'Гравець 2';

    return players === 2
        ? [{ name: name1, moves: 0 }, { name: name2, moves: 0 }]
        : [{ name: name1, moves: 0 }];
}

// Запуск гри
function startGame() {
    if (currentRound === 1) {
        players = +document.getElementById('players').value;
        totalRounds = parseInt(document.getElementById('rounds').value, 10);
        playersData = initPlayers();
        roundsData = [];
    }

    const size = document.getElementById('board-size').value;
    boardSize = size;
    setupBoard();
    startTimer();
    resetRoundVariables();
}

// Побудова ігрового поля
function setupBoard() {
    gameBoard.innerHTML = '';
    const [rows, cols] = boardSize.split('x').map(Number);
    totalPairs = (rows * cols) / 2;
    const cards = createShuffledCards(totalPairs);

    gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;


    cards.forEach(img => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.framework = img;
        card.innerHTML = `
      <img class="front-face" src="assets/${img}" alt="Image" />
      <img class="back-face" src="assets/back.jpg" alt="Back" />
    `;
        gameBoard.appendChild(card);
    });

    document.querySelectorAll('.memory-card').forEach(card => card.addEventListener('click', flipCard));
}

function createShuffledCards(pairs) {
    const selectedImages = [...imagesList].slice(0, pairs);
    return shuffle([...selectedImages, ...selectedImages]);
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startTimer() {
    clearInterval(countdown);
    timerDisplay.textContent = '00:00';
    let minutes = getMinutesByDifficulty();
    let time = minutes * 60;

    countdown = setInterval(() => {
        let mins = Math.floor(time / 60);
        let secs = time % 60;
        timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        if (--time < 0) {
            clearInterval(countdown);
            finishRound();
        }
    }, 1000);
}

function getMinutesByDifficulty() {
    const difficulty = document.getElementById('difficulty').value;
    if (difficulty === 'easy') return 3;
    if (difficulty === 'normal') return 2;
    return 1;
}

function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flip')) return;

    this.classList.add('flip');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        movesCounter.textContent = moves;
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.framework === card2.dataset.framework) {
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === totalPairs) {
            clearInterval(countdown);
            setTimeout(finishRound, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            flippedCards = [];
            if (players === 2) switchPlayer();
        }, 1000);
    }
}

function resetRoundVariables() {
    moves = 0;
    matchedPairs = 0;
    flippedCards = [];
    movesCounter.textContent = moves;
    if (players === 2) currentPlayerDisplay.textContent = `Хід: ${playersData[0].name}`;
    else currentPlayerDisplay.textContent = '';
}

function switchPlayer() {
    playersData.push(playersData.shift()); // міняємо місцями гравців
    currentPlayerDisplay.textContent = `Хід: ${playersData[0].name}`;
}

function finishRound() {
    saveRoundResult();

    if (currentRound < totalRounds) {
        currentRound++;
        setTimeout(startGame, 1500);
    } else {
        showOverallResults();
    }
}

function saveRoundResult() {
    const player1Moves = playersData[0].moves || moves;
    const player2Moves = playersData[1] ? playersData[1].moves : null;
    const winner = determineRoundWinner(player1Moves, player2Moves);

    roundsData.push({
        round: currentRound,
        player1: player1Moves,
        player2: player2Moves,
        winner: winner
    });
}

function determineRoundWinner(m1, m2) {
    if (players === 1) return playersData[0].name;
    return m1 <= m2 ? playersData[0].name : playersData[1].name;
}

function showOverallResults() {
    gameBoard.innerHTML = '';
    resultDisplay.classList.remove('hidden');
    restartButton.classList.add('hidden');

    let html = `<h2>Підсумки гри</h2>`;
    roundsData.forEach(r => {
        html += `<p>Раунд ${r.round}: Переможець — ${r.winner}, Ходи: ${r.player1}${r.player2 !== null ? ' / ' + r.player2 : ''}</p>`;
    });

    if (players === 2) {
        const finalWinner = determineOverallWinner();
        html += `<h3>Загальний переможець: ${finalWinner}</h3>`;
    }

    resultDisplay.innerHTML = html;
}

function determineOverallWinner() {
    const wins = playersData.map(p => ({
        name: p.name,
        wins: roundsData.filter(r => r.winner === p.name).length
    }));

    return wins[0].wins >= wins[1].wins ? wins[0].name : wins[1].name;
}

function resetSettings() {
    document.getElementById('settings-form').reset();
    player2Label.style.display = 'none';
}

function showPlayer2Input() {
    player2Label.style.display = playersSelect.value === '2' ? 'block' : 'none';
}

playersSelect.addEventListener('change', showPlayer2Input);
startButton.addEventListener('click', () => {
    currentRound = 1;
    startGame();
});
restartButton.addEventListener('click', () => {
    currentRound = 1;
    startGame();
});
resetButton.addEventListener('click', resetSettings);
