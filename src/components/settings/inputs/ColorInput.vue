<template>
  <div class="colorInput">
    <div :title="title">
      <div class="input-group">
        <!-- COLOR LABEL START -->
        <div class="input-group-prepend mr-3">
          <slot name="default">
            <label class="m-0">Select</label>
          </slot>
        </div>
        <!-- COLOR LABEL END -->
        <!-- COLOR CONTENT START -->
        <input
          type="color"
          class="form-control form-control-sm rounded-left cursor-pointer"
          @input="executeInputEventFunction($event)"
          v-model="usedValue"
        />
        <!-- COLOR CONTENT END -->
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: "ColorInput",

  data() {
    return {
      usedValue: Number(this.value)
    };
  },

  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: undefined,
      required: true
    },
    inputEventFunction: {
      type: Function,
      required: false,
      default: () => {}
    }
  },

  watch: {
    value: function() {
      this.usedValue = this.value;
    }
  },

  created() {
    this.usedValue = this.value;
  },

  methods: {
    executeInputEventFunction: _.debounce(function(event) {
      this.$emit("update:value", this.usedValue);
      this.inputEventFunction(event);
    }, 10)
  }
};
</script>
