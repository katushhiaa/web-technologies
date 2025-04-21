'use strict';
let level = 1;
let score = 0;
let difficulty = 2000;
let playerFired = false;
let duelStartTime = 0;

const gunman = document.querySelector('.gunman');
const message = document.querySelector('.message');
const scoreNum = document.querySelector('.score-panel__score_num');
const levelText = document.querySelector('.score-panel__level');
const gunmanTime = document.querySelector('.time-panel__gunman');
const youTime = document.querySelector('.time-panel__you');

const music = document.getElementById('background-music');
//const fireSound = document.getElementById('fire-sound');
//const winSound = document.getElementById('win-sound');
//const loseSound = document.getElementById('lose-sound');

document.querySelector('.button-start-game').addEventListener('click', startGame);
document.querySelector('.button-restart').addEventListener('click', restartGame);
document.querySelector('.button-next-level').addEventListener('click', nextLevel)// variables and elements

function startGame() {
    document.querySelector('.game-menu').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'block';
    document.querySelector('.game-screen').style.display = 'block';
    document.querySelector('.game-panels').style.display = 'block';

    moveGunman()
}

function restartGame() {
    window.location.reload();
}

function nextLevel() {
    level++;
    difficulty = Math.max(500, difficulty - 300);
    levelText.textContent = 'Level ' + level;
    scoreNum.textContent = score;
    youTime.textContent = '0.00';
    gunmanTime.textContent = '0.00';
    message.textContent = '';
    document.querySelector('.button-next-level').style.display = 'none';
    moveGunman();
}

function moveGunman() {
    gunman.className = 'gunman gunman-level-1 moving'

    setTimeout(() => {
        gunman.className = 'gunman gunman-level-1 standing gunman-level-1__standing';
        prepareForDuel();
    }, 5000)
}

function prepareForDuel() {
    playerFired = false;
    message.textContent = '...';
    message.classList.remove('message--win', 'message--dead');

    setTimeout(() => {
        //fireSound.play();
        message.textContent = 'FIRE!';
        message.classList.add('message--fire');

        gunman.classList.remove('gunman-level-1__standing');
        gunman.classList.add('gunman-level-1__ready');

        duelStartTime = performance.now();

        const duelTimeout = setTimeout(() => {
            if (!playerFired) gunmanShootsPlayer();
        }, 700);

        gunman.addEventListener('click', () => {
            if (playerFired) return;
            playerFired = true;

            timeCounter();
            scoreCount();
            //winSound.play();
            playerShootsGunman();
            clearTimeout(duelTimeout);
        }, { once: true });
    }, difficulty);
}

function timeCounter() {
    const playerTime = ((performance.now() - duelStartTime) / 1000).toFixed(2);
    youTime.textContent = playerTime;
    gunmanTime.textContent = '0.70';
}

function gunmanShootsPlayer() {
    document.querySelector('.game-screen').classList.add('game-screen--death');
    message.textContent = 'YOU LOSE!';
    message.classList.add('message--dead');
    //loseSound.play();
    document.querySelector('.button-restart').style.display = 'block';
    music.pause();
}

function playerShootsGunman() {
    gunman.classList.remove('gunman-level-1__ready');
    gunman.classList.add('gunman-level-1__death');
    message.textContent = 'YOU WIN!';
    message.classList.add('message--win');
    document.querySelector('.button-next-level').style.display = 'block';}

function scoreCount() {
    score += level * 100;
    scoreNum.textContent = score;
}
