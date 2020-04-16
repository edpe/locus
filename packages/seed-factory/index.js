const dictionary = require('./dictionary.json');
const songs = require('./songs.json');
const SEMITONES = 12;

class SeedFactory {
  constructor(song, role) {
    this.song = song;
    this.role = role;
    this.scale = [];
    this.chords = {};
  }

  currentHour() {
    const date = new Date();
    let hour = date.getHours();
    return hour;
  }

  currentTimeOfDay() {
    const h = this.currentHour();
    switch (true) {
      case h >= 0 && h < 5:
        return 'night';
        break;
      case h >= 5 && h < 9:
        return 'earlyMorning';
        break;
      case h >= 9 && h < 12:
        return 'lateMorning';
        break;
      case h >= 12 && h < 15:
        return 'midday';
        break;
      case h >= 15 && h < 18:
        return 'earlyAfternoon';
        break;
      case h >= 18 && h < 20:
        return 'lateAfternoon';
        break;
      case h >= 20 && h < 23:
        return 'earlyEvening';
        break;
      case h >= 23 && h < 25:
        return 'lateEvening';
        break;
    }
  }

  currentScale() {
    return dictionary.timesOfDay[this.currentTimeOfDay()];
  }

  generateScale() {
    const tonality = dictionary.modes[this.currentScale()];
    const transposedScale = [];
    tonality.forEach(x => transposedScale.push(x, x + 12));
    const sortedScale = transposedScale.sort((a, b) => a - b);
    const scale = [];

    sortedScale.forEach(index => {
      if (index <= 11) {
        scale.push(
          dictionary.chromaticScale.flats[index] + this.role.octave.toString()
        );
      } else {
        scale.push(
          dictionary.chromaticScale.flats[index - 12] +
            (this.role.octave + 1).toString()
        );
      }
    });

    this.scale = scale;
  }

  generateMelody() {
    const octFactor = this.role.octave * SEMITONES;
    const currentSong = songs.melodies[this.song];
    this.generateScale();
    const melody = currentSong.map(note => this.scale[note]);
    return melody;
  }
}

module.exports = SeedFactory;
