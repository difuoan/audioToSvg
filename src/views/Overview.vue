<template>
  <div class="overview">
    <!-- OVERVIEW START -->
    <div class="overviewWrapper row px-2">
        <div
            v-for="(setting, index) in json.predefinedSettings.slice(0, 5)"
            :key="`overviewImgWrapper_${index}`"
            class="col col-lg-4 col-md-6 col-sm-12 col-12 p-2"
        >
          <div class="card">
            <img
                v-if="setting.canvasData != null"
                :src="setting.canvasData"
                :alt="setting.name"
                class="rounded"
                @click="rerouteToProductSelection(setting)"
            />
          </div>
        </div>
    </div>
    <!-- OVERVIEW END -->
    <!-- CREATE NEW BUTTON START -->
    <button
      @click="rerouteToAudioToSvg()"
      type="button"
      class="btn btn-primary btn-lg btn-block"
    >
      <font-awesome-icon icon="plus" class="mr-2" />
      <span>create a new image</span>
    </button>
    <!-- CREATE NEW BUTTON END -->
  </div>
</template>

<script>
// Import the data from json.
import predefinedSettings from "@/mixins/predefinedSettings.js";
import routingHelpers from "@/mixins/helpers/routingHelpers.js";

export default {
  name: "Overview",

  mixins: [
    predefinedSettings,
    routingHelpers
  ]
};
</script>

<style lang="scss" scoped>
.overviewWrapper {
    div {
        &:empty {
            display: none;
        }
        img {
            width: 100%;
            height: auto;
            cursor: pointer;
        }
    }
}
</style>