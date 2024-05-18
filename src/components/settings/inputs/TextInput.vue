<template>
  <div class="textInput">
    <div :title="title">
      <div class="input-group">
        <!-- TEXT INPUT LABEL START -->
        <div class="input-group-prepend mr-3">
          <slot name="default">
            <label class="m-0">Text</label>
          </slot>
        </div>
        <!-- TEXT INPUT LABEL END -->
        <!-- TEXT INPUT CONTENT START -->
        <input
          :placeholder="placeholder"
          v-model="usedValue"
          class="form-control form-control-sm rounded-left"
          type="text"
          @input="executeInputEventFunction($event)"
        />
        <!-- TEXT INPUT CONTENT END -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextInput",

  data() {
    return {
      usedValue: this.value
    };
  },

  props: {
    value: {
      type: String,
      required: true
    },
    inputEventFunction: {
      type: Function,
      required: false,
      default: () => {}
    },
    title: {
      type: String,
      required: true
    },
    placeholder: {
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
    executeInputEventFunction(event) {
      this.usedValue = event.target.value;
      this.$emit("update:value", event.target.value);
      this.inputEventFunction(event);
    }
  }
};
</script>
