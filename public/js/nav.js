document.addEventListener('DOMContentLoaded', function() {
  function updateScale() {
    var layoutWidth = document.getElementById('layout').offsetWidth;
    var layoutHeight = document.getElementById('layout').offsetHeight;
    var newScaleA = document.body.offsetWidth / layoutWidth;
    var newScaleB = document.body.offsetHeight / layoutHeight;
    var newScale = Math.min(newScaleA, newScaleB);
    var scale = 'scale(' + newScale + ',' +  newScale + ')';
    document.getElementById('layout').style.transform = scale;
  }
  window.onresize = updateScale;
  updateScale();
  restart();
}, false);


function openNav() {
  console.log("open nav");
  document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}


document.addEventListener('DOMContentLoaded', function() {
  let overlayContent = `
    <!-- The overlay -->
    <div id="myNav" class="overlay">
      <!-- Button to close the overlay navigation -->
      <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
      <!-- Overlay content -->
      <div class="overlay-content">
        <a href="../splat/" onclick="closeNav()">Guess The Number</a>
        <a href="../4inarow/" onclick="closeNav()">Four In A Row</a>
      </div>
    </div>
  `
  document.body.innerHTML = overlayContent + document.body.innerHTML;
}, false);
