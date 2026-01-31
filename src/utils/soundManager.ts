import { Howl } from 'howler';

// Sound manager to handle audio playback with graceful fallback
class SoundManager {
  private sounds: Map<string, Howl> = new Map();
  private enabled: boolean = true;
  private initialized: boolean = false;

  constructor() {
    // Check if audio is supported
    try {
      const audio = new Audio();
      this.enabled = audio !== null;
    } catch {
      this.enabled = false;
    }
  }

  // Initialize a sound
  private initSound(key: string, src: string, options: Record<string, unknown> = {}): Howl | null {
    if (!this.enabled) return null;

    try {
      const sound = new Howl({
        src: [src],
        ...options,
        onloaderror: () => {
          console.warn(`Failed to load sound: ${src}`);
        },
      });
      this.sounds.set(key, sound);
      return sound;
    } catch (error) {
      console.warn(`Error initializing sound: ${src}`, error);
      return null;
    }
  }

  // Play a sound by key
  play(key: string) {
    if (!this.enabled) return;
    
    const sound = this.sounds.get(key);
    if (sound) {
      try {
        sound.play();
      } catch (error) {
        console.warn(`Error playing sound: ${key}`, error);
      }
    }
  }

  // Stop a sound by key
  stop(key: string) {
    if (!this.enabled) return;
    
    const sound = this.sounds.get(key);
    if (sound) {
      sound.stop();
    }
  }

  // Initialize all sounds (called once)
  initializeSounds() {
    if (this.initialized) return;
    
    this.initSound('buttonClick', './sounds/click.mp3', {
      volume: 0.5,
    });

    this.initSound('ambient', './sounds/garage-ambient.mp3', {
      loop: true,
      volume: 0.3,
    });

    this.initSound('racetrackAmbient', './sounds/racetrack-ambient.mp3', {
      loop: true,
      volume: 0.3,
    });

    this.initialized = true;
  }

  // Play button click sound
  playButtonClick() {
    this.play('buttonClick');
  }

  // Toggle ambient sound
  toggleAmbient(play: boolean) {
    if (play) {
      this.play('ambient');
    } else {
      this.stop('ambient');
    }
  }

  // Toggle racetrack ambient sound
  toggleRacetrackAmbient(play: boolean) {
    if (play) {
      this.play('racetrackAmbient');
    } else {
      this.stop('racetrackAmbient');
    }
  }

  // Set volume for a sound
  setVolume(key: string, volume: number) {
    const sound = this.sounds.get(key);
    if (sound) {
      sound.volume(volume);
    }
  }

  // Cleanup method to unload all sounds
  cleanup() {
    this.sounds.forEach((sound) => {
      sound.unload();
    });
    this.sounds.clear();
    this.initialized = false;
  }
}

// Export singleton instance
export const soundManager = new SoundManager();
