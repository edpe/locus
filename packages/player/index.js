class Player {
  constructor(options) {
  }

  playPattern(pattern, start, end) {
    console.log("Im playing a pattern right now!")
    //this.patterns[pattern].start(start).stop(end);
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
