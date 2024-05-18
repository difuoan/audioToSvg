export default {
  methods: {
    circleDrawingFunction(index, indexX, indexY, sizeX, sizeY) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      let context = this.canvases[index].context; // just shorten the code by saving this in a tmp-var (let)
      let marginX = (indexX * element.repeatingShapes.spaceX) + element.repeatingShapes.offsetX;
      let marginY = (indexY * element.repeatingShapes.spaceY) + element.repeatingShapes.offsetY;
      this.setElementStyle(index);
      context.beginPath();
      context.ellipse( // (numberOfSteps * space + offset) + (size / 2)
        marginX + (element.repeatingShapes.sizeX / 2),
        marginY + (element.repeatingShapes.sizeY / 2),
        sizeX / 2,
        sizeY / 2,
        0,
        0,
        2 * Math.PI
      );
      this.drawElement(index);
    },
    squareInSquareDrawingFunction(index, indexX, indexY, sizeX, sizeY) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      let context = this.canvases[index].context; // just shorten the code by saving this in a tmp-var (let)
      let marginX = (indexX * element.repeatingShapes.spaceX) + element.repeatingShapes.offsetX;
      let marginY = (indexY * element.repeatingShapes.spaceY) + element.repeatingShapes.offsetY;
      this.setElementStyle(index);
      this.rotateElement( // rotate the canvas { (numberOfSteps * space + offset) + (size / 2) }
        marginX + (sizeX / 2),
        marginY + (sizeY / 2),
        index
      );
      context.lineWidth = element.lineWidth; // TODO: CHANGE "SIZE" FOR REPEATING ELEMENTS TO "ELEMENT SIZE" AND ADD AN OPTION FOR THE SIZE OF THE ENTIRE REPEATING-ELEMENTS-CANVAS
      context.strokeRect(
        marginX,
        marginY,
        sizeX,
        sizeY
      );
      context.lineWidth = element.lineWidth / 2;
      context.strokeRect(
        marginX + (sizeX * 0.25),
        marginY + (sizeY * 0.25),
        sizeX * 0.5,
        sizeY * 0.5
      );
      // context needs to be saved and restored because otherwise the rotation will be accumulated
      this.saveAndRestore(index);
    },
    squareDrawingFunction(index, indexX, indexY, sizeX, sizeY) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      let context = this.canvases[index].context; // just shorten the code by saving this in a tmp-var (let)
      let marginX = (indexX * element.repeatingShapes.spaceX) + element.repeatingShapes.offsetX;
      let marginY = (indexY * element.repeatingShapes.spaceY) + element.repeatingShapes.offsetY;
      this.setElementStyle(index);
      this.rotateElement( // rotate the canvas { (numberOfSteps * space + offset) + (size / 2) }
        marginX + (sizeX / 2),
        marginY + (sizeY / 2),
        index
      );
      this.setElementStyle(index);
      context.fillRect( // (numberOfSteps * space + offset)
        marginX,
        marginY,
        sizeX,
        sizeY
      );
      // context needs to be saved and restored because otherwise the rotation will be accumulated
      this.saveAndRestore(index);
    },
    triangleDrawingFunction(index, indexX, indexY, sizeX, sizeY) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      let context = this.canvases[index].context; // just shorten the code by saving this in a tmp-var (let)
      let marginX = (indexX * element.repeatingShapes.spaceX) + element.repeatingShapes.offsetX;
      let marginY = (indexY * element.repeatingShapes.spaceY) + element.repeatingShapes.offsetY;
      this.setElementStyle(index);
      this.rotateElement( // rotate the canvas { (numberOfSteps * space + offset) + (size / 2) }
        marginX + (sizeX / 2), // TODO: CHANGE THE REPEATING-SHAPES SO THAT THE USER CAN CHOOSE WHERE THE REPEATED-SHAPES WILL BE DRAWN (GRID-MODE) (CURRENTLY ONLY A SIMPLE GRID IS AVAILABLE, BUT WE COULD ADD SOMETHING LIKE A BEE-HIVE-GRID AND STUFF) (bee-hive, versetzt von einander, im kreis ...)
        marginY + (sizeY / 2), // TODO: ADD FUNCTIONALITY TO COLOR-GRADIENTS TO CHANGE POSITION OF COLOR-STOP IN COLOR-STOP-ARRAY (UP-/DOWN-ARROW FOR COLOR-STOPS)
        index
      );
      context.beginPath();
      context.moveTo(
        marginX,
        marginY,
      );
      context.lineTo(
        marginX,
        marginY + sizeY,
      );
      context.lineTo(
        marginX + sizeX,
        marginY + sizeY,
      );
      this.drawElement(index);
      // context needs to be saved and restored because otherwise the rotation will be accumulated
      this.saveAndRestore(index);
    },
    heartDrawingFunction(index, indexX, indexY, sizeX, sizeY) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      let context = this.canvases[index].context; // just shorten the code by saving this in a tmp-var (let)
      let marginX = (indexX * element.repeatingShapes.spaceX) + element.repeatingShapes.offsetX;
      let marginY = (indexY * element.repeatingShapes.spaceY) + element.repeatingShapes.offsetY;
      this.setElementStyle(index);
      this.rotateElement( // rotate the canvas { (numberOfSteps * space + offset) + (size / 2) }
        marginX + (sizeX / 2),
        marginY + (sizeY / 2),
        index
      );
      context.beginPath();
      context.moveTo(
        marginX,
        marginY + (sizeY / 4)
      );
      context.bezierCurveTo(
        marginX,
        marginY + (sizeY / 8),
        marginX + (sizeX / 8),
        marginY,
        marginX + (sizeX / 4),
        marginY
      );
      context.bezierCurveTo(
        marginX + ((sizeX / 8) * 3),
        marginY,
        marginX + (sizeX / 2),
        marginY + (sizeY / 8),
        marginX + (sizeX / 2),
        marginY + (sizeY / 4)
      );
      context.bezierCurveTo(
        marginX + (sizeX / 2),
        marginY + (sizeY / 8),
        marginX + ((sizeX / 8) * 5),
        marginY,
        marginX + ((sizeX / 4) * 3),
        marginY
      );
      context.bezierCurveTo(
        marginX + ((sizeX / 8) * 7),
        marginY,
        marginX + sizeX,
        marginY + (sizeY / 8),
        marginX + sizeX,
        marginY + (sizeY / 4)
      );
      context.bezierCurveTo(
        marginX + sizeX,
        marginY + (sizeY / 2),
        marginX + ((sizeX / 8) * 5),
        marginY + ((sizeY / 4) * 3),
        marginX + (sizeX / 2),
        marginY + sizeY
      );
      context.bezierCurveTo(
        marginX + ((sizeX / 8) * 3),
        marginY + ((sizeY / 4) * 3),
        marginX,
        marginY + (sizeY / 2),
        marginX,
        marginY + (sizeY / 4)
      );
      this.drawElement(index);
      // context needs to be saved and restored because otherwise the rotation will be accumulated
      this.saveAndRestore(index);
    },
    // TODO: ADD SKULL-, CIRCLE-IN-CIRCLE, CROSS-, X-, YING-YANG-, PALM-TREE-, EMOTICON- LIGHTNING-, ... -DRAWING-FUNCTIONS AND MORE
    smileyDrawingFunction(index, indexX, indexY, sizeX, sizeY) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      let context = this.canvases[index].context; // just shorten the code by saving this in a tmp-var (let)
      let marginX = (indexX * element.repeatingShapes.spaceX) + element.repeatingShapes.offsetX;
      let marginY = (indexY * element.repeatingShapes.spaceY) + element.repeatingShapes.offsetY;
      this.rotateElement( // rotate the canvas { (numberOfSteps * space + offset) + (size / 2) }
        marginX + (sizeX / 2),
        marginY + (sizeY / 2),
        index
      );
      context.lineWidth = element.lineWidth;
      this.setElementStyle(index);
      context.beginPath(); // TODO: FIND OUT WHAT HAPPENED TO THE SOFTER VERSION OF THE DEFAULT-WAVEFORM-DRAWING-FUNCTION AND RE-IMPLEMENT IT (the one that draws more of a curve than a zig-zag-line)
      context.ellipse( // Outer circle // (numberOfSteps * space + offset) + (size / 2)
        marginX + (sizeX / 2),
        marginY + (sizeY / 2),
        sizeX / 2,
        sizeY / 2,
        0,
        0,
        2 * Math.PI,
        true
      );
      context.moveTo(
        marginX + (sizeX / 2) + ((sizeX / 2) * 0.666),
        marginY + (sizeY / 2)
      );
      context.ellipse( // mouth // (numberOfSteps * space + offset) + (size / 2)
        marginX + (sizeX / 2),
        marginY + (sizeY / 2),
        (sizeX / 2) * 0.666,
        (sizeY / 2) * 0.666,
        0,
        0,
        Math.PI,
        false
      );
      context.moveTo(
        marginX + ((sizeX / 2) * 1.333) + ((sizeX / 2) * 0.15),
        marginY + ((sizeY / 2) * 0.75)
      );
      context.ellipse( // right eye // (numberOfSteps * space + offset) + (size / 2)
        marginX + ((sizeX / 2) * 1.333),
        marginY + ((sizeY / 2) * 0.75),
        (sizeX / 2) * 0.15,
        (sizeY / 2) * 0.15,
        0,
        0,
        2 * Math.PI,
        false
      );
      context.moveTo(
        marginX + ((sizeX / 2) * 0.666) + ((sizeX / 2) * 0.15),
        marginY + ((sizeY / 2) * 0.75)
      );
      context.ellipse( // left eye // (numberOfSteps * space + offset) + (size / 2)
        marginX + ((sizeX / 2) * 0.666),
        marginY + ((sizeY / 2) * 0.75),
        (sizeX / 2) * 0.15,
        (sizeY / 2) * 0.15,
        0,
        0,
        2 * Math.PI,
        false
      );
      context.stroke();
      // context needs to be saved and restored because otherwise the rotation will be accumulated
      this.saveAndRestore(index);
    }
  }
}