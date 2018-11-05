const dictionary = require('./dictionary.json');

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
    const tonality = dictionary.modes;
  }
}

module.exports = SeedFactory;
