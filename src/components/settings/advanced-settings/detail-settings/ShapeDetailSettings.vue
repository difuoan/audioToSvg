<template>
  <div class="shapeDetailSettings">
    <Group
      icon="eye"
      title="Appearance"
      uniqueId="shapeDetailSettingsAppearance"
      :showSettingsInitially="true"
    >
      <!-- SHAPE SELECT START -->
      <Select
        :value.sync="firstParent.elements[index].repeatingShapes.shape"
        :options="firstParent.json.shapes"
        :inputEventFunction="firstParent.drawCanvas"
        title="Select the shape you prefer."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Shape</label>
        </template>
      </Select>
      <!-- SHAPE SELECT END -->
      <!-- COLOR SELECT START -->
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
      <!-- COLOR SELECT END -->
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
      <!-- SIZE X NUMBER INPUT START -->
      <NumberInput
        :min="10"
        :step="1"
        :max="Math.max(firstParent.computedSvgWidth, firstParent.computedSvgHeight)"
        :value.sync="firstParent.elements[index].repeatingShapes.sizeX"
        :inputEventFunction="firstParent.drawCanvas"
        title="Play with this value until you like the result."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Size X</label>
        </template>
      </NumberInput>
      <!-- SIZE X NUMBER INPUT END -->
      <!-- SIZE Y NUMBER INPUT START -->
      <NumberInput
        :min="10"
        :step="1"
        :max="Math.max(firstParent.computedSvgWidth, firstParent.computedSvgHeight)"
        :value.sync="firstParent.elements[index].repeatingShapes.sizeY"
        :inputEventFunction="firstParent.drawCanvas"
        title="Play with this value until you like the result."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Size Y</label>
        </template>
      </NumberInput>
      <!-- SIZE Y NUMBER INPUT END -->
      <!-- FONT ROTATION NUMBER INPUT START -->
      <!-- FONT ROTATION NUMBER INPUT START -->
      <NumberInput
        v-if="firstParent.elements[index].repeatingShapes.shape != 'circle'"
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
      <!-- LINE WIDTH NUMBER INPUT START -->
      <NumberInput
        v-if="
          firstParent.elements[index].repeatingShapes.shape == 'square in square'
          || firstParent.elements[index].repeatingShapes.shape == 'smiley'
        "
        :min="0.1"
        :step="0.1"
        :max="50"
        :value.sync="firstParent.elements[index].lineWidth"
        :inputEventFunction="firstParent.drawCanvas"
        title="The line width of the shape."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Stroke Width</label>
        </template>
      </NumberInput>
      <!-- LINE WIDTH NUMBER INPUT END -->
      <!-- OFFSET X NUMBER INPUT START -->
      <NumberInput
        :min="-((firstParent.elements[index].repeatingShapes.sizeX + firstParent.elements[index].repeatingShapes.sizeY) / 2)"
        :step="1"
        :max="firstParent.computedSvgWidth"
        :value.sync="firstParent.elements[index].repeatingShapes.offsetX"
        :inputEventFunction="firstParent.drawCanvas"
        title="Play with this value until you like the result."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Offset X</label>
        </template>
      </NumberInput>
      <!-- OFFSET X NUMBER INPUT END -->
      <!-- OFFSET Y NUMBER INPUT START -->
      <NumberInput
        :min="-((firstParent.elements[index].repeatingShapes.sizeX + firstParent.elements[index].repeatingShapes.sizeY) / 2)"
        :step="1"
        :max="firstParent.computedSvgHeight"
        :value.sync="firstParent.elements[index].repeatingShapes.offsetY"
        :inputEventFunction="firstParent.drawCanvas"
        title="Play with this value until you like the result."
      >
        <template v-slot:default>
          <label class="m-0">Offset Y</label>
        </template>
      </NumberInput>
      <!-- OFFSET Y NUMBER INPUT END -->
      <!-- LINEAR GRADIENT SETTINGS START -->
      <LinearGradientInput
        v-if="firstParent.elements[index].fillStyle == 'linear gradient'"
        :unique-id="`shapeLinearGradientInput${index}`"
        :target="firstParent.elements[index]"
        :first-parent="firstParent"
      />
      <!-- LINEAR GRADIENT SETTINGS END -->
      <!-- RADIAL GRADIENT SETTINGS START -->
      <RadialGradientInput
        v-if="firstParent.elements[index].fillStyle == 'radial gradient'"
        :unique-id="`shapeRadialGradientInput${index}`"
        :target="firstParent.elements[index]"
        :first-parent="firstParent"
      />
      <!-- RADIAL GRADIENT SETTINGS END -->
    </Group>
  </div>
</template>

<script>
import NumberInput from "@/components/settings/inputs/NumberInput.vue";
import Group from "@/components/settings/common/Group.vue";
import ColorInput from "@/components/settings/inputs/ColorInput.vue";
import LinearGradientInput from "@/components/settings/inputs/LinearGradientInput.vue";
import RadialGradientInput from "@/components/settings/inputs/RadialGradientInput.vue";
import Select from "@/components/settings/inputs/Select.vue";

export default {
  name: "ShapeDetailSettings",

  components: {
    NumberInput,
    Group,
    LinearGradientInput,
    RadialGradientInput,
    ColorInput,
    Select
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
