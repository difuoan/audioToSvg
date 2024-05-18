export default class AudioParser {
  // CONSTRUCTOR RELATED CODE START
  // the constructor of the AudioParser-class
  constructor(settings) {
    this.settings = settings;
    window.AudioContext = window.AudioContext || window.webkitAudioContext; // failsave for safari
    this.context = new AudioContext();
  }
  // TODO: I THINK THE ENTIRE AUDIO-PARSER CAN BE MADE INTO A WORKER

  // loads the file data into the audio parser asynchroniously
  async loadFromSource() {
    if (!this.settings.file.src) {
      return null;
    }

    const response = await fetch(this.settings.file.src);
    const arrayBuffer = await this.parseArrayBufferResponse(response);

    this.audioBuffer = await this.context.decodeAudioData(arrayBuffer);

    return this.audioBuffer;
  }

  // checks wether the audio parser is okay and then parses it so it can be used later on
  parseArrayBufferResponse(response) {
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`);
    }

    return response.arrayBuffer();
  }
  // CONSTRUCTOR RELATED CODE END

  // calculates the peaks of the waveform
  getPeaks(index) {
    if (!this.audioBuffer) {
      return null;
    }

    const numberOfChannels = this.audioBuffer.numberOfChannels;
    let channels = [];

    for (
      let channelNumber = 0;
      channelNumber < numberOfChannels;
      channelNumber++
    ) {
      channels.push(this.audioBuffer.getChannelData(channelNumber));
    }

    if (typeof this.settings.file.channelsPreprocess === "function") {
      channels = channels.reduce(this.settings.file.channelsPreprocess, []);
    }

    // change places of arguments in reducePeaks call
    const peaks = channels.reduce(
      (mergedPeaks, channelData, ...args) => this.reducePeaks(index, channelData, mergedPeaks, ...args),
      []
    );

    return peaks;
  }

  // reduces the peaks to the specified amount
  reducePeaks(index, channelData, peaks, channelNumber) {
    const sampleSize = this.audioBuffer.length / this.settings.elements[index].frequency;
    const sampleStep = ~~(sampleSize / 10) || 1;
    const mergedPeaks = Array.isArray(peaks) ? peaks : [];

    for (
      let peakNumber = 0;
      peakNumber < this.settings.elements[index].frequency;
      peakNumber++
    ) {
      const start = ~~(peakNumber * sampleSize);
      const end = ~~(start + sampleSize);
      let min = channelData[0];
      let max = channelData[0];

      for (
        let sampleIndex = start;
        sampleIndex < end;
        sampleIndex += sampleStep
      ) {
        const value = channelData[sampleIndex];

        if (value > max) {
          max = value;
        }
        if (value < min) {
          min = value;
        }
      }

      if (channelNumber === 0 || max > mergedPeaks[2 * peakNumber]) {
        mergedPeaks[2 * peakNumber] = max;
      }

      if (channelNumber === 0 || min < mergedPeaks[2 * peakNumber + 1]) {
        mergedPeaks[2 * peakNumber + 1] = min;
      }
    }

    return mergedPeaks;
  }

  // Converts the canvas into a png
  getCanvasData() {
    // TODO: TAKES ABOUT 180ms, could benefit from a worker or something else that can be awaited
    if (this.settings.file.src.length == 0) {
      this.settings.file.loading = false;
      return;
    }
    let firstCanvas = null;
    let firstContext = null;
    this.settings.canvases.forEach((element, index) => {
      if (
        firstCanvas == null
        && firstContext == null
      ) {
        firstCanvas = element.canvas;
        firstContext = element.context;
      } else {
        firstContext.drawImage(element.canvas, 0, 0);
      }
    });
    let canvasData = firstCanvas.toDataURL("png");
    this.settings.canvasData = canvasData;
    return canvasData;
  }
}
