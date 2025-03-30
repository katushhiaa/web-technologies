const lights = {
    red: document.querySelector('.red'),
    yellow: document.querySelector('.yellow'),
    green: document.querySelector('.green')
};

const status = document.getElementById('status');
const nextBtn = document.getElementById('next');

let durations = {
    red: parseInt(prompt("Введіть час червоного світла (сек):", "5")) * 1000,
    yellow: parseInt(prompt("Введіть час жовтого світла (сек):", "3")) * 1000,
    green: parseInt(prompt("Введіть час зеленого світла (сек):", "7")) * 1000
};

let current = 0;
let blinking = 0;
let interval;
const sequence = ['red', 'yellow', 'green', 'yellow-blinking'];

function updateStatus(text) {
    status.textContent = `Стан: ${text}`;
}

function activateLight(color) {
    lights.red.classList.remove('active');
    lights.yellow.classList.remove('active');
    lights.green.classList.remove('active');

    if (color === 'red') {
        lights.red.classList.add('active');
        updateStatus('Червоний');
    } else if (color === 'yellow') {
        lights.yellow.classList.add('active');
        updateStatus('Жовтий');
    } else if (color === 'green') {
        lights.green.classList.add('active');
        updateStatus('Зелений');
    }
}

function startSequence() {
    const state = sequence[current];

    if (state === 'red') {
        activateLight('red');
        setTimeout(() => {
            current++;
            startSequence();
        }, durations.red);
    } else if (state === 'yellow') {
        activateLight('yellow');
        setTimeout(() => {
            current++;
            startSequence();
        }, durations.yellow);
    } else if (state === 'green') {
        activateLight('green');
        setTimeout(() => {
            current++;
            startSequence();
        }, durations.green);
    } else if (state === 'yellow-blinking') {
        blinking = 0;
        blinkYellow();
    }
}

function blinkYellow() {
    if (blinking < 6) {
        lights.yellow.classList.toggle('active');
        updateStatus('Миготливий жовтий');
        blinking++;
        interval = setTimeout(blinkYellow, 500);
    } else {
        current = 0;
        startSequence();
    }
}

nextBtn.addEventListener('click', () => {
    clearTimeout(interval);
    current = (current + 1) % sequence.length;
    if (sequence[current] === 'yellow-blinking') {
        blinking = 0;
        blinkYellow();
    } else {
        activateLight(sequence[current]);
    }
});

startSequence(); // Старт