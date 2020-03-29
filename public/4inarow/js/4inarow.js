
document.addEventListener('DOMContentLoaded', function() {
  function updateScale() {
    var layoutHeight = document.getElementById('layout').offsetHeight;
    var newScale = document.body.offsetHeight / layoutHeight;
    var scale = 'scale(' + newScale + ',' +  newScale + ')';
    document.getElementById('layout').style.transform = scale;
  }
  window.onresize = updateScale;
  updateScale();
  restart();
}, false);


let blankSpace = '⚪';
let turn = '🔴';
function restart() {
  var cells = document.querySelectorAll("table#grid td");
  let i;
  for (i=0; i<cells.length; i++) {
    cells[i].innerHTML = blankSpace;
  }

  setDropIcons(turn);

  var buttons = document.querySelectorAll("div .drop");
  let k;
  for (k=0; k<buttons.length; k++) {
    buttons[k].style.visibility = "visible";
  }
}

function dropPress(col) {
  console.log("pressed button " + col);
  let boardRows = document.getElementById('grid').rows;
  let row;
  for (row=boardRows.length-1; row>=0; row--) {
    if (boardRows[row].cells[col].innerHTML === blankSpace) {
      boardRows[row].cells[col].innerHTML = turn;
      console.log("placed (" + col + "," + row + ")");
      break;
    }
  }
  if (boardRows[0].cells[col].innerHTML != blankSpace) {
    document.getElementById("drop"+col).style.visibility = "hidden";
  }

  checkForWin();

  turn = turn === '🔴' ? '🔵' : '🔴';
  setDropIcons(turn);
}

function setDropIcons(icon) {
  let dropIcons = document.querySelectorAll("div .dropping");
  let j;
  for (j=0; j<dropIcons.length; j++) {
    dropIcons[j].innerHTML = icon;
  }
}

function checkForWin() {
  let win = false;
  let boardRows = document.getElementById('grid').rows;
  let row, col;
  for (row=0; row<boardRows.length; row++) {
    if (win) break;
    for (col=0; col<boardRows[row].cells.length; col++) {
      let currentVal = boardRows[row].cells[col].innerHTML;
      if (currentVal === blankSpace) {
        break;
      }
      //check across, to the right
      if (!win && col < 4) {
        if (currentVal === boardRows[row].cells[col+1].innerHTML
              && currentVal === boardRows[row].cells[col+2].innerHTML
              && currentVal === boardRows[row].cells[col+3].innerHTML
          ) {
          win = true;
        }
      }
      //check down
      if (!win && row < 3) {
        if (currentVal === boardRows[row+1].cells[col].innerHTML
              && currentVal === boardRows[row+2].cells[col].innerHTML
              && currentVal === boardRows[row+3].cells[col].innerHTML
          ) {
          win = true;
        }
      }
      //check diagonal, down to the right
      if (!win && col < 4 && row < 3) {
        if (currentVal === boardRows[row+1].cells[col+1].innerHTML
              && currentVal === boardRows[row+2].cells[col+2].innerHTML
              && currentVal === boardRows[row+3].cells[col+3].innerHTML
          ) {
          win = true;
        }
      }
      //check diagonal, up to the right
      if (!win && col < 4 && row > 2) {
        if (currentVal === boardRows[row-1].cells[col+1].innerHTML
              && currentVal === boardRows[row-2].cells[col+2].innerHTML
              && currentVal === boardRows[row-3].cells[col+3].innerHTML
          ) {
          win = true;
        }
      }
    }
  }
  if (win) {
    let buttons = document.querySelectorAll("div .drop");
    let k;
    for (k=0; k<buttons.length; k++) {
      buttons[k].style.visibility = "hidden";
    }
    console.log("winner");
  }
}

