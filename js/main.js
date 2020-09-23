'use strict';

//Global variable that represents the board, it equals to a function which returns it
var gBoard;
const MINE = '💣';
const EMPTY = '';

// The following variable provides us the information regarding the Game's inner counters of the user's 
// actions (marked cells/ cells that already revealed, timestamp, and isOn)

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

//The following variable will provide us the level of the game (beginner, medium, expert - and mines count
// accordinly)

var gLevel = {
    SIZE: 4,
    MINES: 2
};

//On the load of the page, that function will load the global functions which will create us 
// the total result eventually.

function init() {
    gBoard = buildBoard(gLevel);
    setMinesNegsCount(gBoard)
    renderBoard(gBoard);
}


function buildBoard(gLevel) {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = {
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell;
        }
    }
    board[2][2].isMine = true;
    board[2][0].isMine = true;
    return board;
}

function renderBoard(board) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            // var className = `cell cell-${i}-${j}`;
            var idName = "cell-" + i + "-" + j;
            var content;
            if (cell.isShown) {
                if (cell.isMine) {
                    content = MINE;
                } else {
                    content = cell.minesAroundCount;
                }
            } else {
                content = EMPTY;
            }
            // strHTML += `<td class ="${className}" onclick="cellClicked(this,${i},${j})">${content}</td>`
            strHTML += `<td class="cell" id="${idName}" onclick="cellClicked(this,${i},${j})">${content}</td>`

        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    //closes tbody and table tags
    var elContainer = document.querySelector('.game-container');
    elContainer.innerHTML = strHTML;
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        // console.log(board[i])
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var count = countMinesAroundCell(board, { i, j });
            cell.minesAroundCount = count;
        }
    }
}


function countMinesAroundCell(board, pos) {
    var count = 0;
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === pos.i && j === pos.j) continue;

            if (board[i][j].isMine) count++;
        }
    }
    return count;
}

function cellClicked(elCell, i, j) {
    // console.log(i,j)
    // console.log(elCell);
    var cell = gBoard[i][j];
    var value;


    if (cell.isMine) {
        value = MINE;
    } else {
        value = cell.minesAroundCount
    }
    renderCell(i, j, value)
}

function renderCell(i, j, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`#cell-${i}-${j}`);
    elCell.innerText = value;
}