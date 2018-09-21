class Player {
  constructor(options) {
    this.patterns = []
  }

  playPattern(patterns, patternIndex) {
    patterns[patternIndex].start().stop("16m");
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
