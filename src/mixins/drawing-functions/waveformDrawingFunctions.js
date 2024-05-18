export default {
  methods: {
    // DRAW DEFAULT START
    drawDefaultWaveform(index) { // TODO: READ MORE ABOUT WORKERS https://alligator.io/vuejs/vue-workers/
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      let context = this.canvases[index].context; // just shorten the code by saving this in a tmp-var (let)
      this.rotateElement( // rotate the canvas
        this.computedSvgWidth / 2,
        this.getStartingPointY(index),
        index
      );
      this.setElementStyle(index);
      this.calculatePeaks(index);
      context.moveTo( // the first point of the waveform (starting point)
        this.getStartingPointX(index),
        this.getStartingPointY(index)
      );
      // the peaks of the waveform
      for (let peakIndex = 1; peakIndex - 1 < element.peaks.length; peakIndex++) {
        let peak = element.peaks[peakIndex - 1];
        context.lineTo(
          this.getStartingPointX(index) + this.getStepSize(index) * peakIndex * element.size,
          this.getStartingPointY(index) + peak * element.amplitude * element.size
        );
      }
      // stroke and/or fill the created path so it will show up on the canvas
      this.drawElement(index);
    },
    // DRAW DEFAULT END
    // TODO: ADD A WATERMARK TO ALL THE PREVIEWS BUT NOT THE ACTUAL PRODUCT (SO THAT PEAOPLE CAN'T STEAL MY IMAGES)

    // DRAW BARS START
    drawBarsWaveform(index) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      let context = this.canvases[index].context; // just shorten the code by saving this in a tmp-var (let)
      this.rotateElement( // rotate the canvas
        this.computedSvgWidth / 2,
        this.getStartingPointY(index),
        index
      );
      this.setElementStyle(index);
      context.lineWidth = element.width * element.size;
      this.calculatePeaks(index);
      // the peaks of the waveform
      for (let peakIndex = 1; peakIndex - 1 < element.peaks.length; peakIndex++) {
        let peak = element.peaks[peakIndex - 1];
        context.moveTo(
          this.getStartingPointX(index)
            + this.getStepSize(index) * peakIndex * element.size
            - this.getStepSize(index) / 2,
          this.getStartingPointY(index)
        );
        context.lineTo(
          this.getStartingPointX(index)
            + this.getStepSize(index) * peakIndex * element.size
            - this.getStepSize(index) / 2,
          this.getStartingPointY(index) + peak * element.amplitude * element.size
        );
      }
      // stroke and/or fill the created path so it will show up on the canvas
      this.drawElement(index);
    },
    // DRAW BARS END

    // DRAW CIRCLES START
    drawCirclesWaveform(index) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      let context = this.canvases[index].context; // just shorten the code by saving this in a tmp-var (let)
      this.rotateElement( // rotate the canvas
        this.computedSvgWidth / 2,
        this.getStartingPointY(index),
        index
      );
      this.calculatePeaks(index);
      // the peaks of the waveform
      for (let peakIndex = 1; peakIndex - 1 < element.peaks.length; peakIndex++) {
        this.setElementStyle(index);
        let peak = element.peaks[peakIndex - 1];
        let lineToY = Math.abs(peak) * element.amplitude * element.size * 5;
        let centerX = this.getStartingPointX(index) + (this.computedSvgWidth / 2) * element.size;
        let centerY = this.getStartingPointY(index);

        context.beginPath();
        context.arc(centerX, centerY, lineToY, 0, 2 * Math.PI, false);
        // stroke and/or fill the created path so it will show up on the canvas
        this.drawElement(index);
      }
    },
    // DRAW CIRCLES END

    // DRAW LINE OF CIRCLES START
    drawLineOfCirclesWaveform(index) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      let context = this.canvases[index].context; // just shorten the code by saving this in a tmp-var (let)
      this.rotateElement( // rotate the canvas
        this.computedSvgWidth / 2,
        this.getStartingPointY(index),
        index
      );
      this.calculatePeaks(index);
      // the peaks of the waveform
      for (let peakIndex = 1; peakIndex - 1 < element.peaks.length; peakIndex++) {
        this.setElementStyle(index);
        let peak = element.peaks[peakIndex - 1];
        let lineToY = Math.abs(peak) * element.amplitude * element.size;
        let centerX = this.getStartingPointX(index)
          + this.getStepSize(index) * peakIndex * element.size
          - this.getStepSize(index) / 2;
        let centerY = this.getStartingPointY(index);

        context.beginPath();
        context.arc(centerX, centerY, lineToY, 0, 2 * Math.PI, false);
        // stroke and/or fill the created path so it will show up on the canvas
        this.drawElement(index);
      }
    },
    // DRAW LINE OF CIRCLES END

    // DRAW LINE OF HALF CIRCLES START
    drawLineOfHalfCirclesWaveform(index) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      let context = this.canvases[index].context; // just shorten the code by saving this in a tmp-var (let)
      this.rotateElement( // rotate the canvas
        this.computedSvgWidth / 2,
        this.getStartingPointY(index),
        index
      );
      this.calculatePeaks(index);
      let couterClockwise = false;
      // the peaks of the waveform
      for (let peakIndex = 1; peakIndex - 1 < element.peaks.length; peakIndex++) {
        this.setElementStyle(index);
        let peak = element.peaks[peakIndex - 1];
        let lineToY = Math.abs(peak) * element.amplitude * element.size;
        let centerX = this.getStartingPointX(index)
          + this.getStepSize(index) * peakIndex * element.size
          - this.getStepSize(index) / 2;
        let centerY = this.getStartingPointY(index);

        context.beginPath();
        context.arc(centerX, centerY, lineToY, Math.PI, 0, couterClockwise);
        couterClockwise = !couterClockwise;
        // stroke and/or fill the created path so it will show up on the canvas
        this.drawElement(index);
      }
    }
    // DRAW LINE OF HALF CIRCLES END
  }
};
