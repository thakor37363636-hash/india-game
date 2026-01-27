// Main Game Engine for Tap Target Game
class Game {
  constructor() {
    this.state = 'IDLE';
    this.score = 0;
    this.timeLeft = 30;
    this.combo = 0;
    this.maxCombo = 0;
    this.totalTaps = 0;
    this.timer = null;
    this.spawnTimer = null;
    this.isNewRecord = false;

    // DOM elements
    this.screens = {
      start: document.getElementById('start-screen'),
      game: document.getElementById('game-screen'),
      gameOver: document.getElementById('gameover-screen')
    };

    this.elements = {
      score: document.getElementById('score'),
      timer: document.getElementById('timer'),
      combo: document.getElementById('combo'),
      comboText: document.getElementById('combo-text'),
      finalScore: document.getElementById('final-score'),
      bestScore: document.getElementById('best-score'),
      highScore: document.getElementById('high-score'),
      newRecordBadge: document.getElementById('new-record'),
      gameArea: document.getElementById('game-area'),
      soundToggle: document.getElementById('sound-toggle'),
      vibrationToggle: document.getElementById('vibration-toggle')
    };

    // Managers
    this.targetManager = new TargetManager(this.elements.gameArea);
    
    // Initialize
    this.init();
  }

  init() {
    // Initialize audio
    audioManager.init();

    // Load high score
    const highScore = StorageManager.getHighScore();
    if (this.elements.highScore) {
      this.elements.highScore.textContent = highScore;
    }

    // Set up event listeners
    this.setupEventListeners();

    // Show start screen
    this.showScreen('start');
  }

