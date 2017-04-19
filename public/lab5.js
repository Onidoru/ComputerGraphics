(function() {

  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  var field = document.getElementById("field");
  var ball = document.getElementById("ball");

  var maxX = field.clientWidth - ball.offsetWidth;
  var maxY = field.clientHeight - ball.offsetHeight;

  var duration = 4;
  var gridSize = 50;

  var start = null;
  var stretchFactor;

  function step(timestamp) {
    var progress, x, y;
    if (start === null) {
      start = timestamp;
      stretchFactor = 1
    }

    progress = (timestamp - start) / duration / 1000;

    x = 3 * stretchFactor * Math.cos(progress * Math.PI / 2) + 1 * stretchFactor * Math.cos(progress * Math.PI * 1.5); // x = f(t)
    y = 3 * stretchFactor * Math.sin(progress * Math.PI / 2) - 1 * stretchFactor * Math.sin(progress * Math.PI * 1.5); // y = f(t)

    ball.style.left = maxX / 2 + (gridSize * x) + "px";
    ball.style.bottom = maxY / 2 + (gridSize * y) + "px";

    if (progress >= 4) start = null;
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);

})();
