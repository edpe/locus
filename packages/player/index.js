class Player {
  constructor(options) {
    this.patterns = [];
  }

  playPattern(patterns, patternIndex) {
    patterns.length > 0
      ? patterns[patternIndex].start().stop("64m")
      : alert("please make a pattern before playing it");
  }

  stopPattern(patterns, patternIndex) {
    patterns.length > 0
      ? patterns[patternIndex].stop()
      : alert("please make a pattern before playing it");
  }

  playLoop(loop, start, end) {
    this.loops[loop].start(start).stop(end);
  }

  playChord(chord, start, repeats, length) {
    this.chords[chord].loop = repeats;
    this.chords[chord].loopEnd = length;
    this.chords[chord].start();
  }
}

module.exports = Player;
