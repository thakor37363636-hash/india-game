let coins = 100;
const coinsDisplay = document.getElementById("coins");
const playButton = document.getElementById("playButton");
const slots = [
  document.getElementById("slot1"),
  document.getElementById("slot2"),
  document.getElementById("slot3")
];

const symbols = ["🍒","🍋","🍊","🍉","⭐","💎"];

function spin() {
  if(coins <= 0){
    alert("તમારા coins ખતમ! Game Over 😢");
    return;
  }

  coins--;
  coinsDisplay.textContent = "Coins: " + coins;

  // Spin all slots
  let results = [];
  slots.forEach((slot, i) => {
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    slot.textContent = symbol;
    results.push(symbol);
    slot.classList.remove("win");
  });

  // Check for win
  const first = results[0];
  if(results.every(s => s === first)){
    let winCoins = 20;
    coins += winCoins;
    coinsDisplay.textContent = "Coins: " + coins;
    slots.forEach(slot => slot.classList.add("win"));
    alert(`🎉 Jackpot! You won ${winCoins} coins!`);
  } else if(results[0] === results[1] || results[1] === results[2] || results[0] === results[2]) {
    let winCoins = 5;
    coins += winCoins;
    coinsDisplay.textContent = "Coins: " + coins;
    alert(`✨ Nice! You won ${winCoins} coins!`);
  }
}

playButton.addEventListener("click", spin);
