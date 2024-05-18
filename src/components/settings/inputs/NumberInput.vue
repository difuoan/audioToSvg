<template>
  <div class="numberInput">
    <div :title="title">
      <div class="input-group">
        <!-- NUMBER INPUT LABEL START -->
        <div class="input-group-prepend mr-3">
          <slot name="default">
            <label class="m-0">Range</label>
          </slot>
        </div>
        <!-- NUMBER INPUT LABEL END -->
        <!-- NUMBER INPUT CONTENT START -->
        <input
          v-model="usedValue"
          type="range"
          :min="min"
          :max="max"
          :step="step"
          class="form-control form-control-sm cursor-pointer rounded"
          @input="executeInputEventFunction($event)"
        />
        <div class="input-group-append ml-3">
          <input
            v-model="usedValue"
            type="number"
            :min="min"
            :max="max"
            :step="step"
            class="form-control form-control-sm"
            @change="executeInputEventFunction($event)"
          />
        </div>
        <!-- NUMBER INPUT CONTENT END -->
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: "NumberInput",

  data() {
    return {
      usedValue: Number(this.value)
    };
  },

  props: {
    value: {
      type: Number,
      required: true
    },
    inputEventFunction: {
      type: Function,
      required: false,
      default: () => {}
    },
    min: {
      type: Number,
      required: false,
      default() {
        return 0;
      }
    },
    max: {
      type: Number,
      required: false,
      default() {
        return 1;
      }
    },
    step: {
      type: Number,
      required: false,
      default() {
        return 1;
      }
    },
    title: {
      type: String,
      required: true
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
      this.usedValue = Number(event.target.value);
      this.$emit("update:value", Number(event.target.value));
      this.inputEventFunction(event);
    }, 10)
  }
};
</script>
