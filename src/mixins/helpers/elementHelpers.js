export default {
    methods: {
        addShapeToSelectedShapes(index) {
          this.elements[index].repeatingShapes.selectedShapes.push(
            this.elements[index].repeatingShapes.shape
          );
        },
        removeShapeFromSelectedShapes(index) {
          let shapeIndex = this.elements[index].repeatingShapes.selectedShapes.indexOf(
            this.elements[index].repeatingShapes.shape
          );
          if (shapeIndex > -1) {
            this.elements[index].repeatingShapes.selectedShapes.splice(shapeIndex, 1);
          }
          
        },
        getNextElementIndex() {
          if (this.nextElementIndex == null) {
            let temporaryIndex = 0;
            this.elements.forEach(element => {
              if (element.index > temporaryIndex) {
                temporaryIndex = element.index;
              }
            });
            this.nextElementIndex = temporaryIndex;
          }
          this.nextElementIndex++;
          return this.nextElementIndex;
        },
        rotateElement(elementCenterX, elementCenterY, index) {
          let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
          let context = this.canvases[index].context; // just shorten the code by saving this in a tmp-var (let)
          context.translate(elementCenterX, elementCenterY);
          context.rotate((Math.PI / 180) * element.rotation);
          context.translate(-elementCenterX, -elementCenterY);
        },
        getStepSize(index) {
          let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
          return this.computedSvgWidth / element.frequency / 2;
        },
        getSizeOffsetX(index) {
          let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
          return (this.computedSvgWidth - this.computedSvgWidth * element.size) / 2;
        },
        getStartingPointX(index) {
          let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
          return element.offset.x * element.size + this.getSizeOffsetX(index);
        },
        getStartingPointY(index) {
          let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
          return element.offset.y * element.size + this.computedSvgHeight / 2;
        },
    }
}