  setupEventListeners() {
    // Start button
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.startGame());
    }

    // Restart button
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => this.startGame());
    }

    // Game area tap handling
    if (this.elements.gameArea) {
      this.elements.gameArea.addEventListener('click', (e) => this.handleTap(e));
      this.elements.gameArea.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.handleTap(e.touches[0]);
      }, { passive: false });
    }

    // Settings toggles
    if (this.elements.soundToggle) {
      this.elements.soundToggle.addEventListener('click', () => {
        const enabled = audioManager.toggle();
        this.elements.soundToggle.textContent = enabled ? '🔊' : '🔇';
      });
    }

    if (this.elements.vibrationToggle) {
      this.elements.vibrationToggle.addEventListener('click', () => {
        const settings = StorageManager.getSettings();
        settings.vibrationEnabled = !settings.vibrationEnabled;
        StorageManager.saveSettings(settings);
        this.elements.vibrationToggle.textContent = settings.vibrationEnabled ? '📳' : '📴';
      });
    }
  }

  startGame() {
    // Reset state
    this.state = 'PLAYING';
    this.score = 0;
    this.timeLeft = 30;
    this.combo = 0;
    this.maxCombo = 0;
    this.totalTaps = 0;
    this.isNewRecord = false;

    // Update UI
    this.updateScore();
    this.updateTimer();
    this.updateCombo();

    // Show game screen
    this.showScreen('game');

    // Start timer
    this.startTimer();

    // Spawn first target
    this.spawnTarget();

    // Play start sound
    audioManager.play('tick');
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.updateTimer();

      // Warning sound in last 5 seconds
      if (this.timeLeft <= 5 && this.timeLeft > 0) {
        audioManager.play('tick');
      }

      if (this.timeLeft <= 0) {
        this.endGame();
      }
    }, 1000);
  }

  spawnTarget() {
    if (this.state !== 'PLAYING') return;

    const target = this.targetManager.spawn(this.score);
    
    // Schedule next spawn
    const delay = this.targetManager.getCurrentDelay();
    this.spawnTimer = setTimeout(() => {
      // If target wasn't tapped, it's a miss
      if (this.targetManager.getCurrentTarget()) {
        this.handleMiss();
      }
      this.spawnTarget();
    }, delay + 1500); // Target lifetime
  }

  handleTap(e) {
    if (this.state !== 'PLAYING') return;

    const target = this.targetManager.getCurrentTarget();
    if (!target) return;

    // Check if tap hit the target
    const rect = target.getBoundingClientRect();
    const x = e.clientX || e.pageX;
    const y = e.clientY || e.pageY;

    const hit = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

    if (hit) {
      this.handleHit(target, x, y);
    }
  }

  handleHit(target, x, y) {
    this.totalTaps++;
    
    // Calculate points
    const points = this.targetManager.getPointsForTarget();
    this.score += points;
    this.combo++;
    this.maxCombo = Math.max(this.maxCombo, this.combo);

    // Update UI
    this.updateScore();
    this.updateCombo();

    // Show floating score
    this.showFloatingScore(x, y, points);

    // Visual and audio feedback
    this.targetManager.animateHit(target);
    audioManager.play(this.combo > 3 ? 'combo' : 'hit');
    this.vibrate([15, 10, 15]);

    // Create ripple effect
    this.createRipple(x, y, true);

    // Clear spawn timer and immediately spawn new target
    if (this.spawnTimer) {
      clearTimeout(this.spawnTimer);
    }
    setTimeout(() => this.spawnTarget(), 100);
  }

  handleMiss() {
    // Reset combo
    this.combo = 0;
    this.updateCombo();

    // Animate miss
    const target = this.targetManager.getCurrentTarget();
    if (target) {
      this.targetManager.animateMiss(target);
    }

    audioManager.play('miss');
  }

  endGame() {
    this.state = 'GAME_OVER';

    // Clear timers
    if (this.timer) clearInterval(this.timer);
    if (this.spawnTimer) clearTimeout(this.spawnTimer);

    // Remove any remaining target
    this.targetManager.remove();

    // Save high score
    this.isNewRecord = StorageManager.setHighScore(this.score);

    // Update stats
    StorageManager.updateStats({
      score: this.score,
      taps: this.totalTaps,
      combo: this.maxCombo
    });

    // Show game over screen
    audioManager.play('gameOver');
    this.vibrate([100, 50, 100, 50, 200]);

    setTimeout(() => {
      this.showGameOver();
    }, 500);
  }

  showGameOver() {
    if (this.elements.finalScore) {
      this.elements.finalScore.textContent = this.score;
    }

    const bestScore = StorageManager.getHighScore();
    if (this.elements.bestScore) {
      this.elements.bestScore.textContent = bestScore;
    }

    if (this.elements.newRecordBadge) {
      this.elements.newRecordBadge.style.display = this.isNewRecord ? 'block' : 'none';
    }

    this.showScreen('gameOver');
  }

  updateScore() {
    if (this.elements.score) {
      this.elements.score.textContent = this.score;
    }
  }

  updateTimer() {
    if (this.elements.timer) {
      this.elements.timer.textContent = this.timeLeft;
      
      // Add warning class when time is low
      if (this.timeLeft <= 10) {
        this.elements.timer.classList.add('warning');
      } else {
        this.elements.timer.classList.remove('warning');
      }
    }
  }

  updateCombo() {
    if (this.elements.combo && this.elements.comboText) {
      if (this.combo > 1) {
        this.elements.combo.textContent = this.combo;
        this.elements.comboText.style.display = 'flex';
        this.elements.comboText.classList.add('shake');
        setTimeout(() => {
          this.elements.comboText.classList.remove('shake');
        }, 300);
      } else {
        this.elements.comboText.style.display = 'none';
      }
    }
  }

  showFloatingScore(x, y, points) {
    const floatingScore = document.createElement('div');
    floatingScore.className = 'floating-score';
    floatingScore.textContent = `+${points}`;
    floatingScore.style.left = `${x}px`;
    floatingScore.style.top = `${y}px`;
    
    document.body.appendChild(floatingScore);
    
    setTimeout(() => {
      floatingScore.remove();
    }, 1000);
  }

  createRipple(x, y, success) {
    const ripple = document.createElement('div');
    ripple.className = `ripple ${success ? 'success' : 'miss'}`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  vibrate(pattern) {
    const settings = StorageManager.getSettings();
    if (settings.vibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }

  showScreen(screenName) {
    // Hide all screens
    Object.values(this.screens).forEach(screen => {
      if (screen) screen.style.display = 'none';
    });

    // Show requested screen
    if (this.screens[screenName]) {
      this.screens[screenName].style.display = 'flex';
    }
  }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
