export default {
  methods: {
    addColorStop(target) {
      target.gradient.stops.push(0);
      target.gradient.colors.push("#808080");
      target.gradient.stopOpacity.push(1);
      this.drawCanvas();
    },
    removeColorStop(index, target) {
      target.gradient.stops.splice(index, 1);
      target.gradient.colors.splice(index, 1);
      target.gradient.stopOpacity.splice(index, 1);
      this.drawCanvas();
    },
    moveColorStopUp(index, target) {
      let elementToMove = target.gradient.stops.splice(index, 1)[0];
      target.gradient.stops.splice(index - 1, 0, elementToMove);

      elementToMove = target.gradient.colors.splice(index, 1)[0];
      target.gradient.colors.splice(index - 1, 0, elementToMove);

      elementToMove = target.gradient.stopOpacity.splice(index, 1)[0];
      target.gradient.stopOpacity.splice(index - 1, 0, elementToMove);
      this.drawCanvas();
    },
    moveColorStopDown(index, target) {
      let elementToMove = target.gradient.stops.splice(index, 1)[0];
      target.gradient.stops.splice(index + 1, 0, elementToMove);

      elementToMove = target.gradient.colors.splice(index, 1)[0];
      target.gradient.colors.splice(index + 1, 0, elementToMove);

      elementToMove = target.gradient.stopOpacity.splice(index, 1)[0];
      target.gradient.stopOpacity.splice(index + 1, 0, elementToMove);
      this.drawCanvas();
    },
    copyColorStop(index, target) {
      let elementToPush = this.deepCopy(target.gradient.stops[index]);
      target.gradient.stops.push(elementToPush);

      elementToPush = this.deepCopy(target.gradient.colors[index]);
      target.gradient.colors.push(elementToPush);

      elementToPush = this.deepCopy(target.gradient.stopOpacity[index]);
      target.gradient.stopOpacity.push(elementToPush);
      this.drawCanvas();
    },
    createRadialGradient(index) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      let context = this.canvases[index].context; // just shorten the code by saving this in a tmp-var (let)
      // create the gradient
      let gradient = context.createRadialGradient(
        element.gradient.radialGradient.x1,
        element.gradient.radialGradient.y1,
        element.gradient.radialGradient.r1,
        element.gradient.radialGradient.x2,
        element.gradient.radialGradient.y2,
        element.gradient.radialGradient.r2
      );
      this.addColorStops(gradient, index);
      context.fillStyle = gradient;
      context.strokeStyle = gradient;
    },
    createLinearGradient(index) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      let context = this.canvases[index].context; // just shorten the code by saving this in a tmp-var (let)
      // create the gradient
      let gradient = context.createLinearGradient(
        element.gradient.linearGradient.x1,
        element.gradient.linearGradient.y1,
        element.gradient.linearGradient.x2,
        element.gradient.linearGradient.y2
      );
      this.addColorStops(gradient, index);
      context.fillStyle = gradient;
      context.strokeStyle = gradient;
    },
    addColorStops(gradient, index) {
      let element = this.elements[index]; // just shorten the code by saving this in a tmp-var (let)
      for (let stopIndex = 0; stopIndex < element.gradient.colors.length; stopIndex++) {
        gradient.addColorStop(
          element.gradient.stops[stopIndex],
          this.convertToRGBA(
            element.gradient.colors[stopIndex],
            element.gradient.stopOpacity[stopIndex]
          )
        );
      }
    }
  }
};
