
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
