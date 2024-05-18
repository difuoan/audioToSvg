export default {
  methods: {
    // COLORING HELPERS START
    convertToRGBA(color, opacity) {
      // ["XX", "XX", "XX"] -> [n, n, n]
      let returnValue = color.match(/[A-Za-z0-9]{2}/g);
      // [n, n, n] -> rgb(n,n,n)
      returnValue = returnValue.map(function(v) {
        return parseInt(v, 16);
      });
      return "rgba(" + returnValue.join(", ") + ", " + opacity + ")";
    },
    // COLORING HELPERS END
    
    // restores the default context of the canvas (context needs to be saved again)
    saveAndRestore(index) {
      this.canvases[index].context.restore();
      this.canvases[index].context.save();
    },
    setElementStyle(index) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      let context = this.canvases[index].context; // just shorten the code by saving this in a tmp-var (let)
      // start drawing the waveform
      context.beginPath();
      // set the appearance of the waveform
      if (typeof element.lineWidth != "undefined") {
        context.lineWidth = element.lineWidth;
      } else {
        context.lineWidth = element.width;
      }
      // set the appearance of the title-text
      if (
          typeof element.style != "undefined"
          && typeof element.variant != "undefined"
          && typeof element.size != "undefined"
          && typeof element.font != "undefined"
      ) {
        context.font = `${element.style} ${element.variant} ${element.size}px ${element.font}`;
      }
      context.textAlign = element.textAlign;
      let fillStyle = element.fillStyle;
      if (typeof element.fillStyle == "undefined") { // make sure we have a fillStyle and use the function-variable instead if we don't have it
        fillStyle = element.function;
      }
      switch (fillStyle) { // TODO: FIND OUT WHY SOMETIMES THE GRADIENTS ARE BUGGY FOR THE TITLE-ELEMENT (the gradient seems to start and end for individual letters and/or words)
        case "radial gradient":
          this.createRadialGradient(index);
          break;
        case "linear gradient":
          this.createLinearGradient(index);
          break;
        default:
          context.fillStyle = element.color;
          context.strokeStyle = element.color;
          break;
      }
      context.lineCap = element.lineCap;
      context.lineJoin = element.lineJoin;
      context.globalAlpha = element.opacity;
    },
    drawElement(index) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      let context = this.canvases[index].context; // just shorten the code by saving this in a tmp-var (let)
      let canvas = this.canvases[index].canvas; // just shorten the code by saving this in a tmp-var (let)
      // create a variable to write the upper-/lower-/normal-case text to and use later
      let textToFill = "";
      if (typeof element.case != "undefined") {
        switch (element.case) {
          case "uppercase":
            textToFill = element.text.toUpperCase();
            break;
          case "lowercase":
            textToFill = element.text.toLowerCase();
            break;
          default:
            textToFill = element.text
            break;
        }
      }
      if (
        element.useStroke
        || typeof element.useStroke == "undefined"
      ) {
        if (element.name == "title") {
          // stroke the title-text so it will show up in the canvas
          context.strokeText(
            textToFill,
            element.offset.x + (this.computedSvgWidth / 2),
            element.offset.y + (this.computedSvgHeight / 2)
          );
        } else {
          context.stroke();
        }
      }
      if (
        element.useFill == true
        || typeof element.useFill == "undefined"
      ) {
        switch (element.name) {
          case "title":
            // fill the title-text so it will show up in the canvas
            context.fillText(
              textToFill,
              element.offset.x + (this.computedSvgWidth / 2),
              element.offset.y + (this.computedSvgHeight / 2)
            );
            break;
          case "background":
            context.fillRect(0, 0, canvas.width, canvas.height);
            break;
          case "waveform":
            context.fill();
            break;
          default:
            context.fill();
            break;
        }
      }
    },
    calculatePeaks(index) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      // correct peaks for bars-waveform so they will have a min-height
      element.peaks = this.correctPeakHeights(
        this.audioParser.getPeaks(index),
        index
      );
    },
    // makes sure the peaks have a minimum height and alternate between + and -
    correctPeakHeights(peaks, index) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      function firstCorrectValue(peak) {
        return Math.abs(peak) >= 0.05;
      }
      if (element.forceMinHeight == true) {
        let firstCorrectPeak = peaks.find(firstCorrectValue);
        let firstCorrectPeakIndex = peaks.findIndex(firstCorrectValue);
        let peakSign = Math.sign(firstCorrectPeak);
        let firstPeakSign = peakSign * Math.pow(-1, firstCorrectPeakIndex);
        peaks.forEach((peak, index) => {
          if (Math.abs(peak) < 0.05) {
            let newPeakSign = firstPeakSign * Math.pow(-1, index);
            peaks[index] = 0.05 * newPeakSign;
          }
        });
      }
      if (element.positiveOnly == true) {
        peaks.forEach((peak, index) => {
          peaks[index] = Math.abs(peak) * -1; // apparently the waveform gets drawn backwards so we have to actually make all peaks negative to make them seem positive
        });
      }
      return peaks;
    }
  }
};
