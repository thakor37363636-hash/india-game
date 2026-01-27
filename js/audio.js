// Audio Manager for Tap Target Game
class AudioManager {
  constructor() {
    this.sounds = {};
    this.enabled = true;
    this.volume = 0.5;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    
    const settings = StorageManager.getSettings();
    this.enabled = settings.soundEnabled;
    this.volume = settings.volume;
    
    // Define sound configurations
    const soundConfig = {
      tap: { freq: 800, duration: 50 },
      hit: { freq: 1000, duration: 100 },
      miss: { freq: 200, duration: 150 },
      combo: { freq: 1200, duration: 200 },
      gameOver: { freq: 400, duration: 500 },
      tick: { freq: 600, duration: 30 }
    };

    // Pre-create audio contexts for better performance
    this.audioContext = null;
    if (window.AudioContext || window.webkitAudioContext) {
      try {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        console.warn('Web Audio API not supported');
      }
    }

    this.initialized = true;
  }

  play(soundName) {
    if (!this.enabled || !this.audioContext) return;

    try {
      const soundMap = {
        tap: { freq: 800, duration: 50 },
        hit: { freq: 1000, duration: 100 },
        miss: { freq: 200, duration: 150 },
        combo: { freq: 1200, duration: 200 },
        gameOver: { freq: 400, duration: 500 },
        tick: { freq: 600, duration: 30 }
      };

      const config = soundMap[soundName];
      if (!config) return;

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = config.freq;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + config.duration / 1000);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + config.duration / 1000);
    } catch (e) {
      console.warn('Error playing sound:', e);
    }
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    const settings = StorageManager.getSettings();
    settings.soundEnabled = enabled;
    StorageManager.saveSettings(settings);
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    const settings = StorageManager.getSettings();
    settings.volume = this.volume;
    StorageManager.saveSettings(settings);
  }

  toggle() {
    this.setEnabled(!this.enabled);
    return this.enabled;
  }
}

// Create global instance
const audioManager = new AudioManager();
