import { SoundType } from './types';

// Fast, zero-dependency in-memory WAV audio generator
// Generates standard 16-bit PCM Mono 22,050 Hz WAV data URIs
function generateWavDataUri(
  durationSec: number,
  generator: (t: number, duration: number) => number,
  sampleRate = 22050
): string {
  const numSamples = Math.floor(sampleRate * durationSec);
  const dataSize = numSamples * 2;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // RIFF header
  view.setUint32(0, 0x52494646, false); // "RIFF"
  view.setUint32(4, 36 + dataSize, true); // ChunkSize
  view.setUint32(8, 0x57415645, false); // "WAVE"

  // fmt sub-chunk
  view.setUint32(12, 0x666d7420, false); // "fmt "
  view.setUint32(16, 16, true); // Subchunk1Size
  view.setUint16(20, 1, true); // AudioFormat (1 = PCM)
  view.setUint16(22, 1, true); // NumChannels (1 = Mono)
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, sampleRate * 2, true); // ByteRate
  view.setUint16(32, 2, true); // BlockAlign
  view.setUint16(34, 16, true); // BitsPerSample

  // data sub-chunk
  view.setUint32(36, 0x64617461, false); // "data"
  view.setUint32(40, dataSize, true); // Subchunk2Size

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const rawSample = generator(t, durationSec);
    const clamped = Math.max(-1, Math.min(1, rawSample));
    view.setInt16(44 + i * 2, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true);
  }

  // Convert binary buffer to base64
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const len = bytes.byteLength;
  const chunkSize = 8192;
  for (let i = 0; i < len; i += chunkSize) {
    binary += String.fromCharCode.apply(
      null,
      bytes.subarray(i, Math.min(i + chunkSize, len)) as any
    );
  }

  const base64 = typeof btoa !== 'undefined' ? btoa(binary) : Buffer.from(binary, 'binary').toString('base64');
  return `data:audio/wav;base64,${base64}`;
}

