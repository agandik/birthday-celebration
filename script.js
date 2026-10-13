/**
 * BIRTHDAY WEBSITE - "A PURR-FECT CELEBRATION"
 * Interactive Engine: Envelope Opening, Cake & Candle Blowing,
 * Web Audio BGM & SFX Synthesizer, Polaroid Lightbox, Cat Companion Easter Eggs.
 */

// 100% Enforce starting back at envelope on page refresh and top of Happy Birthday
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. WEB AUDIO SYNTHESIZER (MUSIC BOX / LOFI BGM & SFX)
  // Ensures audio plays 100% reliably offline or online without external files!
  // =========================================================================
  class AudioEngine {
    constructor() {
      this.ctx = null;
      this.isPlaying = false;
      this.timerId = null;
      this.tempo = 96; // bpm
      this.noteIndex = 0;
      this.notes = [
        // Happy Birthday Melody in C / G
        { note: 'G4', dur: 0.75 }, { note: 'G4', dur: 0.25 }, { note: 'A4', dur: 1.0 }, { note: 'G4', dur: 1.0 }, { note: 'C5', dur: 1.0 }, { note: 'B4', dur: 2.0 },
        { note: 'G4', dur: 0.75 }, { note: 'G4', dur: 0.25 }, { note: 'A4', dur: 1.0 }, { note: 'G4', dur: 1.0 }, { note: 'D5', dur: 1.0 }, { note: 'C5', dur: 2.0 },
        { note: 'G4', dur: 0.75 }, { note: 'G4', dur: 0.25 }, { note: 'G5', dur: 1.0 }, { note: 'E5', dur: 1.0 }, { note: 'C5', dur: 1.0 }, { note: 'B4', dur: 1.0 }, { note: 'A4', dur: 2.0 },
        { note: 'F5', dur: 0.75 }, { note: 'F5', dur: 0.25 }, { note: 'E5', dur: 1.0 }, { note: 'C5', dur: 1.0 }, { note: 'D5', dur: 1.0 }, { note: 'C5', dur: 2.5 },
      ];
      
      this.freqMap = {
        'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
        'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77
      };
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playTone(freq, duration, type = 'sine', gainVal = 0.15) {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    }

    // Sweet Music Box Note
    playMusicBoxNote(freq, durSeconds) {
      if (!this.ctx) return;
      // Fundamental
      this.playTone(freq, durSeconds * 1.5, 'triangle', 0.12);
      // Harmonic sparkle
      this.playTone(freq * 2, durSeconds * 0.8, 'sine', 0.05);
    }

    startBgm() {
      this.init();
      if (this.isPlaying) return;
      this.isPlaying = true;
      this.scheduleNextNote();
    }

    scheduleNextNote() {
      if (!this.isPlaying) return;
      const currentNote = this.notes[this.noteIndex];
      const freq = this.freqMap[currentNote.note] || 440;
      const secondsPerBeat = 60 / this.tempo;
      const noteDuration = currentNote.dur * secondsPerBeat;

      this.playMusicBoxNote(freq, noteDuration);

      this.noteIndex = (this.noteIndex + 1) % this.notes.length;
      this.timerId = setTimeout(() => {
        this.scheduleNextNote();
      }, noteDuration * 1000);
    }

    stopBgm() {
      this.isPlaying = false;
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
    }

    // Single Chirpy Kitten Meow
    playSingleKittenMeow(baseFreq = 850, duration = 0.32, spikeFreq = 1350) {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      // Pitch bend for a cute baby kitten chirp
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.linearRampToValueAtTime(spikeFreq, now + duration * 0.35);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + duration);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.16, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.05);
    }

    // Two curious baby mews before envelope opens
    playCuriousMew() {
      this.init();
      this.playSingleKittenMeow(920, 0.22, 1200);
      setTimeout(() => {
        this.playSingleKittenMeow(1100, 0.25, 1400);
      }, 140);
    }

    // Polyphonic Chorus of Multiple Excited Kittens!
    playKittenChorus() {
      this.init();
      const kittenPitches = [
        { base: 820, spike: 1300, delay: 0 },
        { base: 1050, spike: 1550, delay: 80 },
        { base: 720, spike: 1150, delay: 160 },
        { base: 950, spike: 1420, delay: 240 },
        { base: 1180, spike: 1680, delay: 320 },
        { base: 860, spike: 1280, delay: 420 },
        { base: 1020, spike: 1480, delay: 520 },
        { base: 780, spike: 1200, delay: 640 },
        { base: 920, spike: 1380, delay: 780 }
      ];

      kittenPitches.forEach(k => {
        setTimeout(() => {
          this.playSingleKittenMeow(k.base, 0.3, k.spike);
        }, k.delay);
      });
    }

    // =========================================================================
    // Playful Cat Meow SFX (Authentic Feline "Me-ooww~" with vocal formants)
    // =========================================================================
    playMeow() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const duration = 0.65;

      // Primary vocal cord oscillator (rich harmonic sawtooth)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sawtooth';

      // Secondary vocal cord oscillator (warm triangle, slight detune + vibrato)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.detune.setValueAtTime(8, now); // +8 cents for chorus warmth

      // Pitch contour: natural feline "M-e-o-w"
      // Starts around 430Hz (closed m), rises to 820Hz (open e/a), glides down to 460Hz (closing ow)
      osc1.frequency.setValueAtTime(430, now);
      osc1.frequency.exponentialRampToValueAtTime(820, now + 0.18);
      osc1.frequency.linearRampToValueAtTime(740, now + 0.35);
      osc1.frequency.exponentialRampToValueAtTime(460, now + duration);

      osc2.frequency.setValueAtTime(434, now);
      osc2.frequency.exponentialRampToValueAtTime(826, now + 0.18);
      osc2.frequency.linearRampToValueAtTime(744, now + 0.35);
      osc2.frequency.exponentialRampToValueAtTime(464, now + duration);

      // Subtle natural vibrato (5.5Hz) on the vowel
      const vibrato = this.ctx.createOscillator();
      const vibratoGain = this.ctx.createGain();
      vibrato.frequency.setValueAtTime(5.5, now);
      vibratoGain.gain.setValueAtTime(0, now);
      vibratoGain.gain.linearRampToValueAtTime(14, now + 0.2); // vibrato kicks in during the sustained vowel
      vibratoGain.gain.linearRampToValueAtTime(4, now + duration);
      vibrato.connect(osc1.frequency);
      vibrato.connect(osc2.frequency);

      // Vocal Formant Filter (mimics cat's mouth opening and closing)
      const formantFilter = this.ctx.createBiquadFilter();
      formantFilter.type = 'bandpass';
      formantFilter.Q.setValueAtTime(3.2, now);
      formantFilter.frequency.setValueAtTime(600, now); // "M" formant
      formantFilter.frequency.exponentialRampToValueAtTime(1450, now + 0.18); // "EE/AA" mouth wide open
      formantFilter.frequency.exponentialRampToValueAtTime(650, now + duration); // "OW" closing mouth

      // High-shelf smoothing to keep the sound sweet and silky (not harsh)
      const smoothFilter = this.ctx.createBiquadFilter();
      smoothFilter.type = 'lowpass';
      smoothFilter.frequency.setValueAtTime(2600, now);

      // Amplitude Envelope: gentle attack, expressive swell, soft feline release
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.08); // quick natural onset
      gain.gain.setValueAtTime(0.22, now + 0.28);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // Wiring
      osc1.connect(formantFilter);
      osc2.connect(formantFilter);
      formantFilter.connect(smoothFilter);
      smoothFilter.connect(gain);
      gain.connect(this.ctx.destination);

      vibrato.start(now);
      osc1.start(now);
      osc2.start(now);

      vibrato.stop(now + duration + 0.05);
      osc1.stop(now + duration + 0.05);
      osc2.stop(now + duration + 0.05);
    }

    // =========================================================================
    // Authentic Feline Purr SFX ("Purrrr~" - Sweet, higher-pitched, non-bassy)
    // =========================================================================
    playPurr() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const duration = 1.9; // Sweet soothing purr phrase

      // 1. LFO for the distinct ~26-28Hz laryngeal flutter (cat purr modulation)
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(26, now);
      lfo.frequency.linearRampToValueAtTime(28, now + 0.8);
      lfo.frequency.linearRampToValueAtTime(25, now + duration);
      lfoGain.gain.setValueAtTime(0.38, now); // modulation depth

      // 2. Carrier 1: Sweet midrange feline purr tone (~195Hz, crisp & not bassy)
      const oscMid = this.ctx.createOscillator();
      oscMid.type = 'triangle';
      oscMid.frequency.setValueAtTime(195, now);
      oscMid.frequency.linearRampToValueAtTime(225, now + 0.8); // gentle inhale rise
      oscMid.frequency.linearRampToValueAtTime(185, now + duration); // exhale settle

      // 3. Carrier 2: Soft harmonic overtone (~390Hz) for sweet throat color
      const oscHarm = this.ctx.createOscillator();
      oscHarm.type = 'sine';
      oscHarm.frequency.setValueAtTime(390, now);
      oscHarm.frequency.linearRampToValueAtTime(450, now + 0.8);
      oscHarm.frequency.linearRampToValueAtTime(370, now + duration);

      const harmGain = this.ctx.createGain();
      harmGain.gain.setValueAtTime(0.35, now);

      // 4. Soft breathy noise (gentle fuzzy kitten throat vibration)
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(520, now);
      noiseFilter.Q.setValueAtTime(2.2, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.28, now);

      // 5. Tremolo amplitude modulation node (base level 0.45 + LFO flutter)
      const tremoloNode = this.ctx.createGain();
      tremoloNode.gain.setValueAtTime(0.45, now);
      lfo.connect(lfoGain);
      lfoGain.connect(tremoloNode.gain);

      // Connect sources into tremolo flutter
      oscMid.connect(tremoloNode);
      oscHarm.connect(harmGain);
      harmGain.connect(tremoloNode);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(tremoloNode);

      // 6. High-pass filter to explicitly remove any muddy sub-bass rumble (<160Hz)
      const highPassFilter = this.ctx.createBiquadFilter();
      highPassFilter.type = 'highpass';
      highPassFilter.frequency.setValueAtTime(165, now);

      // 7. Warm acoustic smoothing filter
      const lowPassFilter = this.ctx.createBiquadFilter();
      lowPassFilter.type = 'lowpass';
      lowPassFilter.frequency.setValueAtTime(1400, now);

      // 8. Master envelope: gentle swell, dual-phase breathing purr, and peaceful fade
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(0.42, now + 0.35); // Inhale swell
      masterGain.gain.setValueAtTime(0.42, now + 0.85);
      masterGain.gain.linearRampToValueAtTime(0.36, now + 1.05); // subtle breath turnaround
      masterGain.gain.setValueAtTime(0.38, now + 1.5);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      tremoloNode.connect(highPassFilter);
      highPassFilter.connect(lowPassFilter);
      lowPassFilter.connect(masterGain);
      masterGain.connect(this.ctx.destination);

      lfo.start(now);
      oscMid.start(now);
      oscHarm.start(now);
      noise.start(now);

      lfo.stop(now + duration + 0.05);
      oscMid.stop(now + duration + 0.05);
      oscHarm.stop(now + duration + 0.05);
      noise.stop(now + duration + 0.05);
    }

    // Candle Blow Sound (Authentic Gentle Wind / Breath Puff)
    playCandleBlow() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const duration = 0.7;
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1; // White noise breath
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(780, now);
      filter.frequency.linearRampToValueAtTime(240, now + duration);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start(now);
    }

    // Balloon Pop Sound
    playBalloonPop() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    }

    // Wooden Stamp Thud
    playStampThud() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    }

    // Celebration Chime
    playChime() {
      this.init();
      const chimeFreqs = [523.25, 659.25, 783.99, 1046.50];
      chimeFreqs.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 1.2, 'sine', 0.1);
        }, idx * 120);
      });
    }
  }

  const audio = new AudioEngine();
  window.audio = audio;

  // =========================================================================
  // 2. CONFETTI BURST CONTROLLER
  // =========================================================================
  function launchFestiveConfetti(options = {}) {
    if (typeof confetti === 'function') {
      // Big Festive Multi-Color & Shapes
      confetti({
        particleCount: options.particleCount || 100,
        spread: options.spread || 80,
        origin: options.origin || { y: 0.6 },
        colors: options.colors || ['#FF8E72', '#E75A70', '#F3B042', '#C49BD4', '#FFF4E0', '#FFCAD1'],
        shapes: options.shapes || ['circle', 'square'],
        startVelocity: options.startVelocity !== undefined ? options.startVelocity : 45,
        gravity: options.gravity !== undefined ? options.gravity : 1,
        ticks: options.ticks !== undefined ? options.ticks : 200,
        scalar: options.scalar !== undefined ? options.scalar : 1,
        angle: options.angle !== undefined ? options.angle : 90,
        disableForReducedMotion: true
      });
    } else {
      // Inline DOM Confetti fallback
      createDomConfetti();
    }
  }

  function launchCakeConfetti() {
    launchFestiveConfetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.45 }
    });
  }

  function createDomConfetti() {
    const container = document.body;
    const colors = ['#FF8E72', '#E75A70', '#F3B042', '#C49BD4'];
    for (let i = 0; i < 40; i++) {
      const el = document.createElement('div');
      el.style.position = 'fixed';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.top = '-10px';
      el.style.width = '10px';
      el.style.height = '10px';
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      el.style.zIndex = '9999';
      el.style.pointerEvents = 'none';
      el.style.transition = 'transform 2.5s ease-out, opacity 2.5s ease-out';
      container.appendChild(el);

      requestAnimationFrame(() => {
        el.style.transform = `translate(${Math.random() * 80 - 40}px, ${window.innerHeight + 20}px) rotate(${Math.random() * 360}deg)`;
        el.style.opacity = '0';
      });

      setTimeout(() => el.remove(), 2600);
    }
  }



  // =========================================================================
  // 3. CINEMATIC KITTEN STAMPEDE & POP-UP CARD TRANSITION
  // =========================================================================
  const introOverlay = document.getElementById('introOverlay');
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const envelope = document.getElementById('envelope');
  const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
  const popupGreetingCard = document.getElementById('popupGreetingCard');
  const introInstruction = document.getElementById('introInstruction');
  const enterPartyBtn = document.getElementById('enterPartyBtn');
  const kittenStampedeContainer = document.getElementById('kittenStampedeContainer');

  let isOpening = false;
  let hasEntered = false;
  let autoEnterTimeout = null;

  // Generate cute colorful chibi SVG kittens
  function getKittenSvgHtml(styleIndex = 0) {
    const styles = [
      // 0: Orange Tabby
      { body: '#FFA07A', innerEar: '#FFC0CB', cheek: '#FF8A80', eye: '#3C2A21', hat: '#FF5E7E', pom: '#FFD700' },
      // 1: Fluffy White Kitten
      { body: '#FFFFFF', innerEar: '#FFCAD4', cheek: '#FFB3BA', eye: '#5DADE2', hat: '#A8E6CF', pom: '#FFD166' },
      // 2: Calico Cutie
      { body: '#FFE0B2', innerEar: '#FFCCBC', cheek: '#FF8A80', eye: '#4E342E', hat: '#FFD166', pom: '#E75A70' },
      // 3: Soft Silver Tabby
      { body: '#CFD8DC', innerEar: '#F8BBD0', cheek: '#FFAB91', eye: '#43A047', hat: '#CE93D8', pom: '#FFE082' }
    ];
    const s = styles[styleIndex % styles.length];

    return `
      <svg viewBox="0 0 100 100" class="kitten-svg" xmlns="http://www.w3.org/2000/svg">
        <!-- Ears -->
        <polygon points="26,38 15,12 40,24" fill="${s.body}" stroke="#B87869" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="24,34 18,18 35,26" fill="${s.innerEar}"/>
        <polygon points="74,38 85,12 60,24" fill="${s.body}" stroke="#B87869" stroke-width="1.5" stroke-linejoin="round"/>
        <polygon points="76,34 82,18 65,26" fill="${s.innerEar}"/>
        <!-- Head -->
        <ellipse cx="50" cy="52" rx="34" ry="28" fill="${s.body}" stroke="#B87869" stroke-width="1.5"/>
        <!-- Cheeks -->
        <circle cx="30" cy="58" r="6" fill="${s.cheek}" opacity="0.6"/>
        <circle cx="70" cy="58" r="6" fill="${s.cheek}" opacity="0.6"/>
        <!-- Eyes (Happy Sparkling Eyes) -->
        <ellipse cx="37" cy="48" rx="4.5" ry="5.5" fill="${s.eye}"/>
        <circle cx="39" cy="46" r="1.8" fill="#FFFFFF"/>
        <ellipse cx="63" cy="48" rx="4.5" ry="5.5" fill="${s.eye}"/>
        <circle cx="65" cy="46" r="1.8" fill="#FFFFFF"/>
        <!-- Cute Nose & Mouth -->
        <polygon points="48,55 52,55 50,57" fill="#E75A70"/>
        <path d="M45,58 Q50,62 55,58" fill="none" stroke="#3C2A21" stroke-width="1.8" stroke-linecap="round"/>
        <!-- Whiskers -->
        <line x1="20" y1="52" x2="10" y2="50" stroke="#795548" stroke-width="1.2" stroke-linecap="round"/>
        <line x1="20" y1="56" x2="10" y2="58" stroke="#795548" stroke-width="1.2" stroke-linecap="round"/>
        <line x1="80" y1="52" x2="90" y2="50" stroke="#795548" stroke-width="1.2" stroke-linecap="round"/>
        <line x1="80" y1="56" x2="90" y2="58" stroke="#795548" stroke-width="1.2" stroke-linecap="round"/>
        <!-- Festive Party Hat -->
        <polygon points="50,4 38,24 62,24" fill="${s.hat}" stroke="#B87869" stroke-width="1.2"/>
        <circle cx="50" cy="4" r="3.5" fill="${s.pom}"/>
      </svg>
    `;
  }

  // Spawn the surprise kitten explosion
  function spawnKittenStampede() {
    if (!kittenStampedeContainer || !envelope) return;

    kittenStampedeContainer.innerHTML = '';
    const rect = envelope.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    const winW = window.innerWidth;
    const winH = window.innerHeight;

    // 9 distinct positions scattered gracefully around the entire viewport
    const destinations = [
      { x: winW * 0.16, y: winH * 0.12, text: 'Meowww!', rot: -14 },
      { x: winW * 0.50, y: winH * 0.08, text: 'Happy Birthday!', rot: 0 },
      { x: winW * 0.84, y: winH * 0.12, text: 'Purrrrr~', rot: 14 },
      { x: winW * 0.10, y: winH * 0.40, text: 'Party Cat!', rot: -10 },
      { x: winW * 0.90, y: winH * 0.40, text: 'Mew mew!', rot: 10 },
      { x: winW * 0.14, y: winH * 0.68, text: 'Gemeccc!', rot: -8 },
      { x: winW * 0.86, y: winH * 0.68, text: 'I Love You!', rot: 8 },
      { x: winW * 0.30, y: winH * 0.86, text: 'Cium Dulu!', rot: -6 },
      { x: winW * 0.70, y: winH * 0.86, text: 'Bidadariku!', rot: 6 }
    ];

    destinations.forEach((dest, i) => {
      const kitten = document.createElement('div');
      kitten.className = 'kitten-entity';

      const jumpPeak = 120 + Math.random() * 80;
      const dur = (1.2 + (i % 4) * 0.12).toFixed(2);
      const bubbleDelay = (0.45 + (i * 0.05)).toFixed(2);

      kitten.style.setProperty('--start-x', `${startX}px`);
      kitten.style.setProperty('--start-y', `${startY}px`);
      kitten.style.setProperty('--end-x', `${dest.x}px`);
      kitten.style.setProperty('--end-y', `${dest.y}px`);
      kitten.style.setProperty('--jump-peak', `${jumpPeak}px`);
      kitten.style.setProperty('--rot-mid', `${(dest.rot * 1.4).toFixed(0)}deg`);
      kitten.style.setProperty('--rot-end', `${dest.rot}deg`);
      kitten.style.setProperty('--dur', `${dur}s`);
      kitten.style.setProperty('--bubble-delay', `${bubbleDelay}s`);

      kitten.innerHTML = `
        <div class="kitten-speech-bubble">${dest.text}</div>
        <div class="kitten-sprite-wrap">
          ${getKittenSvgHtml(i)}
        </div>
      `;

      kittenStampedeContainer.appendChild(kitten);
    });
  }

  function launchDualCannons() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 65,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#FF8E72', '#E75A70', '#F3B042', '#FFF4E0', '#FFCAD1']
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 65,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#FF8E72', '#E75A70', '#C49BD4', '#FFF4E0', '#FFCAD1']
      });
    } else {
      createDomConfetti();
    }
  }

  function transitionToMainStage() {
    if (hasEntered) return;
    hasEntered = true;

    // Guaranteed top scroll position so Happy Birthday is always the starting view
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.classList.remove('intro-active');

    audio.playChime();

    // 1. Overlay dissolves into celebration portal
    if (introOverlay) {
      introOverlay.classList.add('reveal-portal');
    }

    // 2. Second burst of confetti rain over main page
    setTimeout(() => {
      launchFestiveConfetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.4 }
      });
    }, 200);

    // 3. Kittens scamper away playfully
    setTimeout(() => {
      if (kittenStampedeContainer) {
        kittenStampedeContainer.classList.add('scamper-away');
      }
    }, 600);

    // 4. Hide overlay completely
    setTimeout(() => {
      if (introOverlay) {
        introOverlay.style.display = 'none';
      }
      if (kittenStampedeContainer) {
        kittenStampedeContainer.remove();
      }
    }, 1200);
  }

  function openCelebrationEnvelope() {
    if (isOpening) return;
    isOpening = true;

    audio.init();

    // Step 0: Envelope wiggles with cute curious baby meow chirps!
    if (envelope) envelope.classList.add('wiggle');
    audio.playCuriousMew();

    // Step 1: Burst Wax Seal, Flap Opens, and KITTEN STAMPEDE EXPLODES!
    setTimeout(() => {
      if (openEnvelopeBtn) openEnvelopeBtn.classList.add('burst');
      const sealTapCue = document.getElementById('sealTapCue');
      if (sealTapCue) sealTapCue.classList.add('fade-out');
      if (introInstruction) introInstruction.classList.add('fade-out');
      if (envelope) envelope.classList.add('open');

      // KITTEN STAMPEDE!
      spawnKittenStampede();

      // CHORUS OF HAPPY KITTENS MEOWING!
      audio.playKittenChorus();

      // Dual Confetti Cannons
      launchDualCannons();

      // Start sweet background serenade
      audio.startBgm();
      updateMusicUI(true);

      // Step 2: Smoothly transition directly into the main celebration stage!
      setTimeout(() => {
        transitionToMainStage();
      }, 1600);

    }, 320);
  }

  // Only the cat paw wax seal can open the celebration envelope
  if (openEnvelopeBtn) openEnvelopeBtn.addEventListener('click', openCelebrationEnvelope);

  // If clicking anywhere else on the envelope before opening, guide attention to the cat paw seal!
  if (envelope) {
    envelope.addEventListener('click', (e) => {
      if (!e.target.closest('#openEnvelopeBtn') && !isOpening) {
        audio.playCuriousMew();
        if (openEnvelopeBtn) {
          openEnvelopeBtn.classList.remove('cue-wobble');
          void openEnvelopeBtn.offsetWidth;
          openEnvelopeBtn.classList.add('cue-wobble');
        }
        const cue = document.getElementById('sealTapCue');
        if (cue) {
          cue.classList.remove('cue-highlight');
          void cue.offsetWidth;
          cue.classList.add('cue-highlight');
        }
      }
    });
  }

  // =========================================================================
  // 4. FLOATING MUSIC PLAYER CONTROLLER
  // =========================================================================
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicIcon = document.getElementById('musicIcon');
  const vinylDisc = document.getElementById('vinylDisc');

  function updateMusicUI(playing) {
    if (playing) {
      musicIcon.textContent = '❚❚';
      vinylDisc.classList.add('spinning');
    } else {
      musicIcon.textContent = '▶';
      vinylDisc.classList.remove('spinning');
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      if (audio.isPlaying) {
        audio.stopBgm();
        updateMusicUI(false);
      } else {
        audio.startBgm();
        updateMusicUI(true);
      }
    });
  }

  // =========================================================================
  // 5. INTERACTIVE BIRTHDAY CAKE & REALISTIC CANDLE BLOWING
  // =========================================================================
  const candleWrapper = document.getElementById('candleWrapper');
  const flame = document.getElementById('flame');
  const flameHitArea = document.getElementById('flameHitArea');
  const flameInstructionTag = document.getElementById('flameInstructionTag');
  const smoke = document.getElementById('smoke');
  const blowCandleBtn = document.getElementById('blowCandleBtn');
  const blowBtnText = document.getElementById('blowBtnText');
  const relightCandleBtn = document.getElementById('relightCandleBtn');
  const wishRevealBox = document.getElementById('wishRevealBox');
  const sparklerLeft = document.getElementById('sparklerLeft');
  const sparklerRight = document.getElementById('sparklerRight');
  const cakeCheerLeft = document.getElementById('cakeCheerLeft');
  const cakeCheerRight = document.getElementById('cakeCheerRight');
  const catFlamePointer = document.getElementById('catFlamePointer');
  const catSpeechBubble = document.getElementById('catSpeechBubble');

  let isCandleLit = true;
  let isBlowing = false;
  let isJourneyUnlocked = false;
  let isCatRevealed = false;

  // Floating Toast Notification Helper
  function showBirthdayToast(msg) {
    const toast = document.getElementById('birthdayToast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;
    toastMsg.textContent = msg;
    toast.classList.remove('hidden');
    void toast.offsetWidth;
    toast.classList.add('show');

    if (window._toastTimer) clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.classList.add('hidden'), 350);
    }, 3200);
  }

  // Intercept locked navigation links in hero
  const lockedNavLinks = document.querySelectorAll('.locked-nav-link');
  lockedNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (!isJourneyUnlocked) {
        e.preventDefault();
        const targetName = link.dataset.lockedTarget || 'halaman ini';
        showBirthdayToast(`Tiup lilin kuemu terlebih dahulu ya sayang untuk membuka ${targetName}!`);
        const cakeEl = document.getElementById('cakeSection');
        if (cakeEl) {
          cakeEl.scrollIntoView({ behavior: 'smooth' });
        }
        if (candleWrapper) {
          candleWrapper.classList.add('pulse-btn');
          setTimeout(() => candleWrapper.classList.remove('pulse-btn'), 1800);
        }
      }
    });
  });

  // Blow out candle with natural flame lean, gentle extinguish, smoke pause, prayer reveal & smooth auto-scroll
  function blowOutCandle() {
    if (!isCandleLit || isBlowing) return;
    isBlowing = true;

    // 1. Play soft breath sound & begin subtle flame leaning flutter
    audio.playCandleBlow();

    if (flameInstructionTag) flameInstructionTag.classList.add('fade-out');

    if (candleWrapper) candleWrapper.classList.add('is-blowing');
    if (flame) flame.classList.add('is-blowing');

    if (blowCandleBtn) {
      blowCandleBtn.disabled = true;
      blowBtnText.textContent = 'Meniup lilin...';
    }

    // 2. Extinguish flame after breath duration (650ms)
    setTimeout(() => {
      isCandleLit = false;

      // Flame extinguished & soft wispy smoke curling up
      if (flame) {
        flame.classList.remove('is-blowing');
        flame.classList.add('out');
      }
      if (candleWrapper) candleWrapper.classList.remove('is-blowing');
      if (smoke) {
        smoke.classList.remove('puff');
        void smoke.offsetWidth;
        smoke.classList.add('puff');
      }

      // Sparklers & cheering kittens pop out behind cake
      if (sparklerLeft) sparklerLeft.classList.add('active');
      if (sparklerRight) sparklerRight.classList.add('active');
      if (cakeCheerLeft) cakeCheerLeft.classList.add('cheer');
      if (cakeCheerRight) cakeCheerRight.classList.add('cheer');

      // Cheerful reaction from pointing cat if it was revealed
      if (isCatRevealed && catFlamePointer) {
        if (catSpeechBubble) {
          catSpeechBubble.innerHTML = '<span>Horeee! Lilinnya ditiup! 🎉🐾</span>';
        }
        setTimeout(() => {
          if (catFlamePointer) {
            catFlamePointer.classList.add('hidden');
          }
        }, 2200);
      } else if (catFlamePointer) {
        catFlamePointer.classList.add('hidden');
      }

      if (blowCandleBtn) {
        blowCandleBtn.classList.add('blown');
        if (blowBtnText) blowBtnText.textContent = 'Lilin Berhasil Ditiup';
      }
      if (relightCandleBtn) relightCandleBtn.classList.remove('hidden');

      // 3. WAIT FOR THE EXTINGUISHING & SMOKE ANIMATION TO FINISH ("tunggu sebentar animasi ditiupnya selesai")
      setTimeout(() => {
        isBlowing = false;
        if (blowCandleBtn) blowCandleBtn.disabled = false;

        // Reveal the heartfelt prayer blessing card
        if (wishRevealBox) {
          wishRevealBox.classList.remove('hidden');
        }

        // Unlock all subsequent sections below
        unlockJourney();

        // Celebration audio & confetti
        audio.playChime();
        launchCakeConfetti();

        // 4. AUTO-SCROLL SMOOTHLY DOWN TO THE PRAYER BLESSING CARD
        setTimeout(() => {
          if (wishRevealBox) {
            wishRevealBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);

      }, 1200);

    }, 650);
  }

  // Smoothly unlock and reveal all sessions below
  function unlockJourney() {
    if (isJourneyUnlocked) return;
    isJourneyUnlocked = true;

    const lockedWrapper = document.getElementById('lockedJourneyWrapper');
    const dancingCatsBar = document.getElementById('dancingCatsBar');
    const navLockBadges = document.querySelectorAll('.nav-lock-badge');

    // 1. Smoothly reveal the locked journey wrapper
    if (lockedWrapper) {
      lockedWrapper.classList.remove('is-locked');
      lockedWrapper.classList.add('is-unlocked');
      lockedWrapper.removeAttribute('aria-hidden');
    }

    // 2. Smoothly reveal dancing cats bar at bottom
    if (dancingCatsBar) {
      dancingCatsBar.classList.remove('is-locked');
      dancingCatsBar.classList.add('is-unlocked');
    }

    // 3. Update nav lock badges in hero
    navLockBadges.forEach(badge => {
      badge.innerHTML = '<svg class="svg-lock-micro"><use href="#icon-sparkle"></use></svg>';
      badge.classList.add('unlocked');
    });

    // 4. Celebration fanfare after 400ms
    setTimeout(() => {
      launchFestiveConfetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.55 }
      });
    }, 450);

    // 5. First bottom cat throws confetti as bar slides in
    setTimeout(() => {
      if (typeof triggerRandomCatConfetti === 'function') {
        triggerRandomCatConfetti();
      }
    }, 1100);
  }

  function relightCandle() {
    if (isBlowing) return;
    isCandleLit = true;
    if (flame) flame.classList.remove('out', 'is-blowing');
    if (flameInstructionTag) flameInstructionTag.classList.remove('fade-out');
    if (smoke) smoke.classList.remove('puff');
    if (sparklerLeft) sparklerLeft.classList.remove('active');
    if (sparklerRight) sparklerRight.classList.remove('active');
    if (cakeCheerLeft) cakeCheerLeft.classList.remove('cheer');
    if (cakeCheerRight) cakeCheerRight.classList.remove('cheer');
    if (relightCandleBtn) relightCandleBtn.classList.add('hidden');

    isCatRevealed = false;
    if (catFlamePointer) {
      catFlamePointer.classList.add('hidden');
      catFlamePointer.classList.remove('pop-active');
      catFlamePointer.setAttribute('aria-hidden', 'true');
      if (catSpeechBubble) {
        catSpeechBubble.innerHTML = '<span>Tuh apinya di sini! Tiup dulu sayang 🐾🔥</span>';
      }
    }
    setTimeout(checkCakeScrollPosition, 250);
  }

  // Only the flame itself (or generous touch area) blows out the candle!
  if (flameHitArea) {
    flameHitArea.addEventListener('click', blowOutCandle);
  } else if (flame) {
    flame.addEventListener('click', blowOutCandle);
  }

  // If clicking candle wrapper outside flame while lit, guide attention directly to flame!
  if (candleWrapper) {
    candleWrapper.addEventListener('click', (e) => {
      if (!e.target.closest('#flameHitArea') && !e.target.closest('#flame') && isCandleLit && !isBlowing) {
        showBirthdayToast('Sentuh api lilinnya langsung untuk meniup ya sayang! 🕯️✨');
        if (flame) {
          flame.classList.remove('cue-flicker');
          void flame.offsetWidth;
          flame.classList.add('cue-flicker');
        }
      }
    });
  }

  if (relightCandleBtn) relightCandleBtn.addEventListener('click', relightCandle);

  // =========================================================================
  // 5. CAKE GUIDANCE & CAT FLAME POINTER (MUNCUL OTOMATIS SAAT SUDAH TERSCROLL KE BAWAH)
  // =========================================================================
  const cakeSectionEl = document.getElementById('cakeSection');

  function isCakeInActiveView() {
    if (!cakeSectionEl) return false;
    const rect = cakeSectionEl.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const isAtBottom = (windowHeight + scrollY) >= (document.documentElement.scrollHeight - 100);
    const isCakeVisible = rect.top < windowHeight * 0.75 && rect.bottom > 80;
    return isCakeVisible || isAtBottom;
  }

  function revealCatFlamePointer() {
    if (isCatRevealed || !isCandleLit || isJourneyUnlocked || isBlowing) return;
    isCatRevealed = true;

    if (catFlamePointer) {
      catFlamePointer.classList.remove('hidden');
      catFlamePointer.classList.remove('pop-active');
      void catFlamePointer.offsetWidth;
      catFlamePointer.classList.add('pop-active');
      catFlamePointer.setAttribute('aria-hidden', 'false');

      if (catSpeechBubble) {
        catSpeechBubble.innerHTML = '<span>Tuh apinya di sini! Tiup dulu sayang 🐾🔥</span>';
      }
      audio.playCuriousMew();
    }
  }

  // 1. IntersectionObserver: Otomatis memunculkan kucing begitu area kue terlihat saat discroll ke bawah
  if (cakeSectionEl && 'IntersectionObserver' in window) {
    const cakeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isCatRevealed && isCandleLit && !isJourneyUnlocked && !isBlowing) {
          revealCatFlamePointer();
        }
      });
    }, {
      threshold: 0.15
    });
    cakeObserver.observe(cakeSectionEl);
  }

  // 2. Scroll listener fallback untuk deteksi posisi bawah seketika
  function checkCakeScrollPosition() {
    if (isCatRevealed || !isCandleLit || isJourneyUnlocked || isBlowing) return;
    if (isCakeInActiveView()) {
      revealCatFlamePointer();
    }
  }

  window.addEventListener('scroll', checkCakeScrollPosition, { passive: true });
  setTimeout(checkCakeScrollPosition, 400);

  // Interactive tap on the cat figure beside the candle
  if (catFlamePointer) {
    catFlamePointer.addEventListener('click', (e) => {
      e.stopPropagation();
      audio.playCuriousMew();
      catFlamePointer.classList.remove('pop-active');
      void catFlamePointer.offsetWidth;
      catFlamePointer.classList.add('pop-active');

      if (flame) {
        flame.classList.remove('cue-flicker');
        void flame.offsetWidth;
        flame.classList.add('cue-flicker');
      }
      if (flameInstructionTag) {
        flameInstructionTag.classList.remove('pulse-attention');
        void flameInstructionTag.offsetWidth;
        flameInstructionTag.classList.add('pulse-attention');
      }
      showBirthdayToast('🐾 Meoow! Tiup api lilinnya di sini ya sayang~ 🕯️✨');
    });
  }

  // Smooth scroll for explore journey button in wish reveal box
  const exploreJourneyBtn = document.getElementById('exploreJourneyBtn');
  if (exploreJourneyBtn) {
    exploreJourneyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSec = document.getElementById('quirksSection') || document.querySelector('.locked-journey-wrapper');
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Love Whisper Dedication Handler in Hero
  const loveWhisperBtn = document.getElementById('loveWhisperBtn');
  const whisperResponse = document.getElementById('whisperResponse');
  const whisperText = document.getElementById('whisperText');

  if (loveWhisperBtn) {
    loveWhisperBtn.addEventListener('click', () => {
      audio.playPurr();
      audio.playChime();
      launchFestiveConfetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.35 },
        colors: ['#FF6B8B', '#FF8E72', '#FFCAD1', '#FFF4E0']
      });

      if (whisperText) whisperText.textContent = 'Pelukan Terhangat Terkirim!';
      if (whisperResponse) whisperResponse.classList.remove('hidden');

      setTimeout(() => {
        if (whisperText) whisperText.textContent = 'Kirim Pelukan Lagi';
      }, 3500);
    });
  }


  // =========================================================================
  // 6. POLAROID SCRAPBOOK LIGHTBOX MODAL (WITH LIVE VIDEO SUPPORT)
  // =========================================================================
  const polaroidCards = document.querySelectorAll('.polaroid-card');
  const polaroidModal = document.getElementById('polaroidModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImage = document.getElementById('modalImage');
  const modalVideo = document.getElementById('modalVideo');

  function openPolaroidModal({ imgSrc, videoSrc }) {
    if (!polaroidModal) return;

    if (videoSrc && modalVideo) {
      if (modalImage) modalImage.style.display = 'none';
      modalVideo.style.display = 'block';
      modalVideo.src = videoSrc;
      modalVideo.play().catch(() => {});
    } else {
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.src = '';
        modalVideo.style.display = 'none';
      }
      if (modalImage && imgSrc) {
        modalImage.style.display = 'block';
        modalImage.src = imgSrc;
      }
    }

    if (typeof polaroidModal.showModal === 'function') {
      polaroidModal.showModal();
      audio.playTone(700, 0.2, 'sine', 0.05);
    }
  }

  function closePolaroidModal() {
    if (!polaroidModal) return;
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.src = '';
      modalVideo.style.display = 'none';
    }
    if (modalImage) {
      modalImage.style.display = 'block';
    }
    polaroidModal.close();
  }

  polaroidCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.getAttribute('data-title') || 'Kenangan Indah';
      const caption = card.getAttribute('data-caption') || '';
      const videoSrc = card.getAttribute('data-video');

      openPolaroidModal({
        title,
        caption,
        imgSrc: img ? img.src : '',
        videoSrc
      });
    });
  });

  if (modalCloseBtn && polaroidModal) {
    modalCloseBtn.addEventListener('click', closePolaroidModal);
  }

  // Light dismiss on backdrop click
  if (polaroidModal) {
    polaroidModal.addEventListener('click', (e) => {
      const rect = polaroidModal.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        closePolaroidModal();
      }
    });
  }




  // =========================================================================
  // 6B. THE BIRTHDAY QUEEN AVATAR & QUIRKS SHOWCASE
  // =========================================================================
  const heroQueenAvatarContainer = document.getElementById('heroQueenAvatarContainer');
  if (heroQueenAvatarContainer) {
    heroQueenAvatarContainer.addEventListener('click', () => {
      heroQueenAvatarContainer.classList.remove('hat-wobble');
      void heroQueenAvatarContainer.offsetWidth;
      heroQueenAvatarContainer.classList.add('hat-wobble');

      audio.playChime();
      showBirthdayToast('Selamat Ulang Tahun, Tuan Putri Kesayanganku! Cantik banget hari ini 👑💖');

      launchFestiveConfetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.28 }
      });
    });
  }

  // Quirk Image Toggles
  const toggleFoodImgBtn = document.getElementById('toggleFoodImgBtn');
  const foodQuirkImg = document.getElementById('foodQuirkImg');
  let foodImgToggleState = 0;
  if (toggleFoodImgBtn && foodQuirkImg) {
    toggleFoodImgBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      foodImgToggleState = 1 - foodImgToggleState;
      foodQuirkImg.style.opacity = '0';
      setTimeout(() => {
        foodQuirkImg.src = foodImgToggleState === 1 
          ? 'assets/images/quirk_makan_senyum_2.jpg' 
          : 'assets/images/quirk_makan_senyum.jpg';
        foodQuirkImg.style.opacity = '1';
      }, 180);
      audio.playTone(650, 0.15, 'sine', 0.05);
    });
  }

  const toggleCatImgBtn = document.getElementById('toggleCatImgBtn');
  const catQuirkImg = document.getElementById('catQuirkImg');
  let catImgToggleState = 0;
  if (toggleCatImgBtn && catQuirkImg) {
    toggleCatImgBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      catImgToggleState = 1 - catImgToggleState;
      catQuirkImg.style.opacity = '0';
      setTimeout(() => {
        catQuirkImg.src = catImgToggleState === 1 
          ? 'assets/images/quirk_kucing_taman.jpg' 
          : 'assets/images/quirk_ngelus_kucing.webp';
        catQuirkImg.style.opacity = '1';
      }, 180);
      audio.playCuriousMew();
    });
  }

  // Quirk 3: Video Controls (Play/Pause Toggle & Expand Full Modal)
  const activeVideoPlayer = document.getElementById('activeVideoPlayer');
  const toggleVideoPlayBtn = document.getElementById('toggleVideoPlayBtn');
  const expandVideoBtn = document.getElementById('expandVideoBtn');

  if (activeVideoPlayer) {
    const toggleVideoPlayback = (e) => {
      if (e) e.stopPropagation();
      if (activeVideoPlayer.paused) {
        activeVideoPlayer.play().catch(() => {});
        if (toggleVideoPlayBtn) {
          const pauseIcon = toggleVideoPlayBtn.querySelector('.icon-pause');
          const playIcon = toggleVideoPlayBtn.querySelector('.icon-play');
          if (pauseIcon) pauseIcon.style.display = 'block';
          if (playIcon) playIcon.style.display = 'none';
        }
      } else {
        activeVideoPlayer.pause();
        if (toggleVideoPlayBtn) {
          const pauseIcon = toggleVideoPlayBtn.querySelector('.icon-pause');
          const playIcon = toggleVideoPlayBtn.querySelector('.icon-play');
          if (pauseIcon) pauseIcon.style.display = 'none';
          if (playIcon) playIcon.style.display = 'block';
        }
      }
    };

    if (toggleVideoPlayBtn) {
      toggleVideoPlayBtn.addEventListener('click', toggleVideoPlayback);
    }
    activeVideoPlayer.addEventListener('click', toggleVideoPlayback);
  }

  if (expandVideoBtn) {
    expandVideoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openPolaroidModal({
        title: 'Tingkah Lincah Sayang',
        caption: 'Momen pas sayang lagi banyak energi dan ketawa lepas. Tingkahnya selalu bikin suasana jadi seru dan menyenangkan.',
        videoSrc: 'assets/videos/quirk_aktif_gemec.mp4'
      });
    });
  }

  // Quirk Heart Reactions
  const quirkReactBtns = document.querySelectorAll('.btn-quirk-react');
  quirkReactBtns.forEach(btn => {
    let count = 999;
    btn.addEventListener('click', () => {
      count++;
      const countEl = btn.querySelector('.react-count');
      if (countEl) countEl.textContent = `${count}+`;

      const quirkType = btn.dataset.quirk;
      let symbol = '💖';
      let soundFn = () => audio.playTone(800, 0.12, 'sine', 0.06);

      if (quirkType === 'cat') {
        symbol = '🐾';
        soundFn = () => audio.playCuriousMew();
      } else if (quirkType === 'sleep') {
        symbol = '💤';
        soundFn = () => audio.playTone(550, 0.2, 'sine', 0.04);
      } else if (quirkType === 'active') {
        symbol = '⚡';
        soundFn = () => audio.playTone(880, 0.16, 'triangle', 0.08);
      }

      soundFn();

      // Floating Particle
      const rect = btn.getBoundingClientRect();
      const p = document.createElement('div');
      p.className = 'floating-react-particle';
      p.textContent = symbol;
      p.style.position = 'fixed';
      p.style.left = `${rect.left + rect.width / 2 + (Math.random() * 30 - 15)}px`;
      p.style.top = `${rect.top}px`;
      p.style.setProperty('--rx', `${(Math.random() * 40 - 20).toFixed(0)}px`);
      p.style.setProperty('--rot', `${(Math.random() * 30 - 15).toFixed(0)}deg`);
      document.body.appendChild(p);

      setTimeout(() => p.remove(), 1100);
    });
  });

  // =========================================================================
  // 9. PAW PRINT CURSOR TRAIL (PERFORMANCE OPTIMIZED)
  // =========================================================================
  const pawContainer = document.getElementById('pawTrailContainer');
  let lastPawTime = 0;
  let mouseRafPending = false;

  function createPawParticle(x, y) {
    if (!pawContainer) return;
    const now = Date.now();
    if (now - lastPawTime < 160) return; // Smoothly throttle to ~6 particles/sec
    lastPawTime = now;

    // Cap maximum particles in DOM to 5 to prevent memory/paint overhead
    if (pawContainer.children.length >= 5) {
      pawContainer.firstElementChild.remove();
    }

    const paw = document.createElement('div');
    paw.className = 'paw-particle';
    const iconId = Math.random() > 0.35 ? 'icon-paw' : 'icon-sparkle';
    paw.innerHTML = `<svg class="svg-trail-icon"><use href="#${iconId}"></use></svg>`;
    paw.style.left = `${x}px`;
    paw.style.top = `${y}px`;
    paw.style.color = ['#FF8E72', '#E75A70', '#F3B042', '#C49BD4'][Math.floor(Math.random() * 4)];
    pawContainer.appendChild(paw);

    setTimeout(() => {
      if (paw.parentNode) paw.remove();
    }, 850);
  }

  // Only bind on desktop mouse (fine pointer). Touch screens should NOT trigger DOM churn on scroll!
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      if (!mouseRafPending) {
        mouseRafPending = true;
        requestAnimationFrame(() => {
          createPawParticle(e.clientX, e.clientY);
          mouseRafPending = false;
        });
      }
    }, { passive: true });
  }

  // =========================================================================
  // 10. INTERACTIVE POPPABLE BALLOONS LAYER (THROTTLED)
  // =========================================================================
  const balloonSpawner = document.getElementById('balloonSpawner');
  const balloonIconIds = ['icon-balloon', 'icon-cat-head', 'icon-heart', 'icon-cake', 'icon-sparkle', 'icon-paw'];
  const popLoveWords = ['Happy Birthday!', 'Horeee! 🎉', 'Purrrrr~', 'Cantik Banget!', 'Muach!', 'Love You!'];

  function spawnPoppableBalloon() {
    if (!balloonSpawner) return;
    if (balloonSpawner.children.length >= 4) return; // Keep lightweight (max 4 on screen)

    const balloon = document.createElement('div');
    balloon.className = 'poppable-balloon';
    const iconId = balloonIconIds[Math.floor(Math.random() * balloonIconIds.length)];
    balloon.innerHTML = `<svg class="svg-pop-balloon"><use href="#${iconId}"></use></svg>`;
    balloon.style.left = `${12 + Math.random() * 76}%`;
    balloon.style.color = ['#FF6B8B', '#FF8E72', '#F3B042', '#C49BD4', '#4DABF7'][Math.floor(Math.random() * 5)];
    balloon.style.animationDuration = `${11 + Math.random() * 4}s`;

    // Click to POP!
    balloon.addEventListener('click', (e) => {
      audio.playBalloonPop();

      // Show floating pop word
      const popText = document.createElement('div');
      popText.className = 'balloon-pop-text';
      popText.textContent = popLoveWords[Math.floor(Math.random() * popLoveWords.length)];
      popText.style.left = `${e.clientX}px`;
      popText.style.top = `${e.clientY}px`;
      document.body.appendChild(popText);

      // Mini sparkle burst
      launchFestiveConfetti({
        particleCount: 16,
        spread: 35,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
      });

      balloon.remove();
      setTimeout(() => popText.remove(), 900);
    });

    balloonSpawner.appendChild(balloon);

    // Remove when float finishes
    setTimeout(() => {
      if (balloon.parentNode) balloon.remove();
    }, 15000);
  }

  setInterval(spawnPoppableBalloon, 4800);

  // =========================================================================
  // 11. INTERACTIVE SCREEN-EDGE PEEKING CATS
  // =========================================================================
  const peekingCatLeft = document.getElementById('peekingCatLeft');
  const peekingCatRight = document.getElementById('peekingCatRight');

  function bindPeekingCat(catEl, soundType) {
    if (!catEl) return;
    catEl.addEventListener('click', () => {
      if (soundType === 'purr') {
        audio.playPurr();
      } else {
        audio.playMeow();
      }
      catEl.classList.add('active');

      const rect = catEl.getBoundingClientRect();
      const originX = Math.max(0.05, Math.min(0.95, (rect.left + rect.width / 2) / window.innerWidth));
      const originY = Math.max(0.05, Math.min(0.95, (rect.top + rect.height / 2) / window.innerHeight));

      launchFestiveConfetti({
        particleCount: 16,
        spread: 45,
        origin: { x: originX, y: originY }
      });

      setTimeout(() => {
        catEl.classList.remove('active');
      }, 2000);
    });
  }

  bindPeekingCat(peekingCatLeft, 'meow');
  bindPeekingCat(peekingCatRight, 'purr');

  // =========================================================================
  // 12. INTERACTIVE YARN BALL TOY MINI-GAME
  // =========================================================================
  const yarnBallBtn = document.getElementById('yarnBallBtn');
  const yarnTrack = document.getElementById('yarnTrack');
  const yarnString = document.getElementById('yarnString');
  const yarnKitten = document.getElementById('yarnKitten');
  const chaserShout = document.getElementById('chaserShout');
  let isYarnRolling = false;

  if (yarnBallBtn && yarnTrack && yarnKitten) {
    yarnBallBtn.addEventListener('click', () => {
      if (isYarnRolling) return;
      isYarnRolling = true;

      // Available track width for roll
      const trackWidth = Math.max(yarnTrack.clientWidth - 110, 180);

      // 1. Roll ball across the track
      audio.playSingleKittenMeow(900, 0.22, 1300);
      yarnBallBtn.classList.add('rolling');
      yarnBallBtn.classList.remove('caught');
      yarnBallBtn.style.left = `${trackWidth}px`;
      if (yarnString) yarnString.style.width = `${trackWidth - 105}px`;

      // 2. Kitten prepares & sprints after ball!
      if (chaserShout) chaserShout.textContent = 'Ngejarr!';

      setTimeout(() => {
        yarnKitten.classList.remove('is-idle');
        yarnKitten.classList.add('is-running');
        yarnKitten.style.left = `${trackWidth - 80}px`;
        audio.playSingleKittenMeow(1050, 0.25, 1450);
      }, 100);

      // 3. Kitten reaches ball & pounces!
      setTimeout(() => {
        yarnKitten.classList.remove('is-running');
        yarnKitten.classList.add('is-pouncing');
        yarnBallBtn.classList.add('caught');
        if (chaserShout) chaserShout.textContent = 'DAPET! Nyaa~';

        audio.playSingleKittenMeow(1250, 0.35, 1650);

        // Confetti puff upon catch!
        const rect = yarnBallBtn.getBoundingClientRect();
        const normX = (rect.left + rect.width / 2) / window.innerWidth;
        const normY = (rect.top + rect.height / 2) / window.innerHeight;
        launchFestiveConfetti({
          particleCount: 25,
          spread: 50,
          origin: { x: normX, y: Math.max(0.2, Math.min(0.9, normY)) }
        });
      }, 1100);

      // 4. Return ball & kitten after play
      setTimeout(() => {
        yarnBallBtn.style.left = '108px';
        yarnBallBtn.classList.remove('rolling');
        yarnBallBtn.classList.remove('caught');
        if (yarnString) yarnString.style.width = '0px';

        yarnKitten.style.left = '14px';
        yarnKitten.classList.remove('is-pouncing');
        yarnKitten.classList.add('is-idle');
        if (chaserShout) chaserShout.textContent = 'Lempar lagi dong!';

        isYarnRolling = false;
      }, 3200);
    });
  }

  // =========================================================================
  // 13. REPLAY CELEBRATION BUTTON (FOOTER)
  // =========================================================================
  const replayCelebrationBtn = document.getElementById('replayCelebrationBtn');
  if (replayCelebrationBtn) {
    replayCelebrationBtn.addEventListener('click', () => {
      audio.playChime();
      launchFestiveConfetti({ particleCount: 150, spread: 100, origin: { y: 0.7 } });
    });
  }

  // =========================================================================
  // BOTTOM DANCING CATS TROUPE INTERACTION (PERSISTENT SPEECH BUBBLES)
  // =========================================================================
  const dancingCatUnits = document.querySelectorAll('.dancing-cat-unit');

  function scheduleBubbleAutoDismiss(unit, bubble, delay = 2600) {
    if (unit._bubbleDismissTimer) {
      clearTimeout(unit._bubbleDismissTimer);
    }
    unit._bubbleDismissTimer = setTimeout(() => {
      bubble.classList.remove('bubble-bounce-highlight');
      bubble.classList.add('is-fading-out');
      setTimeout(() => {
        unit.classList.remove('is-speaking');
        bubble.remove();
        unit._bubbleDismissTimer = null;
      }, 300);
    }, delay);
  }

  function removeAllDancingBubbles() {
    dancingCatUnits.forEach((u) => {
      if (u._bubbleDismissTimer) {
        clearTimeout(u._bubbleDismissTimer);
        u._bubbleDismissTimer = null;
      }
      u.classList.remove('is-speaking');
      const b = u.querySelector('.dancing-cat-bubble');
      if (b) b.remove();
    });
  }

  dancingCatUnits.forEach((unit) => {
    unit.addEventListener('click', () => {
      const action = unit.dataset.action || 'cheer';
      const shoutText = unit.dataset.shout || 'Happy Birthday!';
      const reactClass = `reacting-${action}`;

      // 1. Character-Specific Sound Effects
      if (action === 'cheer') {
        audio.playSingleKittenMeow(1100, 0.28, 1600);
      } else if (action === 'kiss') {
        audio.playSingleKittenMeow(1350, 0.32, 1750);
      } else if (action === 'bow') {
        audio.playChime();
      } else if (action === 'jiggle') {
        audio.playSingleKittenMeow(850, 0.35, 1200);
      } else if (action === 'party') {
        audio.playSingleKittenMeow(1250, 0.25, 1800);
      }

      // 2. Reaction Animation
      unit.classList.remove(reactClass);
      void unit.offsetWidth;
      unit.classList.add(reactClass);
      setTimeout(() => {
        unit.classList.remove(reactClass);
      }, 820);

      // 3. Custom Confetti Burst per Character
      const rect = unit.getBoundingClientRect();
      const normX = (rect.left + rect.width / 2) / window.innerWidth;
      const confettiCount = action === 'party' ? 30 : (action === 'kiss' ? 22 : 18);
      launchFestiveConfetti({
        particleCount: confettiCount,
        spread: action === 'party' ? 70 : 45,
        origin: { x: normX, y: 0.90 }
      });

      // 4. Speech Bubble (Auto-disappears automatically, no 'X' button)
      const existingBubble = unit.querySelector('.dancing-cat-bubble');
      if (existingBubble) {
        // If already showing, bounce to acknowledge click and reset auto-dismiss timer
        existingBubble.classList.remove('is-fading-out');
        existingBubble.classList.remove('bubble-bounce-highlight');
        void existingBubble.offsetWidth;
        existingBubble.classList.add('bubble-bounce-highlight');
        scheduleBubbleAutoDismiss(unit, existingBubble, 2600);
        return;
      }

      // Close any other cat's bubble so speech is focused and clean
      removeAllDancingBubbles();

      unit.classList.add('is-speaking');

      const bubble = document.createElement('div');
      bubble.className = 'dancing-cat-bubble is-active';
      bubble.setAttribute('role', 'status');
      bubble.setAttribute('aria-live', 'polite');

      const textWrap = document.createElement('div');
      textWrap.className = 'bubble-text-wrap';

      const speakerTag = document.createElement('span');
      speakerTag.className = 'bubble-speaker-tag';
      speakerTag.textContent = '🐾 Meow!';

      const messageText = document.createElement('span');
      messageText.className = 'bubble-message-text';
      messageText.textContent = `“${shoutText}”`;

      textWrap.appendChild(speakerTag);
      textWrap.appendChild(messageText);

      bubble.appendChild(textWrap);
      unit.appendChild(bubble);

      // Schedule automatic disappearance
      scheduleBubbleAutoDismiss(unit, bubble, 2600);

      // Clamp bubble horizontally within viewport so text is NEVER cut off on mobile edges
      const unitRect = unit.getBoundingClientRect();
      const catCenterX = unitRect.left + unitRect.width / 2;
      const bubbleHalfWidth = bubble.offsetWidth / 2;
      const leftEdge = catCenterX - bubbleHalfWidth;
      const rightEdge = catCenterX + bubbleHalfWidth;

      let shiftX = 0;
      if (leftEdge < 12) {
        shiftX = 12 - leftEdge;
      } else if (rightEdge > window.innerWidth - 12) {
        shiftX = -(rightEdge - (window.innerWidth - 12));
      }

      if (shiftX !== 0) {
        bubble.style.setProperty('--bubble-shift-x', `${shiftX}px`);
      }
    });
  });

  // =========================================================================
  // AUTOMATIC DANCING CATS RANDOM CONFETTI THROW (EVERY 2 SECONDS)
  // =========================================================================
  const dancingCatsBar = document.getElementById('dancingCatsBar');
  let lastRandomCatIdx = -1;

  function triggerRandomCatConfetti() {
    if (!dancingCatsBar) return;

    // Do not throw confetti when tab/browser is in background
    if (document.hidden) return;

    // Check if bottom bar is locked off-screen (wait until unlocked)
    if (dancingCatsBar.classList.contains('is-locked') && !dancingCatsBar.classList.contains('is-unlocked')) {
      return;
    }

    const computedStyle = window.getComputedStyle(dancingCatsBar);
    if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden' || computedStyle.opacity === '0') {
      return;
    }

    if (!dancingCatUnits || dancingCatUnits.length === 0) return;

    // Randomly pick one cat, alternating so the exact same cat does not repeat consecutively
    let chosenIdx = Math.floor(Math.random() * dancingCatUnits.length);
    if (dancingCatUnits.length > 1 && chosenIdx === lastRandomCatIdx) {
      chosenIdx = (chosenIdx + 1 + Math.floor(Math.random() * (dancingCatUnits.length - 1))) % dancingCatUnits.length;
    }
    lastRandomCatIdx = chosenIdx;

    const unit = dancingCatUnits[chosenIdx];
    if (!unit) return;

    const action = unit.dataset.action || 'cheer';
    const reactClass = `reacting-${action}`;

    // 1. Trigger the cat's celebratory bounce/throw animation
    unit.classList.remove(reactClass);
    void unit.offsetWidth;
    unit.classList.add(reactClass);
    setTimeout(() => {
      unit.classList.remove(reactClass);
    }, 820);

    // 2. Compute exact viewport coordinates of this cat
    const rect = unit.getBoundingClientRect();
    const normX = (rect.left + rect.width / 2) / window.innerWidth;
    const normY = Math.max(0.72, Math.min(0.95, (rect.top + 8) / window.innerHeight));

    // 3. Custom themed colors & dynamics per cat
    let catColors = ['#FF8E72', '#E75A70', '#F3B042', '#C49BD4', '#FFF4E0', '#FFCAD1'];
    let particleCount = 22;
    let spread = 52;

    if (action === 'cheer') {
      catColors = ['#FFA94D', '#FFD43B', '#FF8E72', '#FFF4E0', '#FF6B8B'];
      particleCount = 22;
      spread = 52;
    } else if (action === 'kiss') {
      catColors = ['#FF6B8B', '#FF85A2', '#FFCAD4', '#FFF0F5', '#E75A70'];
      particleCount = 24;
      spread = 48;
    } else if (action === 'bow') {
      catColors = ['#FFD43B', '#4DABF7', '#FFF4E0', '#C49BD4', '#F3B042'];
      particleCount = 20;
      spread = 46;
    } else if (action === 'jiggle') {
      catColors = ['#63E6BE', '#FFA94D', '#FFD43B', '#FF8E72', '#FFF4E6'];
      particleCount = 22;
      spread = 50;
    } else if (action === 'party') {
      catColors = ['#9775FA', '#FF6B8B', '#4DABF7', '#FFD43B', '#63E6BE'];
      particleCount = 26;
      spread = 62;
    }

    launchFestiveConfetti({
      particleCount,
      spread,
      origin: { x: normX, y: normY },
      colors: catColors,
      startVelocity: 40,
      gravity: 0.95,
      ticks: 180
    });
  }

  // Set interval every 2 seconds
  const autoCatConfettiTimer = setInterval(triggerRandomCatConfetti, 2000);
  window.triggerRandomCatConfetti = triggerRandomCatConfetti;

  // =========================================================================
  // HERO SCROLL INDICATOR (Smooth Scroll down to Birthday Cake)
  // =========================================================================
  const heroScrollIndicator = document.getElementById('heroScrollIndicator');
  if (heroScrollIndicator) {
    heroScrollIndicator.addEventListener('click', (e) => {
      e.preventDefault();
      audio.playChime();
      const cakeSec = document.getElementById('cakeSection');
      if (cakeSec) {
        cakeSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // =========================================================================
  // SECRET LOVE LETTER: INTERACTIVE WAX SEAL STAMP
  // =========================================================================
  const letterWaxSeal = document.getElementById('letterWaxSeal');
  if (letterWaxSeal) {
    letterWaxSeal.addEventListener('click', () => {
      audio.playChime();
      const rect = letterWaxSeal.getBoundingClientRect();
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 28,
          spread: 65,
          origin: { x: originX, y: originY },
          colors: ['#E75A70', '#FF8E72', '#FFCAD4', '#FFFDF9', '#F3B042'],
          shapes: ['circle'],
          ticks: 120,
          gravity: 0.8
        });
      }

      letterWaxSeal.classList.add('seal-pressed');
      setTimeout(() => letterWaxSeal.classList.remove('seal-pressed'), 400);
    });
  }

  // Interactive Pasted 3x4 Photo on Secret Letter
  const letterPastedPhoto = document.getElementById('letterPastedPhoto') || document.getElementById('letterPostageStamp');
  if (letterPastedPhoto) {
    const handlePhotoTap = () => {
      audio.playChime();
      const rect = letterPastedPhoto.getBoundingClientRect();
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 26,
          spread: 60,
          origin: { x: originX, y: originY },
          colors: ['#FF85A2', '#FFCAD4', '#FFFDF9', '#F3B042', '#E75A70'],
          shapes: ['circle'],
          ticks: 110,
          gravity: 0.7
        });
      }

      showBirthdayToast('Foto 3x4 Tuan Putri Manis Kesayangan 👑💖');
      letterPastedPhoto.classList.add('photo-pressed');
      setTimeout(() => letterPastedPhoto.classList.remove('photo-pressed'), 400);

      // Open high-res lightbox view
      openPolaroidModal({
        title: 'Tuan Putri Tersayang 👑💖',
        caption: 'Foto manis 3x4 di bawah langit malam berbintang, menemani setiap doa dan harapan baik di hari ulang tahunmu.',
        imgSrc: 'assets/images/birthday_queen_full.jpg'
      });
    };

    letterPastedPhoto.addEventListener('click', handlePhotoTap);
    letterPastedPhoto.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handlePhotoTap();
      }
    });
  }

});

