class Conductor {
  constructor(transport) {
    this.transport = transport;
  }

  startTransport() {
    this.transport.start();
    console.log(this.transport.state);
  }

  stopTransport() {
    this.transport.stop();
    console.log(this.transport.state);
  }

  pauseTransport() {
    this.transport.pause();
    console.log(this.transport.state);
  }

  setBPM(bpm) {
    this.transport.bpm.value = bpm;
  }
}

module.exports = Conductor;
