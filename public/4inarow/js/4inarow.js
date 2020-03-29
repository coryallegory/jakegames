
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


let turn = '🔴';
function restart() {
  var cells = document.querySelectorAll("table#grid td");
  let i;
  for (i=0; i<cells.length; i++) {
    cells[i].innerHTML = '⚪';
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
    if (boardRows[row].cells[col].innerHTML === '⚪') {
      boardRows[row].cells[col].innerHTML = turn;
      console.log("placed row " + row);
      break;
    }
  }
  if (boardRows[0].cells[col].innerHTML != '⚪') {
    document.getElementById("drop"+col).style.visibility = "hidden";
  }
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