// Generate all sound effects locally in memory
export const GENERATED_SOUNDS: Record<SoundType, string> = {
  // 1. Tick: Crisp studio countdown clock tick
  [SoundType.Tick]: generateWavDataUri(0.5, (t) => {
    if (t > 0.09) return 0;
    const tone = Math.sin(2 * Math.PI * 920 * t) * Math.exp(-t * 55);
    const click = (Math.random() - 0.5) * 0.25 * Math.exp(-t * 90);
    return (tone + click) * 0.8;
  }),

  // 2. Play: Ambient question music bed (3.0s seamless loop)
  [SoundType.Play]: generateWavDataUri(3.0, (t, dur) => {
    const fade = Math.sin((Math.PI * t) / dur);
    // Low drone bass
    const bass = Math.sin(2 * Math.PI * 65.41 * t) * 0.45; // C2
    const fifth = Math.sin(2 * Math.PI * 98.0 * t) * 0.25; // G2
    // Subtle heartbeat pulse every 0.75s
    const pulsePhase = (t % 0.75) / 0.75;
    const pulse = Math.sin(2 * Math.PI * 80 * pulsePhase) * Math.exp(-pulsePhase * 8) * 0.35;
    return (bass + fifth + pulse) * fade * 0.55;
  }),

  // 3. Suspense: Deeper high-stakes tension bed (3.0s seamless loop)
  [SoundType.Suspense]: generateWavDataUri(3.0, (t, dur) => {
    const fade = Math.sin((Math.PI * t) / dur);
    // Darker sub-bass drone
    const sub = Math.sin(2 * Math.PI * 55.0 * t) * 0.5; // A1
    const minorThird = Math.sin(2 * Math.PI * 65.41 * t) * 0.3; // C2
    const fifth = Math.sin(2 * Math.PI * 82.41 * t) * 0.2; // E2
    // Tense pulse
    const pulsePhase = (t % 0.6) / 0.6;
    const pulse = Math.sin(2 * Math.PI * 70 * pulsePhase) * Math.exp(-pulsePhase * 9) * 0.4;
    return (sub + minorThird + fifth + pulse) * fade * 0.6;
  }),

  // 4. Final Answer: Tension lock-in chord
  [SoundType.FinalAnswer]: generateWavDataUri(1.8, (t) => {
    const fade = Math.exp(-t * 1.2);
    const lowA = Math.sin(2 * Math.PI * 110.0 * t) * 0.5;
    const fifth = Math.sin(2 * Math.PI * 164.81 * t) * 0.35;
    const high = Math.sin(2 * Math.PI * 220.0 * t) * 0.2;
    return (lowA + fifth + high) * fade * 0.75;
  }),

  // 5. Correct: Bright joyful ascending arpeggio (C5 -> E5 -> G5 -> C6)
  [SoundType.Correct]: generateWavDataUri(1.5, (t) => {
    if (t < 0.18) {
      return Math.sin(2 * Math.PI * 523.25 * t) * 0.65 * Math.exp(-t * 3);
    }
    if (t < 0.36) {
      const dt = t - 0.18;
      return Math.sin(2 * Math.PI * 659.25 * dt) * 0.7 * Math.exp(-dt * 3);
    }
    if (t < 0.54) {
      const dt = t - 0.36;
      return Math.sin(2 * Math.PI * 783.99 * dt) * 0.75 * Math.exp(-dt * 3);
    }
    const dt = t - 0.54;
    const bell =
      Math.sin(2 * Math.PI * 1046.5 * dt) * 0.7 +
      Math.sin(2 * Math.PI * 2093.0 * dt) * 0.25;
    return bell * Math.exp(-dt * 2.2);
  }),

  // 6. Wrong: Dissonant game show descending fail buzz
  [SoundType.Wrong]: generateWavDataUri(1.1, (t) => {
    const f1 = 138;
    const f2 = 146;
    const saw1 = 2 * ((t * f1) % 1) - 1;
    const saw2 = 2 * ((t * f2) % 1) - 1;
    const decay = Math.exp(-t * 2.2);
    return (saw1 * 0.45 + saw2 * 0.45) * decay;
  }),

  // 7. Win: Triumphant grand victory fanfare chord
  [SoundType.Win]: generateWavDataUri(2.8, (t) => {
    const decay = Math.exp(-t * 0.9);
    const chord =
      Math.sin(2 * Math.PI * 523.25 * t) * 0.35 + // C5
      Math.sin(2 * Math.PI * 659.25 * t) * 0.3 + // E5
      Math.sin(2 * Math.PI * 783.99 * t) * 0.3 + // G5
      Math.sin(2 * Math.PI * 1046.5 * t) * 0.35; // C6
    // Shimmering sparkle
    const sparkle = Math.sin(2 * Math.PI * 1567.98 * t) * 0.15 * Math.sin(2 * Math.PI * 12 * t);
    return (chord + sparkle) * decay;
  }),

  // 8. Lose: Somber descending minor chord
  [SoundType.Lose]: generateWavDataUri(1.8, (t) => {
    const decay = Math.exp(-t * 1.5);
    const note1 = Math.sin(2 * Math.PI * 392.0 * t) * 0.3; // G4
    const note2 = Math.sin(2 * Math.PI * 311.13 * t) * 0.35; // Eb4
    const note3 = Math.sin(2 * Math.PI * 261.63 * t) * 0.4; // C4
    return (note1 + note2 + note3) * decay * 0.7;
  }),

  // 9. FiftyFifty: High-tech dual laser whoosh
  [SoundType.FiftyFifty]: generateWavDataUri(0.65, (t) => {
    const freq = 350 + (1200 - 350) * (t / 0.65);
    const tone = Math.sin(2 * Math.PI * freq * t);
    const decay = Math.sin((Math.PI * t) / 0.65);
    return tone * decay * 0.7;
  }),

  // 10. AskAudience: Cheerful digital rising telemetry chime
  [SoundType.AskAudience]: generateWavDataUri(0.85, (t) => {
    const step = Math.floor(t * 8);
    const freqs = [440, 554, 659, 880, 1108, 1318, 1760, 2217];
    const freq = freqs[Math.min(step, freqs.length - 1)];
    const tone = Math.sin(2 * Math.PI * freq * t);
    const decay = Math.exp(-t * 2.5);
    return tone * decay * 0.65;
  }),

  // 11. PhoneFriend: Authentic telephone ring pulse
  [SoundType.PhoneFriend]: generateWavDataUri(1.2, (t) => {
    const isRing = (t % 0.6) < 0.35;
    if (!isRing) return 0;
    // Standard dual tone ring (440Hz + 480Hz)
    const ring = Math.sin(2 * Math.PI * 440 * t) * 0.4 + Math.sin(2 * Math.PI * 480 * t) * 0.4;
    return ring * 0.7;
  }),

  // 12. Start: Energetic opening game show swell
  [SoundType.Start]: generateWavDataUri(1.6, (t) => {
    const decay = Math.exp(-t * 1.4);
    const chord =
      Math.sin(2 * Math.PI * 440 * t) * 0.35 +
      Math.sin(2 * Math.PI * 554.37 * t) * 0.3 +
      Math.sin(2 * Math.PI * 659.25 * t) * 0.35;
    return chord * decay;
  }),
};
