<template>
  <div class="radialGradientInput">
    <Group
      icon="stop-circle"
      title="Color Stops"
      :uniqueId="`${uniqueId}-radialGradientColorStops`"
      :showSettingsInitially="true"
    >
      <!-- COLOR STOPS START -->
      <div
        v-for="(stop, index) in target.gradient.colors"
        :key="`${uniqueId}-radialGradient-colorStopDiv-${index}`"
      >
        <div class="input-group mb-3">
          <!-- COLOR SELECT START -->
          <ColorInput
            :value.sync="target.gradient.colors[index]"
            :inputEventFunction="firstParent.drawCanvas"
            title="Select the color you prefer."
            class="form-control form-control-sm border-0 m-0 p-0"
          >
            <template v-slot:default>
              <label class="m-0">Color</label>
            </template>
          </ColorInput>
          <!-- COLOR SELECT END -->
          <!-- BUTTONS START -->
          <div class="input-group-append ml-3">
          <!-- COPY STOP DOWN BUTTON START -->
          <button
            title="Copy this color stop."
            class="btn btn-sm btn-sm btn-outline-secondary mr-2 rounded"
            @click="firstParent.copyColorStop(index, target)"
          >
            <font-awesome-icon icon="copy" />
          </button>
          <!-- COPY STOP DOWN BUTTON START -->
          <!-- MOVE BUTTONS START -->
          <div class="btn-group mr-2">
            <!-- MOVE COLOR STOP DOWN BUTTON START -->
            <button
              v-if="index != target.gradient.stops.length - 1"
              title="Move the color stop down."
              class="btn btn-sm btn-sm btn-outline-secondary"
              @click="firstParent.moveColorStopDown(index, target)"
            >
              <font-awesome-icon icon="arrow-down" />
            </button>
            <!-- MOVE COLOR STOP DOWN BUTTON START -->
            <!-- MOVE COLOR STOP UP BUTTON START -->
            <button
              v-if="index != 0"
              title="Move the color stop up."
              class="btn btn-sm btn-sm btn-outline-secondary"
              @click="firstParent.moveColorStopUp(index, target)"
            >
              <font-awesome-icon icon="arrow-up" />
            </button>
            <!-- MOVE COLOR STOP UP BUTTON START -->
          </div>
          <!-- MOVE BUTTONS END -->
          <!-- REMOVE COLOR STOP BUTTON START -->
            <button
              v-if="target.gradient.colors.length > 2"
              title="Remove the color stop."
              class="btn btn-sm btn-sm btn-outline-secondary rounded"
              @click="removeColorStop(index, target)"
            >
              <font-awesome-icon icon="trash" />
            </button>
          <!-- REMOVE COLOR STOP BUTTON START -->
          </div>
          <!-- BUTTONS END -->
        </div>
        <!-- STOP POSITION START -->
        <NumberInput
          :min="0"
          :step="0.01"
          :max="1"
          :value.sync="target.gradient.stops[index]"
          :inputEventFunction="firstParent.drawCanvas"
          title="The position of the color on the gradient."
          class="mb-3"
        >
          <template v-slot:default>
            <label class="m-0">Position</label>
          </template>
        </NumberInput>
        <!-- STOP POSITION END -->
        <!-- STOP OPACITY START -->
        <NumberInput
          :min="0.01"
          :step="0.01"
          :max="1"
          :value.sync="target.gradient.stopOpacity[index]"
          :inputEventFunction="firstParent.drawCanvas"
          title="The opacity of the color of this stop."
        >
          <template v-slot:default>
            <label class="m-0">Opacity</label>
          </template>
        </NumberInput>
        <!-- STOP OPACITY END -->
        <hr class="my-3" />
      </div>
      <!-- COLOR STOPS END -->
      <!-- ADD COLOR STOP BUTTON START -->
      <button class="btn btn-sm btn-outline-secondary w-100" @click="firstParent.addColorStop(target)">
        <font-awesome-icon icon="plus" class="mr-2" />
        <span>Add color stop</span>
      </button>
      <!-- ADD COLOR STOP BUTTON END -->
    </Group>
    <Group
      icon="arrows-alt"
      title="Gradient Position"
      :uniqueId="`${uniqueId}-radialGradientDirectionGroup`"
    >
      <!-- STOP POSITION INNER X START -->
      <NumberInput
        :min="
          this.firstParent.computedSvgWidth > this.firstParent.computedSvgHeight
            ? -this.firstParent.computedSvgWidth
            : -this.firstParent.computedSvgHeight
        "
        :max="
          this.firstParent.computedSvgWidth > this.firstParent.computedSvgHeight
            ? this.firstParent.computedSvgWidth * 2
            : this.firstParent.computedSvgHeight * 2
        "
        :value.sync="target.gradient.radialGradient.x1"
        :inputEventFunction="firstParent.drawCanvas"
        title="The X postion of the start of the gradient."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Inner X</label>
        </template>
      </NumberInput>
      <!-- STOP POSITION INNER X END -->
      <!-- STOP POSITION INNER Y START -->
      <NumberInput
        :min="
          this.firstParent.computedSvgWidth > this.firstParent.computedSvgHeight
            ? -this.firstParent.computedSvgWidth
            : -this.firstParent.computedSvgHeight
        "
        :max="
          this.firstParent.computedSvgWidth > this.firstParent.computedSvgHeight
            ? this.firstParent.computedSvgWidth * 2
            : this.firstParent.computedSvgHeight * 2
        "
        :value.sync="target.gradient.radialGradient.y1"
        :inputEventFunction="firstParent.drawCanvas"
        title="The Y postion of the start of the gradient."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Inner Y</label>
        </template>
      </NumberInput>
      <!-- STOP POSITION INNER Y END -->
      <!-- STOP POSITION INNER R START -->
      <NumberInput
        :min="0"
        :max="
          this.firstParent.computedSvgWidth > this.firstParent.computedSvgHeight
            ? this.firstParent.computedSvgWidth
            : this.firstParent.computedSvgHeight
        "
        :value.sync="target.gradient.radialGradient.r1"
        :inputEventFunction="firstParent.drawCanvas"
        title="The radius of the start of the gradient."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Inner Radius</label>
        </template>
      </NumberInput>
      <!-- STOP POSITION INNER R END -->
      <!-- STOP POSITION OUTER X START -->
      <NumberInput
        :min="
          this.firstParent.computedSvgWidth > this.firstParent.computedSvgHeight
            ? -this.firstParent.computedSvgWidth
            : -this.firstParent.computedSvgHeight
        "
        :max="
          this.firstParent.computedSvgWidth > this.firstParent.computedSvgHeight
            ? this.firstParent.computedSvgWidth * 2
            : this.firstParent.computedSvgHeight * 2
        "
        :value.sync="target.gradient.radialGradient.x2"
        :inputEventFunction="firstParent.drawCanvas"
        title="The X postion of the end of the gradient."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Outer X</label>
        </template>
      </NumberInput>
      <!-- STOP POSITION OUTER X END -->
      <!-- STOP POSITION OUTER Y START -->
      <NumberInput
        :min="
          this.firstParent.computedSvgWidth > this.firstParent.computedSvgHeight
            ? -this.firstParent.computedSvgWidth
            : -this.firstParent.computedSvgHeight
        "
        :max="
          this.firstParent.computedSvgWidth > this.firstParent.computedSvgHeight
            ? this.firstParent.computedSvgWidth * 2
            : this.firstParent.computedSvgHeight * 2
        "
        :value.sync="target.gradient.radialGradient.y2"
        :inputEventFunction="firstParent.drawCanvas"
        title="The Y postion of the end of the gradient."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Outer Y</label>
        </template>
      </NumberInput>
      <!-- STOP POSITION OUTER Y END -->
      <!-- STOP POSITION OUTER R START -->
      <NumberInput
        :min="0"
        :max="
          this.firstParent.computedSvgWidth > this.firstParent.computedSvgHeight
            ? this.firstParent.computedSvgWidth
            : this.firstParent.computedSvgHeight
        "
        :value.sync="target.gradient.radialGradient.r2"
        :inputEventFunction="firstParent.drawCanvas"
        title="The radius of the end of the gradient."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Outer Radius</label>
        </template>
      </NumberInput>
      <!-- STOP POSITION OUTER R END -->
    </Group>
  </div>
</template>

<script>
import NumberInput from "@/components/settings/inputs/NumberInput.vue";
import ColorInput from "@/components/settings/inputs/ColorInput.vue";
import Group from "@/components/settings/common/Group.vue";

export default {
  name: "RadialGradient",

  components: {
    ColorInput,
    NumberInput,
    Group
  },

  props: {
    firstParent: {
      type: Object,
      required: true
    },
    uniqueId: {
      type: String,
      required: true
    },
    target: {
      type: Object,
      required: true
    }
  }
};
</script>
