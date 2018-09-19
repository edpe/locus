class Player {
  constructor(options) {
    this.patterns = []
  }

  playPattern(patterns, patternIndex, end) {
    console.log(patterns[patternIndex])
    patterns[patternIndex].start().stop(end);
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
