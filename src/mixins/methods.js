// The mixin that contains the waveform-generation-functions.
import AudioParser from "@/mixins/audioParser.js";
// import the functions used to draw the canvas-elements
import waveformDrawingFunctions from "@/mixins/drawing-functions/waveformDrawingFunctions.js";
import detailDrawingFunctions from "@/mixins/drawing-functions/detailDrawingFunctions.js";
import titleDrawingFunctions from "@/mixins/drawing-functions/titleDrawingFunctions.js";
import shapeDrawingFunctions from "@/mixins/drawing-functions/shapeDrawingFunctions.js";
import settingsHelpers from "@/mixins/helpers/settingsHelpers.js";
import computedHelpers from "@/mixins/helpers/computedHelpers.js";
import gradientHelpers from "@/mixins/helpers/gradientHelpers.js";
import drawingHelpers from "@/mixins/helpers/drawingHelpers.js";
import elementHelpers from "@/mixins/helpers/elementHelpers.js";
import routingHelpers from "@/mixins/helpers/routingHelpers.js";
import titleHelpers from "@/mixins/helpers/titleHelpers.js";
import arrayHelpers from "@/mixins/helpers/arrayHelpers.js";

export default {
  mixins: [
    waveformDrawingFunctions,
    detailDrawingFunctions,
    titleDrawingFunctions,
    shapeDrawingFunctions,
    settingsHelpers,
    computedHelpers,
    gradientHelpers,
    drawingHelpers,
    elementHelpers,
    routingHelpers,
    titleHelpers,
    arrayHelpers
  ],
  methods: {
    // AUDIO PARSER SETUP FUNCTIONS START
    /*
      Passes the needed data to the audioParser.js mixin that gets the peaks from the audio.
      Then calls the drawCanvas-function to actually visualise the audio.
    */
    setUpAudioParser() {
      if (this.file.src.length == 0) {
        this.file.loading = false;
        return;
      }
      this.file.loading = true;

      this.audioParser = new AudioParser(this);
      this.audioParser.loadFromSource().then(() => {
        this.file.channelsPreprocess = this;
        this.drawCanvas();
      });
    },
    // AUDIO PARSER SETUP FUNCTIONS END

    // CANVAS DRAWING METHODS START
    // Resets the canvas and then draws the specified elements on the canvas-element.
    drawCanvas() {
      this.file.loading = true;

      if (this.file.src.length == 0) {
        this.file.loading = false;
        return;
      }
      // reset canvas preview (overlay)
      this.canvasPreview.refresh = true;
      this.saveSettingsToHistory();

      this.canvasContainer = this.$refs.previewCanvasComponent.$refs.previewCanvas; // get the div all the canvases are in
      // TODO: don't re-draw all the canvases, just the one we want
      this.canvasContainer.innerHTML = ""; // remove all canvases before adding the new ones
      this.elements.forEach((element, index) => {
        let canvas = document.createElement("CANVAS"); // create a new canvas element
        this.canvases[index] = { // add the canvas to the canvases array
          "context": null,
          "canvas": canvas
        };
        this.canvasContainer.appendChild(this.canvases[index].canvas); // add the canvas to the dom
        this.canvases[index].canvas.setAttribute("data-index", index); // add an index to the canvas itself, just so we can always identify it
        this.canvases[index].canvas.style.zIndex = `${index}`; // add the right z-index
        this.canvases[index].canvas.width = this.computedSvgWidth; // set the width of the canvas
        this.canvases[index].canvas.height = this.computedSvgHeight; // set the height of the canvas
        // make sure we get the right context by getting it after we have added it to the array and the dom
        this.canvases[index].context = this.canvases[index].canvas.getContext("2d");
        // saves the current state of the canvas (default state)
        this.canvases[index].context.save();

        // start drawing the canvas elements
        switch (element.name) {
          case "waveform":
            this.drawWaveformElement(index);
            break;
          case "background":
            this.drawBackgroundElement(index);
            break;
          case "detail":
            this.drawDetailElement(index);
            break;
          case "title":
            this.drawTitleElement(index);
            break;
        }

        // restores the default context of the canvas
        this.canvases[index].context.restore();
      });

      this.file.loading = false;
    },
    drawBackgroundElement(index) {
      this.saveAndRestore(index);

      // draw one of the backgrounds
      switch (this.elements[index].function) {
        case "linear gradient":
          this.createLinearGradient(index); // create the gradient
          this.setElementStyle(index);
          this.drawElement(index);
          break;
        case "radial gradient":
          this.createRadialGradient(index); // create the gradient
          this.setElementStyle(index);
          this.drawElement(index);
          break;
        case "fill":
          this.setElementStyle(index);
          this.drawElement(index);
          break;
      }
    },
    drawDetailElement(index) {
      this.saveAndRestore(index);

      // draw one of the details
      switch (this.elements[index].function) {
        case "repeating shapes":
          this.repeatingShapesDetail(index);
          break;
        case "mandala":
          this.mandalaDetail(index);
          break;
        case "shape":
          this.shapeDetail(index);
          break;
      }
    },
    drawWaveformElement(index) {
      this.saveAndRestore(index);

      // draw the waveform
      switch (this.elements[index].function) {
        case "default":
          this.drawDefaultWaveform(index);
          break;
        case "bars":
          this.drawBarsWaveform(index);
          break;
        case "line of circles":
          this.drawLineOfCirclesWaveform(index);
          break;
        case "line of half circles":
          this.drawLineOfHalfCirclesWaveform(index);
          break;
        case "circles":
          this.drawCirclesWaveform(index);
          break;
      }
    },
    drawTitleElement(index) {
      this.saveAndRestore(index);

      // draw the title
      this.drawTitle(index);
    },
    // CANVAS DRAWING METHODS END

    // INPUT HANDLERS START
    // Handles the audio file input.
    onAudioFileInput(event) {
      if (event.target.files.length > 0) {
        this.file.loading = true;
        this.file.data = event.target.files[0];
        let temporaryFileName = this.file.data.name;
        let indexOfDotInFileName = temporaryFileName.lastIndexOf(".");
        this.file.name = temporaryFileName.substring(0, indexOfDotInFileName);
        
        this.addTextToTitleElements();

        this.file.src = URL.createObjectURL(this.file.data);
        this.file.wasSet = true;
        this.setUpAudioParser();
      }
    }
    // INPUT HANDLERS END
  }
};
