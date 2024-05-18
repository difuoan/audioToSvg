<template>
  <div class="repeatingShapesDetailSettings">
    <Group
      icon="eye"
      title="Appearance"
      uniqueId="repeatingShapesDetailSettingsAppearance"
      :showSettingsInitially="true"
    >
      <!-- SHAPE MODE SELECT START -->
      <Select
        :value.sync="firstParent.elements[index].repeatingShapes.shapeMode"
        :options="firstParent.json.shapeModes"
        :inputEventFunction="firstParent.drawCanvas"
        title="Select the shape mode you prefer."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Shape Mode</label>
        </template>
      </Select>
      <!-- SHAPE MODE END -->
      <!-- SHAPE SELECT START -->
      <Select
        v-if="firstParent.elements[index].repeatingShapes.shapeMode == 'single'"
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
      <!-- SIZE MODE SELECT START -->
      <Select
        v-if="firstParent.elements[index].repeatingShapes.shapeMode != 'single'"
        :value.sync="firstParent.elements[index].repeatingShapes.sizeMode"
        :options="firstParent.json.sizeModes"
        :inputEventFunction="firstParent.drawCanvas"
        title="Select how the size of the shape will be calculated."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Size Mode</label>
        </template>
      </Select>
      <!-- SIZE MODE SELECT END -->
      <!-- SELECT SHAPE START -->
      <div
        v-if="firstParent.elements[index].repeatingShapes.shapeMode == 'select shapes'"
        class="row"
      >
        <div class="col col-8">
          <!-- SELECT SHAPE SELECT START -->
          <Select
            :value.sync="firstParent.elements[index].repeatingShapes.shape"
            :options="firstParent.json.shapes"
            title="Select the shape you want to add to the selection of shapes to draw."
            class="mb-3"
          >
            <template v-slot:default>
              <label class="m-0">Select Shape</label>
            </template>
          </Select>
          <!-- SELECT SHAPE MODE END -->
        </div>
        <div class="col pl-0">
          <!-- ADD SELECTED SHAPE BUTTON START -->
          <ToggleButton
            text="+"
            title="Add the selected shape."
            :clickEventFunction="() => {
              firstParent.addShapeToSelectedShapes(index);
            }"
            :inputEventFunction="firstParent.drawCanvas"
            class="mb-3"
          />
          <!-- ADD SELECTED SHAPE BUTTON END -->
        </div>
        <div
          v-if="
            firstParent.elements[index].repeatingShapes.selectedShapes.includes(
              firstParent.elements[index].repeatingShapes.shape
            )
            && firstParent.elements[index].repeatingShapes.selectedShapes.length > 1
          "
          class="col pl-0"
        >
          <!-- REMOVE SELECTED SHAPE BUTTON START -->
          <ToggleButton
            text="-"
            title="Remove the selected shape."
            :clickEventFunction="() => {
              firstParent.removeShapeFromSelectedShapes(index);
            }"
            :inputEventFunction="firstParent.drawCanvas"
            class="mb-3"
          />
          <!-- REMOVE SELECTED SHAPE BUTTON END -->
        </div>
        <div class="col-12 mb-3">
          <!-- COUNT SELECTED ELEMENTS START -->
          <span>Selected Shapes:&nbsp;</span>
          <span
            v-for="(shape, shapeIndex) in firstParent.elements[index].repeatingShapes.selectedShapes"
            :key="`selectedShape_count_${shape}_${shapeIndex}`"
          >
            <span v-if="shapeIsFirstInSelectedShapes(shape, shapeIndex) == true">
              <span>{{shape}}</span>
              <span>&nbsp;&times;&nbsp;</span>
              <span>{{countShapesInSelectedShapes(shape)}}</span>
              <span
                v-if="thereIsAnotherUniqueElementInSelectedShapes(shape) == true"
              >,&nbsp;</span>
              <!-- TODO: ADD MIN- AND MAX-SIZE TO SETTINGS OF REPEATING SHAPES, DISPLAY AND USE THEM WHEN USING SIZE-MODE "RANDOM" AND ALSO DISABLE THE REGULAR SIZE-INPUT WHILE USING RANDOM SIZE-MODE -->
              <!-- TODO: INTEGRADE PWINTY AS PRINT API (https://www.pwinty.com/api/) -->
            </span>
          </span>
          <!-- COUNT SELECTED ELEMENTS END -->
        </div>
      </div>
      <!-- SELECT SHAPE END -->
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
      <!-- SPACE X NUMBER INPUT START -->
      <NumberInput
        :min="
          ((firstParent.elements[index].repeatingShapes.sizeX + firstParent.elements[index].repeatingShapes.sizeY) / 2)
          + ((firstParent.elements[index].repeatingShapes.sizeX + firstParent.elements[index].repeatingShapes.sizeY) / 2) / 2
        "
        :step="1"
        :max="100"
        :value.sync="firstParent.elements[index].repeatingShapes.spaceX"
        :inputEventFunction="firstParent.drawCanvas"
        title="Play with this value until you like the result."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Space X</label>
        </template>
      </NumberInput>
      <!-- SPACE X NUMBER INPUT END -->
      <!-- SPACE Y NUMBER INPUT START -->
      <NumberInput
        :min="
          ((firstParent.elements[index].repeatingShapes.sizeX + firstParent.elements[index].repeatingShapes.sizeY) / 2)
          + ((firstParent.elements[index].repeatingShapes.sizeX + firstParent.elements[index].repeatingShapes.sizeY) / 2) / 2
        "
        :step="1"
        :max="100"
        :value.sync="firstParent.elements[index].repeatingShapes.spaceY"
        :inputEventFunction="firstParent.drawCanvas"
        title="Play with this value until you like the result."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Space Y</label>
        </template>
      </NumberInput>
      <!-- SPACE Y NUMBER INPUT END -->
      <!-- SIZE X NUMBER INPUT START -->
      <NumberInput
        :min="10"
        :step="1"
        :max="50"
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
        :max="50"
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
      <NumberInput
        v-if="
          firstParent.elements[index].repeatingShapes.shape != 'circle'
          || firstParent.elements[index].repeatingShapes.shapeMode != 'single'
        "
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
          || firstParent.elements[index].repeatingShapes.shapeMode != 'single'
        "
        :min="0.1"
        :step="0.1"
        :max="50"
        :value.sync="firstParent.elements[index].lineWidth"
        :inputEventFunction="firstParent.drawCanvas"
        title="The line width of the repeating shapes."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Stroke Width</label>
        </template>
      </NumberInput>
      <!-- LINE WIDTH NUMBER INPUT END -->
      <!-- OFFSET X NUMBER INPUT START -->
      <NumberInput
        :min="0"
        :step="1"
        :max="50"
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
        :min="0"
        :step="1"
        :max="50"
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
        :unique-id="`repeatingShapesLinearGradientInput${index}`"
        :target="firstParent.elements[index]"
        :first-parent="firstParent"
      />
      <!-- LINEAR GRADIENT SETTINGS END -->
      <!-- RADIAL GRADIENT SETTINGS START -->
      <RadialGradientInput
        v-if="firstParent.elements[index].fillStyle == 'radial gradient'"
        :unique-id="`repeatingShapesRadialGradientInput${index}`"
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
import ToggleButton from "@/components/settings/inputs/ToggleButton.vue";

export default {
  name: "RepeatingShapesDetailSettings",

  components: {
    NumberInput,
    Group,
    LinearGradientInput,
    RadialGradientInput,
    ColorInput,
    Select,
    ToggleButton
  },

  data() {
    return {
      inShapeDisplay: []
    };
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
  },

  methods: {
    countShapesInSelectedShapes(shape) {
      return this.firstParent.elements[this.index].repeatingShapes.selectedShapes.filter(
        (possibleShape) => {
          return possibleShape == shape;
        }
      ).length;
    },
    shapeIsFirstInSelectedShapes(shape, currentShapeIndex) {
      let firstShapeIndex = this.firstParent.elements[this.index].repeatingShapes.selectedShapes.indexOf(shape);
      if (firstShapeIndex == currentShapeIndex) {
        return true;
      }
      return false;
    },
    thereIsAnotherUniqueElementInSelectedShapes(shape) {
      let uniqueShapes = this.firstParent.elements[this.index].repeatingShapes.selectedShapes.filter((v, i, a) => a.indexOf(v) === i);
      return uniqueShapes.length - 1 > uniqueShapes.indexOf(shape);
    }
  }
};
</script>
