// Target Manager for Tap Target Game
class TargetManager {
  constructor(gameArea) {
    this.gameArea = gameArea;
    this.currentTarget = null;
    this.config = {
      baseSize: 80,
      minSize: 40,
      shrinkRate: 0.5,
      spawnDelay: {
        initial: 800,
        minimum: 300,
        decreaseRate: 15
      },
      colors: [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
        '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
      ]
    };
    this.currentSize = this.config.baseSize;
    this.currentDelay = this.config.spawnDelay.initial;
  }

  spawn(score) {
    // Remove existing target if any
    this.remove();

    // Calculate difficulty progression
    const level = Math.floor(score / 10);
    this.currentSize = Math.max(
      this.config.minSize,
      this.config.baseSize - (level * 4)
    );
    this.currentDelay = Math.max(
      this.config.spawnDelay.minimum,
      this.config.spawnDelay.initial - (score * this.config.spawnDelay.decreaseRate)
    );

    // Create target element
    const target = document.createElement('div');
    target.className = 'target';
    target.id = 'current-target';

    // Random position (with margin from edges)
    const gameRect = this.gameArea.getBoundingClientRect();
    const margin = this.currentSize / 2 + 10;
    const maxX = gameRect.width - margin * 2;
    const maxY = gameRect.height - margin * 2;

    const x = Math.random() * maxX + margin;
    const y = Math.random() * maxY + margin;

    // Random color
    const color = this.config.colors[Math.floor(Math.random() * this.config.colors.length)];

    // Apply styles
    target.style.width = `${this.currentSize}px`;
    target.style.height = `${this.currentSize}px`;
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
    target.style.backgroundColor = color;

    this.gameArea.appendChild(target);
    this.currentTarget = target;

    return target;
  }

  remove() {
    if (this.currentTarget && this.currentTarget.parentNode) {
      this.currentTarget.parentNode.removeChild(this.currentTarget);
    }
    this.currentTarget = null;
  }

  animateHit(target) {
    if (!target) return;
    target.classList.add('hit');
    setTimeout(() => this.remove(), 300);
  }

  animateMiss(target) {
    if (!target) return;
    target.classList.add('miss');
    setTimeout(() => this.remove(), 300);
  }

  getCurrentTarget() {
    return this.currentTarget;
  }

  getCurrentDelay() {
    return this.currentDelay;
  }

  getPointsForTarget() {
    // Award more points for smaller targets
    if (this.currentSize <= 50) return 3;
    if (this.currentSize <= 65) return 2;
    return 1;
  }
}
