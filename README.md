# 🎯 Tap Target - Reflex Game

A hyper-casual one-tap reflex game where players tap circular targets that appear on screen to score points within 30 seconds. Built with vanilla JavaScript for maximum performance and compatibility.

## 🎮 Game Features

### Core Gameplay
- **30-second matches** for quick, engaging sessions
- **Progressive difficulty** - targets get smaller and spawn faster as you score
- **Combo system** - consecutive hits build combos for extra excitement
- **Responsive targets** - dynamic size based on your skill level
- **High score tracking** - compete with your best performance

### Visual & Audio
- **Vibrant color palette** with 8 different target colors
- **Smooth animations** for spawning, hitting, and missing targets
- **Audio feedback** using Web Audio API for instant response
- **Haptic feedback** on supported devices
- **Floating score indicators** show points earned
- **Ripple effects** on tap for satisfying visual feedback

### Technical Features
- **Pure vanilla JavaScript** - no dependencies
- **PWA support** - installable on mobile devices
- **Offline-first** - works without internet connection
- **LocalStorage persistence** - saves high scores and settings
- **Touch-optimized** - designed for mobile gameplay
- **Responsive design** - adapts to all screen sizes

## 🏗️ Project Structure

```
india-game/
├── index.html          # Main HTML structure
├── css/
│   └── style.css       # All styles and animations
├── js/
│   ├── game.js         # Game engine and state machine
│   ├── target.js       # Target spawning and management
│   ├── audio.js        # Sound effects controller
│   └── storage.js      # LocalStorage manager
├── assets/
│   ├── sounds/         # Audio files (placeholder)
│   └── icons/          # PWA icons (placeholder)
├── manifest.json       # PWA manifest
├── sw.js              # Service worker for offline support
└── README.md          # This file
```

## 🎯 Game Mechanics

### Scoring System
- **Large targets**: +1 point
- **Medium targets**: +2 points  
- **Small targets**: +3 points
- **Combo bonus**: Visual feedback for consecutive hits

### Difficulty Progression
Every 10 points:
- Target size decreases by 4px (minimum 40px)
- Spawn delay decreases by 150ms (minimum 300ms)
- Game becomes more challenging

### Timer System
- Fixed 30-second duration
- Visual warning (red pulse) under 10 seconds
- Audio tick in final 5 seconds

## 🚀 Getting Started

### Quick Start
Simply open `index.html` in a modern web browser:

```bash
# Option 1: Direct file open
open index.game/html

# Option 2: Local server (recommended)
python -m http.server 8000
# Then visit http://localhost:8000
```

### Installation as PWA
1. Open the game in Chrome/Safari on mobile
2. Tap the "Add to Home Screen" option
3. Launch from your home screen like a native app

## 🎨 Customization

### Colors
Edit the CSS variables in `css/style.css`:

```css
:root {
  --bg-primary: #1a1a2e;        /* Background */
  --accent-primary: #e94560;    /* Primary accent */
  --success: #4ecca3;           /* Success color */
  /* ... more colors */
}
```

### Target Configuration
Modify settings in `js/target.js`:

```javascript
this.config = {
  baseSize: 80,           // Starting size
  minSize: 40,            // Minimum size
  shrinkRate: 0.5,        // Size decrease rate
  spawnDelay: {
    initial: 800,         // Starting delay (ms)
    minimum: 300,         // Fastest spawn
    decreaseRate: 15      // Speed increase rate
  }
};
```

### Audio Settings
Adjust sound configurations in `js/audio.js`:

```javascript
const soundMap = {
  tap: { freq: 800, duration: 50 },
  hit: { freq: 1000, duration: 100 },
  // ... more sounds
};
```

## 📱 Browser Support

- Chrome 60+
- Safari 12+
- Firefox 60+
- Edge 79+
- Samsung Internet 8+

### Required APIs
- LocalStorage (required)
- Web Audio API (optional, for sound)
- Vibration API (optional, for haptics)
- Service Worker (optional, for offline)
- Touch Events (for mobile)

## 🎯 Development

### File Organization
- **storage.js**: Handles all data persistence
- **audio.js**: Manages sound effects
- **target.js**: Controls target spawning and behavior
- **game.js**: Main game loop and state management

### Game States
1. **IDLE**: Initial page load
2. **READY**: Start screen visible
3. **PLAYING**: Active gameplay
4. **GAME_OVER**: Timer reached zero
5. **RESULTS**: Score display

## 🐛 Known Issues & Limitations

- Audio requires user interaction to start (browser security)
- Vibration API not supported on iOS
- Service Worker requires HTTPS in production (works on localhost)

## 🔮 Future Enhancements

- [ ] Global leaderboards
- [ ] Power-ups and special targets
- [ ] Multiple game modes (endless, zen, etc.)
- [ ] Achievement system
- [ ] Daily challenges
- [ ] Multiplayer support
- [ ] Social sharing

## 📄 License

MIT License - Feel free to use and modify for your projects

## 🙏 Credits

Created for the india-game repository as a complete rewrite of the original tap game with modern best practices and enhanced gameplay.

---

**Enjoy the game! 🎯**
