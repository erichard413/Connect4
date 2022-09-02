/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// reset button

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function(){
  clearBoard();
})

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

  // TODO: set "board" to empty HEIGHT x WIDTH matrix array - done
  const makeBoard = (rows, columns) => {
         for (let h = 0; h < columns; h++){
         let row = [];
            for(let i = 0; i < rows; i++){
         row[i] = null;
     }
     board.push(row);
     }
     return board;
}
makeBoard(WIDTH, HEIGHT);

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board" - done
const htmlBoard = document.querySelector('#board');
  // TODO: add comment for this code
  let top = document.createElement("tr");  // variable top creates a TR element
  top.setAttribute("id", "column-top"); // TR element we created assign ID of "column-top"
  top.addEventListener("click", handleClick); //add even listener for a click on top, when clicked, do 'handleClick');

  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top); // generates WIDTH amount of td elements with ID of ${x} (index)

  // TODO: add comment for this code
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr"); //create HEIGHT # of rows
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td"); //create variable named cell, which is a newly created "td"
      cell.setAttribute("id", `${y}-${x}`); // assigns ID of y height, and x width position
      row.append(cell); // adds CELL data we've created above to the ROW.
    }
    htmlBoard.append(row); //ADD row to the htmlBoard table.
  }
}

const clearBoard = () => {  //this code will clear the board after TIE, reset, or WIN
  board = [];
  makeBoard(WIDTH, HEIGHT);
  let removeDiv = document.querySelectorAll('.piece');
  removeDiv.forEach(function(a){
    a.remove();
  })
}

/** findSpotForCol: given column x, return top empty y (null if filled) */


  // TODO: write the real version of this, rather than always returning 0 - done
  function findSpotForCol(x){
    let colIdx = (HEIGHT - 1);
    if(board[0][x] !== null){
        return null
    } else {
        for(let i = colIdx; i >= 0; i--){
            if (board[i][x] === null){
                return i   // this retuns the board[x][y] * y value that is NULL
            }
        }
    }
}



/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const newPiece = document.createElement('div');
  newPiece.classList.add('piece');
  newPiece.setAttribute('id', `player${currPlayer}`);
  let newPosition = document.getElementById(`${y}-${x}`)
  newPosition.append(newPiece);
  board[y][x] = currPlayer;
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

const checkIfFull = () => {
if (board[0].includes(null) === false){
  endGame(`TIE!`)
  clearBoard();
}
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board -done
  placeInTable(y, x);

  // check for win
  checkForWin();
  if (checkForWin()) {
    endGame(`Player ${currPlayer} won!`);
    clearBoard();
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame - done
  checkIfFull();
  // switch players
  // TODO: switch currPlayer 1 <-> 2 - done
 currPlayer = (currPlayer === 1) ? 2 : 1; //ternary operator - if player one, switch to player 2, vice versa.
 
}



/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];  //gets cells horizontally (all on same y)
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // gets vertical cells (all on same x)
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // gets down + R  
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // gets every down + L

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { // if ANY of the cell combos returns true on _win test, return true game is over.
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
