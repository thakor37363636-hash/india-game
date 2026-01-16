let coins = 100;
const slot = document.getElementById('slot');
const playButton = document.getElementById('playButton');
const coinsDiv = document.getElementById('coins');

playButton.addEventListener('click', () => {
  if (coins <= 0) {
    alert("Not enough coins!");
    return;
  }

  coins -= 10;
  coinsDiv.textContent = `Coins: ${coins}`;

  const symbols = ['🍒', '🍋', '🍊', '⭐', '💎'];
  const spinResult = symbols[Math.floor(Math.random() * symbols.length)];

  slot.textContent = spinResult;

  // Win bonus coins if lucky symbol
  if (spinResult === '💎') {
    coins += 50;
    coinsDiv.textContent = `Coins: ${coins}`;
    alert("🎉 Jackpot! +50 Coins");
  }
});
