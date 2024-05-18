<template>
  <div class="group">
    <!-- SETTINGS GROUP LABEL START -->
    <h5
      :class="titleClass"
      data-toggle="collapse"
      :href="`#${uniqueId}`"
      :aria-expanded="showSettings"
      :aria-controls="uniqueId"
      :title="showSettings ? 'collapse options' : 'expand options'"
      @click="showSettings = !showSettings"
    >
      <font-awesome-icon :icon="icon" class="background-round mr-2" />
      <u>{{ title }}</u>
      <font-awesome-icon
        :icon="showSettings ? 'caret-up' : 'caret-down'"
        class="float-right text-secondary"
      />
    </h5>
    <!-- SETTINGS GROUP LABEL END -->
    <!-- SETTINGS GROUP START -->
    <div
      :id="uniqueId"
      :class="`collapse ${showSettingsInitially ? 'show' : ''}`"
    >
      <slot name="default" />
    </div>
    <!-- SETTINGS GROUP END -->
  </div>
</template>

<script>
export default {
  name: "Group",

  props: {
    title: {
      type: String,
      required: true
    },
    uniqueId: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    marginTop: {
      type: Boolean,
      default() {
        return true;
      }
    },
    showSettingsInitially: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },

  data() {
    return {
      showSettings: false
    };
  },

  computed: {
    titleClass() {
      let titleClass = "mb-3 cursor-pointer";
      if (this.marginTop) {
        titleClass += " mt-4";
      }
      if (this.showSettings) {
        titleClass += " collapsed";
      }
      return titleClass;
    }
  },

  mounted() {
    if (this.showSettingsInitially) {
      this.showSettings = true;
    } else {
      this.showSettings = false;
    }
  }
};
</script>
