export default {
  methods: {
    drawTitle(index) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      this.rotateElement( // rotate the canvas
        element.offset.x + (this.computedSvgWidth / 2),
        element.offset.y + (this.computedSvgHeight / 2) - ((4 / 10) * element.size),
        index
      );
      this.setElementStyle(index);
      this.drawElement(index);
    }
  }
};
