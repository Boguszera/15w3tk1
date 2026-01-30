import { Howl } from 'howler';

// Sound manager to handle audio playback with graceful fallback
class SoundManager {
  private sounds: Map<string, Howl> = new Map();
  private enabled: boolean = true;

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
  private initSound(key: string, src: string, options: Record<string, unknown> = {}) {
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
      } catch (e) {
        console.warn(`Error playing sound: ${key}`, e);
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

  // Initialize button click sound
  initButtonClick() {
    return this.initSound('buttonClick', '/sounds/click.mp3', {
      volume: 0.5,
    });
  }

  // Initialize ambient garage sound
  initAmbient() {
    return this.initSound('ambient', '/sounds/garage-ambient.mp3', {
      autoplay: true,
      loop: true,
      volume: 0.3,
    });
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

  // Set volume for a sound
  setVolume(key: string, volume: number) {
    const sound = this.sounds.get(key);
    if (sound) {
      sound.volume(volume);
    }
  }
}

// Export singleton instance
export const soundManager = new SoundManager();
