<template>
  <div class="fillBackgroundSettings">
    <Group
      title="Appearance"
      icon="eye"
      uniqueId="fillGradientBackgroundSettingsAppearance"
      :showSettingsInitially="true"
    >
      <!-- COLOR SELECT START -->
      <ColorInput
        :value.sync="firstParent.elements[index].color"
        :inputEventFunction="firstParent.drawCanvas"
        title="Select the color you prefer."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Color</label>
        </template>
      </ColorInput>
      <!-- COLOR SELECT END -->
      <!-- OPACITY NUMBER INPUT START -->
      <NumberInput
        :min="0"
        :step="0.01"
        :max="1"
        :value.sync="firstParent.elements[index].opacity"
        :inputEventFunction="firstParent.drawCanvas"
        title="Play with this value until you like the result."
      >
        <template v-slot:default>
          <label class="m-0">Opacity</label>
        </template>
      </NumberInput>
      <!-- OPACITY NUMBER INPUT END -->
    </Group>
  </div>
</template>

<script>
import NumberInput from "@/components/settings/inputs/NumberInput.vue";
import ColorInput from "@/components/settings/inputs/ColorInput.vue";
import Group from "@/components/settings/common/Group.vue";

export default {
  name: "FillBackgroundSettings",

  components: {
    ColorInput,
    NumberInput,
    Group
  },
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    firstParent() {
      return this.$parent.$parent.$parent.$parent.$parent;
    }
  }
};
</script>
