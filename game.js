let coins = 100;

const slotSymbols = ['🍒','🍋','🍊','🍉','⭐','💎','7️⃣'];

const coinsDisplay = document.getElementById('coins');
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const playButton = document.getElementById('playButton');
const message = document.getElementById('message');

function spinSlots() {
  if (coins <= 0) {
    message.textContent = "💀 No coins left! Refresh to play again.";
    return;
  }

  coins -= 10; // Each spin costs 10 coins
  coinsDisplay.textContent = `Coins: ${coins}`;
  message.textContent = "";

  // Randomly pick symbols
  const s1 = slotSymbols[Math.floor(Math.random()*slotSymbols.length)];
  const s2 = slotSymbols[Math.floor(Math.random()*slotSymbols.length)];
  const s3 = slotSymbols[Math.floor(Math.random()*slotSymbols.length)];

  // Animate slots
  slot1.textContent = '🎰';
  slot2.textContent = '🎰';
  slot3.textContent = '🎰';

  setTimeout(() => {
    slot1.textContent = s1;
    slot2.textContent = s2;
    slot3.textContent = s3;

    // Check win
    if (s1 === s2 && s2 === s3) {
      const winCoins = 50;
      coins += winCoins;
      coinsDisplay.textContent = `Coins: ${coins}`;
      message.textContent = `🎉 Jackpot! You won ${winCoins} coins!`;
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
      const winCoins = 20;
      coins += winCoins;
      coinsDisplay.textContent = `Coins: ${coins}`;
      message.textContent = `✨ Nice! You won ${winCoins} coins!`;
    } else {
      message.textContent = "😢 Try again!";
    }
  }, 500);
}

playButton.addEventListener('click', spinSlots);
