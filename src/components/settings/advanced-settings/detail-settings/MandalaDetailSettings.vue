<template>
  <div class="mandalaDetailSettings">
    <Group
      title="Appearance"
      icon="eye"
      uniqueId="mandalaDetailSettingsAppearance"
      :showSettingsInitially="true"
    >
      <!-- FILL STYLE SELECT START -->
      <Select
        :value.sync="firstParent.elements[index].fillStyle"
        :options="firstParent.json.fillStyles"
        :inputEventFunction="firstParent.drawCanvas"
        title="Select how the detail should be colored."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Fill Style</label>
        </template>
      </Select>
      <!-- FILL STYLE SELECT END -->
      <!-- FONT ROTATION NUMBER INPUT START -->
      <NumberInput
        :min="-180"
        :max="180"
        :value.sync="firstParent.elements[index].rotation"
        :inputEventFunction="firstParent.drawCanvas"
        title="Play with this value until you like the result."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Rotation</label>
        </template>
      </NumberInput>
      <!-- FONT ROTATION NUMBER INPUT END -->
      <!-- COLOR INPUT START -->
      <ColorInput
        v-if="firstParent.elements[index].fillStyle == 'single color'"
        :value.sync="firstParent.elements[index].color"
        :inputEventFunction="firstParent.drawCanvas"
        title="Select the color you prefer."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Color</label>
        </template>
      </ColorInput>
      <!-- COLOR INPUT END -->
      <!-- OPACITY NUMBER INPUT START -->
      <NumberInput
        :min="0"
        :step="0.01"
        :max="1"
        :value.sync="firstParent.elements[index].opacity"
        :inputEventFunction="firstParent.drawCanvas"
        title="Play with this value until you like the result."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Opacity</label>
        </template>
      </NumberInput>
      <!-- OPACITY NUMBER INPUT END -->
      <!-- POINTS NUMBER INPUT START -->
      <NumberInput
        :min="3"
        :max="100"
        :value.sync="firstParent.elements[index].mandala.points"
        :inputEventFunction="firstParent.drawCanvas"
        title="The number of points used to create the mandala."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Points</label>
        </template>
      </NumberInput>
      <!-- POINTS NUMBER INPUT END -->
      <!-- SIZE NUMBER INPUT START -->
      <NumberInput
        :min="0.1"
        :step="0.1"
        :max="3"
        :value.sync="firstParent.elements[index].mandala.size"
        :inputEventFunction="firstParent.drawCanvas"
        title="The size of the mandala."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Size</label>
        </template>
      </NumberInput>
      <!-- SIZE NUMBER INPUT END -->
      <!-- TODO: FIND OUT WHY THE OPACITY IS LOST IN THE CANVAS PREVIEW (NOT IN THE CANVAS DATA WHEN CLOSING THE DETAILED PREVIEW) -->
      <!-- WIDTH NUMBER INPUT START -->
      <NumberInput
        :min="0.1"
        :step="0.1"
        :max="50"
        :value.sync="firstParent.elements[index].lineWidth"
        :inputEventFunction="firstParent.drawCanvas"
        title="The line width of the mandala."
      >
        <template v-slot:default>
          <label class="m-0">Stroke Width</label>
        </template>
      </NumberInput>
      <!-- WIDTH NUMBER INPUT END -->
      <!-- LINEAR GRADIENT SETTINGS START -->
      <LinearGradientInput
        v-if="firstParent.elements[index].fillStyle == 'linear gradient'"
        :unique-id="`mandalaLinearGradientInput${index}`"
        :target="firstParent.elements[index]"
        :first-parent="firstParent"
      />
      <!-- LINEAR GRADIENT SETTINGS END -->
      <!-- RADIAL GRADIENT SETTINGS START -->
      <RadialGradientInput
        v-if="firstParent.elements[index].fillStyle == 'radial gradient'"
        :unique-id="`mandalaRadialGradientInput${index}`"
        :target="firstParent.elements[index]"
        :first-parent="firstParent"
      />
      <!-- RADIAL GRADIENT SETTINGS END -->
    </Group>
  </div>
</template>

<script>
import ColorInput from "@/components/settings/inputs/ColorInput.vue";
import NumberInput from "@/components/settings/inputs/NumberInput.vue";
import Select from "@/components/settings/inputs/Select.vue";
import LinearGradientInput from "@/components/settings/inputs/LinearGradientInput.vue";
import RadialGradientInput from "@/components/settings/inputs/RadialGradientInput.vue";
import Group from "@/components/settings/common/Group.vue";

export default {
  name: "MandalaDetailSettings",

  components: {
    ColorInput,
    NumberInput,
    Group,
    Select,
    LinearGradientInput,
    RadialGradientInput
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
