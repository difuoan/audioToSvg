<template>
  <div class="audioToSvg">
    <!-- ROW START -->
    <div class="row">
      <!-- COL START -->
      <div class="col-12 col-md-6">
        <!-- SVG PREVIEW END-->
        <PreviewCanvas class="sticky-top" ref="previewCanvasComponent" />
      </div>
      <!-- COL END -->
      <!-- COL START -->
      <div class="col-12 d-block d-md-none pb-3"></div>
      <!-- COL END -->
      <!-- COL START -->
      <div class="col-12 col-md-6">
        <!-- SVG SETTINGS START -->
        <Settings ref="settings" />
        <!-- SVG SETTINGS END-->
      </div>
      <!-- COL END -->
    </div>
    <!-- ROW END -->
  </div>
</template>

<script>
// The component that displays the preview of the poster.
import PreviewCanvas from "@/components/PreviewCanvas.vue";
// The component that allows the configuration of the poster.
import Settings from "@/components/Settings.vue";

// Import the data from json.
import data from "@/mixins/data.js";

// Import the methods from mixin.
import methods from "@/mixins/methods.js";

export default {
  name: "AudiToSvg",

  components: {
    PreviewCanvas,
    Settings
  },

  mixins: [
    data,
    methods
  ],

  created() {
    this.loadPredefinedSettings();
  }
};
</script>

<style lang="scss">
// BOOTSTRAP VARIABLES IMPORT
@import "~bootstrap/scss/functions", "~bootstrap/scss/variables";
// BOOTSTRAP VARIABLES IMPORT END

// LOCAL SCOPE
.audioToSvg {
  // AUDIO INPUT CLASSES
  #audioInput {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  #audioInput:focus + label {
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
  }
  #audioInput + label * {
    pointer-events: none;
  }
  // AUDIO INPUT CLASSES END
}
// LOCAL SCOPE END
</style>
