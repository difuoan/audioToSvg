export default {
  computed: {
    // The text of the button of the audio input field.
    computedAudioInputButtonText() {
      if (this.file.name == null) {
        return "Choose";
      }
      return "Change";
    },
    // The class representing the color of the text displayed in the aduio file input field.
    computedFileNameColorClass() {
      if (this.file.name == null) {
        return "text-muted";
      }
      return "";
    },
    // The file-name of the given audio file or the default value.
    computedFileName() {
      if (this.file.name == null) {
        return "No file selected.";
      }
      return this.file.name;
    },
    // The width of the viewBox of the posterSvg.
    computedSvgWidth() {
      return 1000 * this.svgFormat.x;
    },
    // The width of the viewBox of the posterSvg.
    computedSvgHeight() {
      return 1000 * this.svgFormat.y;
    }
  }
};
