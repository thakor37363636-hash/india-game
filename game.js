// Initial coins
let coins = 100;

// Get DOM elements
const coinsDisplay = document.getElementById("coins");
const slot = document.getElementById("slot");
const playButton = document.getElementById("playButton");

// Possible slot symbols
const symbols = ["🍒", "🍋", "🍉", "⭐", "💎", "7️⃣"];

// Function to spin the slot
function spin() {
  if (coins <= 0) {
    alert("તમારા કોইન ખતમ થઈ ગયા છે! રમત ફરી શરુ કરો.");
    return;
  }

  // Deduct 10 coins per spin
  coins -= 10;
  coinsDisplay.textContent = `Coins: ${coins}`;

  // Animate slot
  slot.style.transform = "rotateX(360deg)";
  setTimeout(() => {
    // Randomly pick a symbol
    const randomIndex = Math.floor(Math.random() * symbols.length);
    const randomSymbol = symbols[randomIndex];

    // Show the symbol
    slot.textContent = randomSymbol;
    slot.style.transform = "rotateX(0deg)";

    // Win conditions
    if (randomSymbol === "7️⃣") {
      coins += 100; // Win 100 coins if 7 appears
      coinsDisplay.textContent = `Coins: ${coins}`;
      alert("🎉 Congratulations! You won 100 coins!");
    }
  }, 200);
}

// Add click event to button
playButton.addEventListener("click", spin);
