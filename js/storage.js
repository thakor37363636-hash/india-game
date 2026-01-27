// LocalStorage Manager for Tap Target Game
class StorageManager {
  static KEYS = {
    HIGH_SCORE: 'tapTarget_highScore',
    SETTINGS: 'tapTarget_settings',
    STATS: 'tapTarget_stats'
  };

  static DEFAULT_SETTINGS = {
    soundEnabled: true,
    vibrationEnabled: true,
    volume: 0.5
  };

  static DEFAULT_STATS = {
    totalGames: 0,
    totalTaps: 0,
    totalScore: 0,
    bestCombo: 0,
    lastPlayed: null
  };

  static getHighScore() {
    return parseInt(localStorage.getItem(this.KEYS.HIGH_SCORE)) || 0;
  }

  static setHighScore(score) {
    const current = this.getHighScore();
    if (score > current) {
      localStorage.setItem(this.KEYS.HIGH_SCORE, score.toString());
      return true; // New record
    }
    return false;
  }

  static getSettings() {
    try {
      const stored = localStorage.getItem(this.KEYS.SETTINGS);
      return stored ? { ...this.DEFAULT_SETTINGS, ...JSON.parse(stored) } : this.DEFAULT_SETTINGS;
    } catch (e) {
      return this.DEFAULT_SETTINGS;
    }
  }

  static saveSettings(settings) {
    localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
  }

  static getStats() {
    try {
      const stored = localStorage.getItem(this.KEYS.STATS);
      return stored ? { ...this.DEFAULT_STATS, ...JSON.parse(stored) } : this.DEFAULT_STATS;
    } catch (e) {
      return this.DEFAULT_STATS;
    }
  }

  static updateStats(gameData) {
    const stats = this.getStats();
    stats.totalGames++;
    stats.totalTaps += gameData.taps || 0;
    stats.totalScore += gameData.score || 0;
    stats.bestCombo = Math.max(stats.bestCombo, gameData.combo || 0);
    stats.lastPlayed = new Date().toISOString();
    localStorage.setItem(this.KEYS.STATS, JSON.stringify(stats));
  }
}
