let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("highScore").innerText = highScore;let score = 0;
let time = 30;
let timer = null;

function startGame() {
  score = 0;
  time = 30;

  document.getElementById("score").innerText = score;
  document.getElementById("time").innerText = time;

  if (timer) clearInterval(timer);

  timer = setInterval(() => {
    time--;
    document.getElementById("time").innerText = time;

    if (time <= 0) {
      clearInterval(timer);
      timer = null;
      alert("Game Over! Your Score: " + score);
    }
  }, 1000);
}

function tapGame() {
  if (time > 0) {
    score++;
    document.getElementById("score").innerText = score;
  }
}
