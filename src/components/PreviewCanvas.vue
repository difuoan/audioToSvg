<template>
  <div class="previewCanvas">
    <!-- TITLE START -->
    <span v-if="title == true">
      <font-awesome-icon icon="eye" class="mr-2 d-inline" />
      <h5 class="mb-3 d-inline-block">
        <u>Poster preview</u>
      </h5>
    </span>
    <!-- TITLE END -->
    <!-- PREVIEW WRAPPER START -->
    <div
      :title="previewWrapperTitle"
      :class="previewWrapperClass"
      @click="openCanvasPreviewModal"
    >
      <div
        class="previewCanvasWrapper border rounded mb-3"
        ref="previewCanvas"
      >
        <!-- CANVAS PLACEHOLDER START -->
        <canvas
          :width="$parent.computedSvgWidth"
          :height="$parent.computedSvgHeight"
        ></canvas>
        <!-- CANVAS PLACEHOLDER END -->
      </div>
      <!-- CANVAS OVERLAY START -->
      <div id="canvasOverlay" v-if="displayCanvasOverlay">
        <LoadingSpinner v-if="$parent.file.loading" />
        <!-- NO FILE SELECTED PARAGRAPH START -->
        <p
          v-if="!$parent.file.wasSet"
          class="vertical-center horizontal-center text-muted"
        >
          <span class="mr-2">Select an audio file to start</span>
          <font-awesome-icon icon="arrow-right" />
        </p>
        <!-- NO FILE SELECTED PARAGRAPH END -->
      </div>
      <!-- CANVAS OVERLAY END -->
      <!-- ADDITIONAL INFORMATION PARAGRAPH START -->
      <div v-if="$parent.file.wasSet">
        <p class="m-0 mb-2 line-height-1">
          <small class="m-0 text-secondary">
            <font-awesome-icon icon="info-circle" />
            Click here or on the preview to load a bigger more detailed preview.
          </small>
        </p>
        <p class="m-0 line-height-1">
          <small class="m-0 text-secondary">
            <font-awesome-icon icon="info-circle" />
            The actual result will look slightly different due to the color- and
            <sup>pixel</sup>/<sub>inch</sub>-conversion from screen to print.
          </small>
        </p>
      </div>
      <!-- ADDITIONAL INFORMATION PARAGRAPH END -->
    </div>
    <!-- PREVIEW WRAPPER END -->
    <!-- CANVAS PREVIEW START -->
    <div
      v-if="$parent.canvasPreview.open"
      class="cursor-zoom-out"
      @click="closePreviewCanvas"
      id="imagePreviewModal"
    >
      <div class="modal-dialog">
        <div class="modal-content overflow-hidden">
          <LoadingSpinner v-if="$parent.canvasPreview.loading" />
          <img v-else :src="$parent.canvasPreview.image" alt="image preview" />
        </div>
      </div>
    </div>
    <!-- CANVAS PREVIEW END -->
  </div>
</template>

<script>
export default {
  name: "PreviewCanvas",

  props: {
    title: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  computed: {
    displayCanvasOverlay() {
      if (this.$parent.file.loading) {
        return true;
      }
      if (!this.$parent.file.wasSet) {
        return true;
      }
      return false;
    },
    previewWrapperClass() {
      if (
        this.$parent.file.src.length != 0 &&
        !this.$parent.file.loading &&
        this.$parent.file.wasSet
      ) {
        return "cursor-zoom-in";
      }
      if (!this.$parent.file.wasSet) {
        return "cursor-pointer";
      }
      return "";
    },
    previewWrapperTitle() {
      if (
        this.$parent.file.src.length != 0 &&
        !this.$parent.file.loading &&
        this.$parent.file.wasSet
      ) {
        return "Click for a bigger more detailed preview.";
      }
      if (!this.$parent.file.wasSet) {
        return "Click to select an audio file.";
      }
      return "";
    }
  },

  methods: {
    closePreviewCanvas() {
      this.$parent.canvasPreview.open = false;
      document.body.classList.remove("scrollingDisabled");
    },
    openCanvasPreviewModal() {
      if (
        this.$parent.file.src.length != 0 &&
        !this.$parent.file.loading &&
        this.$parent.file.wasSet
      ) {
        document.body.classList.add("scrollingDisabled");
        this.$parent.canvasPreview.loading = true;
        this.$parent.canvasPreview.open = true;
        this.refreshCanvasPreview();
      }
      if (!this.$parent.file.wasSet) {
        this.$parent.file.loading = false;
        this.$parent.$refs.settings.$refs.requiredSettings.$refs.fileInputComponent.$refs.fileInput.click();
        return;
      }
      return;
    },
    refreshCanvasPreview() {
      if (this.$parent.canvasPreview.refresh) {
        let canvasData = this.$parent.audioParser.getCanvasData();
        this.$parent.canvasPreview.image = canvasData;
        this.refreshingDone();
      } else {
        this.refreshingDone();
      }
    },
    refreshingDone() {
      this.$parent.canvasPreview.refresh = false;
      this.$parent.canvasPreview.loading = false;
    }
  }
};
</script>

<style lang="scss">
.previewCanvas {
  #previewCanvas {
    width: 100%;
    height: auto;
    display: block;
  }
  .previewCanvasWrapper {
    position: relative;
    overflow: hidden;

    canvas {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: auto;
      display: block;
    }
    canvas:first-of-type {
      position: relative;
    }
    #canvasOverlay {
      position: absolute; /* Sit on top of the page content */
      width: 100%; /* Full width (cover the whole page) */
      height: 100%; /* Full height (cover the whole page) */
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: white; /* Black background with opacity */
      z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    }
  }
  #imagePreviewModal {
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    overflow-y: auto;

    img {
      width: 100%;
      height: auto;
    }
    .modal-content {
      min-height: 6rem;
    }
  }
}
</style>
