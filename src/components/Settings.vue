<template>
  <div class="settings">
    <!-- TITLE START -->
    <font-awesome-icon icon="cogs" class="mr-2 d-inline" />
    <h5 class="mb-3 d-inline-block">
      <u>Settings</u>
    </h5>
    <!-- TITLE END -->
    <!-- TITLE BUTTONS START -->
    <!-- ADVANCED SETTINGS TOGGLE BUTTON START -->
    <button
      title="Toggle advanced settings"
      class="float-right btn btn-sm btn-outline-secondary"
      type="button"
      data-toggle="collapse"
      data-target="#advancedSettings"
      aria-expanded="false"
      aria-controls="advancedSettings"
      @click="$parent.showAdvancedSettings = !$parent.showAdvancedSettings"
    >
      <font-awesome-icon icon="cogs" />
    </button>
    <!-- ADVANCED SETTINGS TOGGLE BUTTON END -->
    <!-- COPY SETTINGS TO CLIPBOARD BUTTON START -->
    <button
      v-if="$parent.showAdvancedSettings == true"
      title="Copy settings to clipboard"
      class="float-right btn btn-sm btn-outline-secondary mr-2"
      @click="$parent.copySettingsToClipboard()"
    >
      <font-awesome-icon icon="clipboard" />
    </button>
    <!-- COPY SETTINGS TO CLIPBOARD BUTTON END -->
    <!-- UNDO CHANGES BUTTON START -->
    <div
      v-if="$parent.showAdvancedSettings == true"
      class="float-right"
    >
      <button
        v-if="$parent.settingHistory.length > 1"
        title="Undo changes"
        class="float-right btn btn-sm btn-outline-secondary mr-2"
        @click="$parent.undoChanges()"
      >
        <font-awesome-icon
          icon="arrow-left"
          class="d-inline-block"
        />
      </button>
      <button
        v-else
        title="Undo changes"
        class="float-right btn btn-sm btn-outline-secondary mr-2"
        @click="$parent.undoChanges()"
        disabled
      >
        <font-awesome-icon
          icon="arrow-left"
          class="d-inline-block"
        />
      </button>
    </div>
    <!-- UNDO CHANGES BUTTON END -->
    <!-- RESET SETTINGS BUTTON START -->
    <button
      v-if="$parent.showAdvancedSettings == true"
      title="Reset settings"
      class="float-right btn btn-sm btn-outline-secondary mr-2"
      @click="$parent.loadPredefinedSettings"
    >
      <font-awesome-icon
        icon="undo"
        class="d-inline-block spin-once-counterclockwise-on-hover"
      />
    </button>
    <!-- RESET SETTINGS BUTTON END -->
    <!-- TITLE BUTTONS END -->
    <div id="accordion">
      <!-- REQUIRED SETTINGS START -->
      <RequiredSettings ref="requiredSettings" />
      <!-- REQUIRED SETTINGS END -->

      <!-- ADVANCED OPTIONS COLLAPSE DIV START -->
      <AdvancedSettings id="advancedSettings" class="collapse" />
      <!-- ADVANCED OPTIONS COLLAPSE DIV END -->

      <!-- NEXT BUTTON START -->
      <button
        v-if="$parent.file.loading == false && $parent.file.wasSet == true"
        class="btn btn-sm btn-primary float-right"
        @click="$parent.rerouteToProductSelection"
      >
        <span>Select Product</span>
        <font-awesome-icon icon="arrow-alt-circle-right" class="ml-2" />
      </button>
      <button v-else class="btn btn-sm btn-primary float-right cursor-not-allowed" disabled>
        <span>Select Product</span>
        <font-awesome-icon icon="arrow-alt-circle-right" class="ml-2" />
      </button>
      <!-- NEXT BUTTON END -->
    </div>
  </div>
</template>

<script>
import RequiredSettings from "@/components/settings/RequiredSettings.vue";
import AdvancedSettings from "@/components/settings/AdvancedSettings.vue";

export default {
  name: "Settings",

  components: {
    RequiredSettings,
    AdvancedSettings
  }
};
</script>
