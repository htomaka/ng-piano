const A4 = 440;
const scaleIndexToNote = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B'
];

export class Note {
  constructor(private readonly value: number) {
    this.value = value;
  }

  toMidi(): number {
    return this.value;
  }

  toFrequency(): number {
    return A4 * Math.pow(2, (this.value - 69) / 12);
  }

  toNote(): string {
    const freq = this.toFrequency();
    const log = Math.log2(freq / A4);
    let noteNumber = Math.round(12 * log) + 57;
    const octave = Math.floor(noteNumber / 12);
    if (octave < 0) {
      noteNumber += -12 * octave;
    }
    const noteName = scaleIndexToNote[noteNumber % 12];
    return noteName + octave.toString();
  }

  isFlat() {
    return this.toNote().includes('#');
  }
}
