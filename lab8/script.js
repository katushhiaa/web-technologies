const images = Array.from({ length: 20 }, (_, i) => `assets/img${i + 1}.png`);
const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');
const startGameBtn = document.getElementById('start-game');
const resetSettingsBtn = document.getElementById('reset-settings');
const movesSpan = document.getElementById('moves');
const timerSpan = document.getElementById('timer');
const currentPlayerSpan = document.getElementById('current-player');
const rowsInput = document.getElementById('rows');
const colsInput = document.getElementById('cols');
const difficultySelect = document.getElementById('difficulty');
const playersCountSelect = document.getElementById('players-count');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const roundsInput = document.getElementById('rounds');

let timerInterval = null;
let totalSeconds = 0;
let currentRound = 1;
let totalRounds = 1;
let players = [];
let currentPlayer = 0;
let scores = [];
let moves = 0;

const difficulties = {
    easy: 180,
    normal: 120,
    hard: 60,
};

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

const createCard = (src, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    card.dataset.src = src;

    const inner = document.createElement('div');
    inner.className = 'card-inner';

    const front = document.createElement('div');
    front.className = 'card-front';

    const back = document.createElement('div');
    back.className = 'card-back';

    const img = document.createElement('img');
    img.src = src;
    back.appendChild(img);

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    return card;
};

const renderBoard = (shuffledImages, cols) => {
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${cols}, 100px)`;
    shuffledImages.forEach((src, index) => {
        board.appendChild(createCard(src, index));
    });
};

const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
};

const startTimer = (seconds, onEnd) => {
    clearInterval(timerInterval);
    totalSeconds = seconds;
    timerSpan.textContent = formatTime(totalSeconds);

    timerInterval = setInterval(() => {
        totalSeconds--;
        timerSpan.textContent = formatTime(totalSeconds);
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            alert("Час вичерпано!");
            onEnd?.();
        }
    }, 1000);
};

const stopTimer = () => clearInterval(timerInterval);

const showResults = () => {
    let result = `Гру завершено!\n\n`;
    players.forEach((name, i) => {
        const totalMoves = scores[i].reduce((a, b) => a + b.moves, 0);
        const totalTime = scores[i].reduce((a, b) => a + b.time, 0);
        result += `${name} — Ходи: ${totalMoves}, Час: ${formatTime(totalTime)}\n`;
    });

    const winner = (players.length === 1)
        ? players[0]
        : (scores[0].reduce((a, b) => a + b.moves, 0) < scores[1].reduce((a, b) => a + b.moves, 0)
            ? players[0]
            : players[1]);

    result += `\n Переможець: ${winner}`;
    alert(result);
};

const startRound = () => {
    const rows = parseInt(rowsInput.value);
    const cols = parseInt(colsInput.value);
    const totalCards = rows * cols;

    const neededImages = shuffle(images).slice(0, totalCards / 2);
    const shuffled = shuffle([...neededImages, ...neededImages]);

    renderBoard(shuffled, cols);
    startTimer(difficulties[difficultySelect.value], endGame);

    let flipped = [];
    let lock = false;
    moves = 0;

    movesSpan.textContent = '0';
    currentPlayerSpan.textContent = players[currentPlayer];

    const handleClick = (e) => {
        const card = e.currentTarget;
        if (lock || card.classList.contains('flipped')) return;

        card.classList.add('flipped');
        flipped.push(card);

        if (flipped.length === 2) {
            lock = true;
            moves++;
            movesSpan.textContent = moves;

            const [first, second] = flipped;
            if (first.dataset.src === second.dataset.src) {
                flipped = [];
                lock = false;
                if (document.querySelectorAll('.card:not(.flipped)').length === 0) {
                    stopTimer();
                    const resultTime = difficulties[difficultySelect.value] - totalSeconds;
                    scores[currentPlayer].push({ moves, time: resultTime });

                    if (currentRound < totalRounds) {
                        alert(`Раунд ${currentRound} завершено. Наступний!`);
                        currentRound++;
                        startRound();
                    } else {
                        showResults();
                    }
                }
            } else {
                setTimeout(() => {
                    first.classList.remove('flipped');
                    second.classList.remove('flipped');
                    flipped = [];
                    lock = false;
                    if (players.length === 2) {
                        currentPlayer = 1 - currentPlayer;
                        currentPlayerSpan.textContent = players[currentPlayer];
                    }
                }, 1000);
            }
        }
    };

    document.querySelectorAll('.card').forEach((card) =>
        card.addEventListener('click', handleClick)
    );
};

const initGame = () => {
    const rows = parseInt(rowsInput.value);
    const cols = parseInt(colsInput.value);
    const totalCards = rows * cols;

    if (totalCards % 2 !== 0 || totalCards > 40) {
        alert("Кількість карток має бути парною і не більше 40.");
        return;
    }

    players = [player1Input.value];
    if (playersCountSelect.value === '2') {
        players.push(player2Input.value);
    }
    scores = players.map(() => []);
    currentPlayer = 0;
    currentRound = 1;
    totalRounds = parseInt(roundsInput.value);

    startRound();
};

const resetSettings = () => {
    rowsInput.value = 3;
    colsInput.value = 4;
    difficultySelect.value = 'easy';
    playersCountSelect.value = '1';
    document.getElementById('player2-label').style.display = 'none';
    player1Input.value = 'Гравець 1';
    player2Input.value = 'Гравець 2';
    roundsInput.value = 1;
};

const endGame = () => {
    document.querySelectorAll('.card').forEach(card =>
        card.removeEventListener('click', () => {})
    );
};

playersCountSelect.addEventListener('change', (e) => {
    const isTwoPlayers = e.target.value === '2';
    document.getElementById('player2-label').style.display = isTwoPlayers ? 'inline-block' : 'none';
});

startGameBtn.addEventListener('click', initGame);
resetSettingsBtn.addEventListener('click', resetSettings);
restartBtn.addEventListener('click', initGame);
