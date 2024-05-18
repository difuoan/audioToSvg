export default {
  methods: {
    // SHAPE DRAWING FUNCTIONS START
    shapeDetail(index) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      this.setElementStyle(index);
      switch (element.repeatingShapes.shape) {
        case "circle":
          this.circleDrawingFunction(
            index,
            0,
            0,
            element.repeatingShapes.sizeX,
            element.repeatingShapes.sizeY,
            element.repeatingShapes.spaceX,
            element.repeatingShapes.spaceY
          );
          break;
        case "square in square":
          this.squareInSquareDrawingFunction(
            index,
            0,
            0,
            element.repeatingShapes.sizeX,
            element.repeatingShapes.sizeY,
            element.repeatingShapes.spaceX,
            element.repeatingShapes.spaceY
          );
          break;
        case "triangle":
          this.triangleDrawingFunction(
            index,
            0,
            0,
            element.repeatingShapes.sizeX,
            element.repeatingShapes.sizeY,
            element.repeatingShapes.spaceX,
            element.repeatingShapes.spaceY
          );
          break;
        case "smiley":
          this.smileyDrawingFunction(
            index,
            0,
            0,
            element.repeatingShapes.sizeX,
            element.repeatingShapes.sizeY,
            element.repeatingShapes.spaceX,
            element.repeatingShapes.spaceY
          );
          break;
        case "heart":
          this.heartDrawingFunction(
            index,
            0,
            0,
            element.repeatingShapes.sizeX,
            element.repeatingShapes.sizeY,
            element.repeatingShapes.spaceX,
            element.repeatingShapes.spaceY
          );
          break;
        default:
          this.squareDrawingFunction(
            index,
            0,
            0,
            element.repeatingShapes.sizeX,
            element.repeatingShapes.sizeY,
            element.repeatingShapes.spaceX,
            element.repeatingShapes.spaceY
          );
          break;
      }
    },
    repeatingShapesDetail(index) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      let canvas = this.canvases[index].canvas; // just shorten the code by saving this in a tmp-var (let)
      // some detail related variables
      let detailStepX = canvas.width / element.repeatingShapes.spaceX;
      let detailStepY = canvas.height / element.repeatingShapes.spaceY;
      element.frequency = Math.ceil(Math.max(detailStepX, detailStepY) / 2); // set the frequency based on the number of steps we have to take at the most to draw the elements horizontally as well as vertically
      this.calculatePeaks(index); // calculate the current peaks for this repeating-shapes element
      this.setElementStyle(index);
      // draw the detail
      for (let indexX = 0; indexX < detailStepX; indexX++) {
        for (let indexY = 0; indexY < detailStepY; indexY++) {
           // TODO: REMOVE THE DEFAULT-SHAPE-MODE AND ADD A PATTERN_DRAWING FUNCTION INSTEAD THAT USES OFFSCREEN CANVASES TO DRAW ONLY ONE ELEMENT AND THEN REPEAT THAT ELEMENT OVER THE CANVAS (https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createPattern)
          if (element.repeatingShapes.shapeMode == 'random') { // set the shape to a random one if the user has set the shapeMode to random
            element.repeatingShapes.shape = this.json.shapes[
              Math.floor(Math.random() * this.json.shapes.length)
            ]
          }
          if (element.repeatingShapes.shapeMode == 'select shapes') { // set the shape to one of the selected shapes if the user has set the shapeMode to "select shapes"
            element.repeatingShapes.shape = element.repeatingShapes.selectedShapes[
              Math.floor(Math.random() * element.repeatingShapes.selectedShapes.length)
            ]
          }
          let sizeX = 0;
          let sizeY = 0;
          let spaceX = 0; // TODO: ADD A SPACE-MODE SIMILAR TO THE SIZE-MODE BUT FOR THE SPACE-X AND SPACE-Y
          let spaceY = 0;
          switch (element.repeatingShapes.sizeMode) {
            case "default":
              sizeX = element.repeatingShapes.sizeX;
              sizeY = element.repeatingShapes.sizeY;
              break;
            case "max peaks":
              sizeX = Math.abs(element.peaks[Math.ceil(Math.max(indexX, indexY))] * element.repeatingShapes.sizeX);
              sizeY = Math.abs(element.peaks[Math.ceil(Math.max(indexX, indexY))] * element.repeatingShapes.sizeY); // TODO: ADD A FEATURE TO THE TITLE-ELEMENT TO DRAW THE TITLE BASED ON THE PEAKS (do things like adjust the size of each letter and so forth)
              spaceX = element.repeatingShapes.spaceX;
              spaceY = element.repeatingShapes.spaceY;
              break;
            case "min peaks":
              sizeX = Math.abs(element.peaks[Math.ceil(Math.min(indexX, indexY))] * element.repeatingShapes.sizeX);
              sizeY = Math.abs(element.peaks[Math.ceil(Math.min(indexX, indexY))] * element.repeatingShapes.sizeY);
              spaceX = element.repeatingShapes.spaceX;
              spaceY = element.repeatingShapes.spaceY;
              break;
            case "peak":
              if (element.repeatingShapes.peakIndex >= element.frequency) {
                element.repeatingShapes.peakIndex = 0;
              }
              sizeX = Math.abs(element.peaks[element.repeatingShapes.peakIndex] * element.repeatingShapes.sizeX);
              sizeY = Math.abs(element.peaks[element.repeatingShapes.peakIndex] * element.repeatingShapes.sizeY);
              element.repeatingShapes.peakIndex++;
              spaceX = element.repeatingShapes.spaceX;
              spaceY = element.repeatingShapes.spaceY;
              break;
            case "peaks":
              sizeX = Math.abs(element.peaks[indexX] * element.repeatingShapes.sizeX);
              sizeY = Math.abs(element.peaks[indexY] * element.repeatingShapes.sizeY);
              spaceX = element.repeatingShapes.spaceX;
              spaceY = element.repeatingShapes.spaceY;
              break;
            case "random":
              sizeX = Math.floor((Math.random() * element.repeatingShapes.sizeX) + 1);
              sizeY = Math.floor((Math.random() * element.repeatingShapes.sizeY) + 1);
              spaceX = element.repeatingShapes.spaceX;
              spaceY = element.repeatingShapes.spaceY;
              break;
            default: // same as "default" (see above)
              sizeX = element.repeatingShapes.sizeX;
              sizeY = element.repeatingShapes.sizeY;
              spaceX = element.repeatingShapes.spaceX;
              spaceY = element.repeatingShapes.spaceY;
              break;
          }
          switch (element.repeatingShapes.shape) {
            case "circle":
              this.circleDrawingFunction(index, indexX, indexY, sizeX, sizeY, spaceX, spaceY);
              break;
            case "square in square":
              this.squareInSquareDrawingFunction(index, indexX, indexY, sizeX, sizeY, spaceX, spaceY);
              break;
            case "triangle":
              this.triangleDrawingFunction(index, indexX, indexY, sizeX, sizeY, spaceX, spaceY);
              break;
            case "smiley":
              this.smileyDrawingFunction(index, indexX, indexY, sizeX, sizeY, spaceX, spaceY);
              break;
            case "heart":
              this.heartDrawingFunction(index, indexX, indexY, sizeX, sizeY, spaceX, spaceY);
              break;
            default:
              this.squareDrawingFunction(index, indexX, indexY, sizeX, sizeY, spaceX, spaceY);
              break;
          }
        }
      }
    },
    // SHAPE DRAWING FUNCTIONS END

    // MANDALA START
    mandalaDetail(index) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      let context = this.canvases[index].context; // just shorten the code by saving this in a tmp-var (let)
      let canvas = this.canvases[index].canvas; // just shorten the code by saving this in a tmp-var (let)
      this.rotateElement( // rotate the canvas
        this.computedSvgWidth / 2,
        this.computedSvgHeight / 2,
        index
      );
      // some variables needed later
      let points = new Array(element.mandala.points * 2);
      let x = 0;
      let y = 0;
      let angle = 0;
      let mandalaSize = element.mandala.size * (canvas.width / 2);
      let mandalaWidth = canvas.width / 2;
      let mandalaHeight = canvas.height / 2;

      // start a new path
      context.beginPath();
      this.setElementStyle(index);

      // calculate each point in the mandala
      for (let i = 0; i <= element.mandala.points - 1; i++) {
        angle = (i * 2 * Math.PI) / element.mandala.points - Math.PI / 2;
        // the X and Y coordinates of each mandala-point
        x = mandalaWidth + mandalaSize * Math.cos(angle);
        y = mandalaHeight + mandalaSize * Math.sin(angle);
        // create the path / lines
        for (var z = 0, zEnd = i * 2 + 2; z < zEnd; z += 2) {
          context.moveTo(x, y);
          context.lineTo(points[z], points[z + 1]);
        }
        // saves the old X and Y positions to be used in the next iteration of this loop
        points[z] = x;
        points[z + 1] = y;
      }
      // actually draw the path
      this.drawElement(index);
    }
    // MANDALA END
  }
};
