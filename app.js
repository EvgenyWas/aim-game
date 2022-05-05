const options = {
    startBtn: document.querySelector('#start'),
    screens: document.querySelectorAll('.screen'),
    timeList: document.querySelector('#time-list'),
    timer: document.querySelector('#time'),
    board: document.querySelector('#board'),
    hex: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'],
    time: 0,
    score: 0,
};

class AimGame {
    constructor({startBtn, screens, timeList, timer, board, hex, time, score}) {
        this.startBtn = startBtn;
        this.screens = screens;
        this.timeList = timeList;
        this.timer = timer;
        this.board = board;
        this.hex = hex;
        this.time = time;
        this.score = score;

        this.init = function() {
            this.startBtn.addEventListener('click', this.#start);
            document.addEventListener('keydown', this.#enterClick);
            this.timeList.addEventListener('click', this.#timeClick);
            this.board.addEventListener('click', this.#circleClick);
        };
    };

    #start = () => {
        this.screens[0].classList.add('up');
    };

    #enterClick = (event) => {
        if (event.key === 'Enter') {
            this.#start();
            event.preventDefault();
        };
    };

    #timeClick = (event) => {
        if (event.target.classList.contains('time-btn')) {
            this.time = parseInt(event.target.dataset.time);
            this.screens[1].classList.add('up');
            this.#startGame();
        };
    };

    #circleClick = (event) => {
        if (event.target.classList.contains('circle')) {
            this.score++;
            event.target.remove();
            this.#createRandomCircle();
        };
    };

    #startGame = () => {
        setInterval(this.#decreaseTime, 1000);
        this.#createRandomCircle()
        this.#setTime(this.time);
    };
    
    #decreaseTime = () => {
        if (this.time === 0) {
            this.#finishGame();
        } else {
            let currentTime = --this.time;
            if (currentTime < 10) currentTime = `0${currentTime}`;
    
            this.#setTime(currentTime);
        };
    };

    #setTime = (value) => {
        this.timer.innerHTML = `00:${value}`;
    };

    #finishGame = () => {
        this.timer.parentNode.classList.add('hide');
        this.board.innerHTML = `<h1>Your score: <span class="primary">${this.score}</span></h1>`;
    };

    #createRandomCircle = () => {
        const circle = document.createElement('div');
        const size = this.#getRandomNumber(5, 60);
        const {width, height} = this.board.getBoundingClientRect();
        const shiftX = this.#getRandomNumber(0, width - size);
        const shiftY = this.#getRandomNumber(0, height - size)
        let randomColor = this.#getRandomColor();

        circle.className = 'circle';
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.top = `${shiftY}px`;
        circle.style.left = `${shiftX}px`;
        circle.style.background = randomColor;

        this.board.append(circle);
    };

    #getRandomNumber = (min, max) => {
        return Math.round(Math.random() * (max - min) + min);
    };

    #getRandomColor = () => {
        let hexColor = '#';
        const randomIndex = () => Math.floor(Math.random() * this.hex.length);

        for (let i = 0; i < 6; i++) {
            hexColor += this.hex[randomIndex()];
        };
        return hexColor;
    };
};

const aimGame = new AimGame(options);

document.addEventListener("DOMContentLoaded", aimGame.init());