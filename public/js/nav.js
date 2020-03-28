function openNav() {
  console.log("open nav");
  document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}


let overlayContent = `
<!-- The overlay -->
<div id="myNav" class="overlay">
  <!-- Button to close the overlay navigation -->
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <!-- Overlay content -->
  <div class="overlay-content">
    <a href="#" onclick="closeNav()">Guess The Number</a>
  </div>
</div>
`
document.body.innerHTML = overlayContent + document.body.innerHTML;
