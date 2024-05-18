<template>
  <div class="toggleButton">
    <div class="input-group">
      <!-- TOGGLE BUTTON LABEL START -->
      <div
        v-if="label != ''"
        class="input-group-prepend mr-3"
      >
        <slot name="default">
          <label class="m-0">{{ label }}</label>
        </slot>
      </div>
      <!-- TOGGLE BUTTON LABEL END -->
      <!-- TOGGLE BUTTON START -->
      <button
        :title="title"
        @click="executeInputEventFunction"
        :class="computedClass"
      >
        <span>{{ text }}</span>
      </button>
      <!-- TOGGLE BUTTON END -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ToggleButton",

  props: {
    buttonClass: {
      type: String,
      default() {
        return "";
      }
    },
    text: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default() {
        return "";
      }
    },
    title: {
      type: String,
      required: true
    },
    clickEventFunction: {
      type: Function,
      required: true
    },
    inputEventFunction: {
      type: Function,
      required: true
    }
  },

  computed: {
    computedClass() {
      return `form-control form-control-sm rounded-left py-0 px-3 btn btn-sm btn-outline-secondary ${
        this.buttonClass
      }`;
    }
  },

  methods: {
    executeInputEventFunction() {
      this.clickEventFunction();
      this.inputEventFunction();
    }
  }
};
</script>
