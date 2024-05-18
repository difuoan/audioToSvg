<template>
  <Accordion
    title="Waveform"
    icon="wave-square"
    :unique-id="`waveformSettingsAccordion${index}`"
    :firstParent="firstParent"
    :index="index"
  >
    <Group
      icon="eye"
      title="Style"
      uniqueId="defaultWaveformStyle"
      :showSettingsInitially="true"
      :marginTop="false"
    >
      <!-- FUNCTION SELECT START -->
      <Select
        :value.sync="firstParent.elements[index].function"
        :options="firstParent.json.waveforms"
        :inputEventFunction="firstParent.drawCanvas"
        title="Select the background you prefer."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Type</label>
        </template>
      </Select>
      <!-- FUNCTION SELECT END -->
      <!-- FILL STYLE SELECT START -->
      <Select
        :value.sync="firstParent.elements[index].fillStyle"
        :options="firstParent.json.fillStyles"
        :inputEventFunction="firstParent.drawCanvas"
        title="Select how the waveform should be colored."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Fill Style</label>
        </template>
      </Select>
      <!-- FILL STYLE SELECT END -->
    </Group>
    <!-- TODO: ADD PERSPECTIVE TO THE WAVEFORM AND TITLE -->
    <Group
      icon="eye"
      title="Appearance"
      uniqueId="defaultWaveformAppearance"
      :showSettingsInitially="true"
    >
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
      <!-- SIZE MULTIPLICATOR RANGE START -->
      <NumberInput
        :min="0.01"
        :step="0.01"
        :max="5"
        :value.sync="firstParent.elements[index].size"
        :inputEventFunction="firstParent.drawCanvas"
        title="Play with this value until you like the result."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Size</label>
        </template>
      </NumberInput>
      <!-- SIZE MULTIPLICATOR RANGE END -->
      <!-- ROTATION NUMBER INPUT START -->
      <NumberInput
        v-if="firstParent.elements[index].function != 'circles'"
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
      <!-- ROTATION NUMBER INPUT END -->
      <!-- STROKE WIDTH RANGE START -->
      <NumberInput
        :min="0.1"
        :step="0.1"
        :max="100"
        :value.sync="firstParent.elements[index].width"
        :inputEventFunction="firstParent.drawCanvas"
        title="Play with this value until you like the result."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Stroke Width</label>
        </template>
      </NumberInput>
      <!-- STROKE WIDTH RANGE END -->
      <!-- AMPLITUDE RANGE START -->
      <NumberInput
        :min="1"
        :max="firstParent.computedSvgHeight"
        :value.sync="firstParent.elements[index].amplitude"
        :inputEventFunction="firstParent.drawCanvas"
        title="Play with this value until you like the result."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Amplitude</label>
        </template>
      </NumberInput>
      <!-- AMPLITUDE RANGE END -->
      <!-- FREQUENCY RANGE START -->
      <NumberInput
        :min="1"
        :max="1000"
        :value.sync="firstParent.elements[index].frequency"
        :inputEventFunction="firstParent.drawCanvas"
        title="Play with this value until you like the result."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Frequency</label>
        </template>
      </NumberInput>
      <!-- FREQUENCY RANGE END -->
      <!-- OPACITY RANGE START -->
      <NumberInput
        :min="0"
        :max="1"
        :step="0.01"
        :value.sync="firstParent.elements[index].opacity"
        :inputEventFunction="firstParent.drawCanvas"
        title="Play with this value until you like the result."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Opacity</label>
        </template>
      </NumberInput>
      <!-- OPACITY RANGE END -->
      <!-- FORCE MIN HEIGHT BUTTON START -->
      <ToggleButton
        :text="firstParent.elements[index].forceMinHeight ? 'On' : 'Off'"
        :title="
          firstParent.elements[index].forceMinHeight
            ? 'Turn minimum height off'
            : 'Turn minimum height on'
        "
        label="Force minimum height"
        :clickEventFunction="() => {
          firstParent.elements[index].forceMinHeight = !firstParent.elements[index].forceMinHeight;
        }"
        :inputEventFunction="firstParent.drawCanvas"
        class="mb-3"
      />
      <!-- FORCE MIN HEIGHT BUTTON END -->
      <!-- POSITIVE ONLY BUTTON START -->
      <ToggleButton
        v-if="
          firstParent.elements[index].function == 'default'
          || firstParent.elements[index].function == 'bars'
        "
        :text="firstParent.elements[index].positiveOnly ? 'On' : 'Off'"
        :title="
          firstParent.elements[index].positiveOnly
            ? 'Turn positive only off'
            : 'Turn positive only on'
        "
        label="Positive Only"
        :clickEventFunction="() => {
          firstParent.elements[index].positiveOnly = !firstParent.elements[index].positiveOnly;
        }"
        :inputEventFunction="firstParent.drawCanvas"
        class="mb-3"
      />
      <!-- POSITIVE ONLY BUTTON END -->
      <!-- TOGGLE BUTTON USE FILL START -->
      <ToggleButton
        v-if="firstParent.elements[index].function != 'bars'"
        :text="firstParent.elements[index].useFill ? 'On' : 'Off'"
        :title="
          firstParent.elements[index].useFill
            ? 'Fill the waveform'
            : `Don't fill the waveform`
        "
        label="Fill waveform"
        :clickEventFunction="() => {
          firstParent.elements[index].useFill = !firstParent.elements[index].useFill;
        }"
        :inputEventFunction="firstParent.drawCanvas"
        class="mb-3"
      />
      <!-- TOGGLE BUTTON USE FILL END -->
      <!-- TOGGLE BUTTON USE STROKE START -->
      <ToggleButton
        v-if="firstParent.elements[index].function != 'bars'"
        :text="firstParent.elements[index].useStroke ? 'On' : 'Off'"
        :title="
          firstParent.elements[index].useStroke
            ? 'Stroke the waveform'
            : `Don't stroke the waveform`
        "
        label="Stroke waveform"
        class="mb-3"
        :clickEventFunction="() => {
          firstParent.elements[index].useStroke = !firstParent.elements[index].useStroke;
        }"
        :inputEventFunction="firstParent.drawCanvas"
      />
      <!-- TOGGLE BUTTON USE STROKE END -->
      <!-- LINE JOIN SELECT START -->
      <Select
        v-if="
          firstParent.elements[index].useStroke == true
          && firstParent.elements[index].function == 'default'
        "
        :value.sync="firstParent.elements[index].lineJoin"
        :options="firstParent.json.lineJoins"
        :inputEventFunction="firstParent.drawCanvas"
        title="Select the line join you prefer."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Line Join</label>
        </template>
      </Select>
      <!-- LINE JOIN SELECT END -->
      <!-- LINE CAP SELECT START -->
      <Select
        v-if="firstParent.elements[index].useStroke == true"
        :value.sync="firstParent.elements[index].lineCap"
        :options="firstParent.json.lineCaps"
        :inputEventFunction="firstParent.drawCanvas"
        title="Select the line join you prefer."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Line Cap</label>
        </template>
      </Select>
      <!-- LINE CAP SELECT END -->
    </Group>
    <Group
      icon="arrows-alt"
      title="Position"
      uniqueId="defaultWaveformPosition"
    >
      <!-- OFFSET X RANGE START -->
      <NumberInput
        :min="-firstParent.computedSvgWidth"
        :max="firstParent.computedSvgWidth"
        :value.sync="firstParent.elements[index].offset.x"
        :inputEventFunction="firstParent.drawCanvas"
        title="Play with this value until you like the result."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Offset X</label>
        </template>
      </NumberInput>
      <!-- OFFSET X RANGE END -->
      <!-- OFFSET Y RANGE START -->
      <NumberInput
        :min="-firstParent.computedSvgHeight"
        :max="firstParent.computedSvgHeight"
        :value.sync="firstParent.elements[index].offset.y"
        :inputEventFunction="firstParent.drawCanvas"
        title="Play with this value until you like the result."
      >
        <template v-slot:default>
          <label class="m-0">Offset Y</label>
        </template>
      </NumberInput>
      <!-- OFFSET Y RANGE END -->
    </Group>
    <!-- LINEAR GRADIENT SETTINGS START -->
    <LinearGradientInput
      v-if="firstParent.elements[index].fillStyle == 'linear gradient'"
      :unique-id="`waveformSettingsLinearGradientInput${index}`"
      :target="firstParent.elements[index]"
      :first-parent="firstParent"
    />
    <!-- LINEAR GRADIENT SETTINGS END -->
    <!-- RADIAL GRADIENT SETTINGS START -->
    <RadialGradientInput
      v-if="firstParent.elements[index].fillStyle == 'radial gradient'"
      :unique-id="`waveformSettingsRadialGradientInput${index}`"
      :target="firstParent.elements[index]"
      :first-parent="firstParent"
    />
    <!-- RADIAL GRADIENT SETTINGS END -->
  </Accordion>
</template>

<script>
import LinearGradientInput from "@/components/settings/inputs/LinearGradientInput.vue";
import RadialGradientInput from "@/components/settings/inputs/RadialGradientInput.vue";
import NumberInput from "@/components/settings/inputs/NumberInput.vue";
import ColorInput from "@/components/settings/inputs/ColorInput.vue";
import Group from "@/components/settings/common/Group.vue";
import Accordion from "@/components/settings/common/Accordion.vue";
import Select from "@/components/settings/inputs/Select.vue";
import ToggleButton from "@/components/settings/inputs/ToggleButton.vue";

export default {
  name: "WaveformSettings",

  components: {
    ColorInput,
    NumberInput,
    Group,
    Accordion,
    LinearGradientInput,
    RadialGradientInput,
    Select,
    ToggleButton
  },
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    firstParent() {
      return this.$parent.$parent.$parent;
    }
  }
};
</script>
