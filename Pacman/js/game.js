'use strict'
const WALL = '<h2 class= "wall">.</h2>';
const FOOD = '<h2 class= "food">.</h2>';
const EMPTY = ' ';
const SUPER_FOOD = '&#x1F354';


var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    gGame.score = 0
    document.querySelector('h2 span').innerText = 0
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    var elModal = document.querySelector('.modal')
    elModal.style.display = "none";
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if (i === 1 && j === 1 || i === 1 && j === SIZE - 2 ||
                i === SIZE - 2 && j === 1 ||
                i === SIZE - 2 && j === SIZE - 2) {
                board[i][j] = SUPER_FOOD
            }
        }
    }
    return board;
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    var elModal = document.querySelector('.modal')
    elModal.style.display = "block";
}

function checkIsWin() {
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard[0].length - 1; j++) {
            var currCell = gBoard[i][j]
            if (currCell === FOOD) {
                return false
            }
        }
    }
    return true
}