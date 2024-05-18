<template>
  <div class="select">
    <div :title="title">
      <div class="input-group">
        <!-- SELECT LABEL LEFT START -->
        <div
          v-if="titleAlignment == 'left'"
          class="input-group-prepend mr-3"
        >
          <slot name="default">
            <label class="m-0">Select</label>
          </slot>
        </div>
        <!-- SELECT LABEL LEFT END -->
        <!-- SELECT CONTENT START -->
        <select
          v-model="usedValue"
          class="form-control form-control-sm rounded-left cursor-pointer rounded"
          @input="executeInputEventFunction($event)"
        >
          <option
            v-for="(option, index) in options"
            :key="`${value}-SelectOption-${index}`"
            :value="option"
          >
            <slot name="option" :option="option">{{ option }}</slot>
          </option>
        </select>
        <!-- SELECT CONTENT END -->
        <!-- SELECT LABEL RIGHT START -->
        <div
          v-if="titleAlignment == 'right'"
          class="input-group-prepend ml-3"
        >
          <slot name="default">
            <label class="m-0">Select</label>
          </slot>
        </div>
        <!-- SELECT LABEL RIGHT END -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Select",

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
    titleAlignment: {
      type: String,
      required: false,
      default: () => {
        return "left";
      }
    },
    value: {
      type: undefined,
      required: true
    },
    options: {
      type: Array,
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
    executeInputEventFunction(event) {
      this.$emit("update:value", this.options[event.target.selectedIndex]);
      this.inputEventFunction(event);
    }
  }
};
</script>
