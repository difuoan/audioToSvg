<template>
  <Accordion
    title="Title"
    icon="heading"
    :unique-id="`titleSettingsAccordion${index}`"
    :firstParent="firstParent"
    :index="index"
  >
    <Group
      icon="eye"
      title="Appearance"
      uniqueId="titleSettingsAppearance"
      :showSettingsInitially="true"
      :marginTop="false"
    >
      <!-- POSTER TITLE TEXT INPUT START -->
      <TextInput
        :value.sync="firstParent.elements[index].text"
        title="Enter the title you want to display."
        placeholder="Enter the name of the song."
        class="mb-3"
        :inputEventFunction="firstParent.drawCanvas"
      >
        <label class="m-0">Title</label>
      </TextInput>
      <!-- POSTER TITLE INPUT TEXT END -->
      <!-- CASE SELECT START -->
      <Select
        v-if="firstParent.elements[index].variant == 'normal'"
        :value.sync="firstParent.elements[index].case"
        :options="firstParent.json.cases"
        :inputEventFunction="firstParent.drawCanvas"
        title="Select the case you prefer."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Case</label>
        </template>
      </Select>
      <!-- CASE SELECT END -->
      <!-- FONT FAMILY SELECT START -->
      <Select
        :value.sync="firstParent.elements[index].font"
        :options="firstParent.json.fonts"
        :inputEventFunction="firstParent.drawCanvas"
        title="Select the font you prefer."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Font</label>
        </template>
      </Select>
      <!-- FONT FAMILY SELECT END -->
      <!-- FONT STYLE SELECT START -->
      <Select
        :value.sync="firstParent.elements[index].style"
        :options="firstParent.json.fontStyles"
        :inputEventFunction="firstParent.drawCanvas"
        title="Select the font style you prefer."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Style</label>
        </template>
      </Select>
      <!-- FONT STYLE SELECT END -->
      <!-- FILL STYLE SELECT START -->
      <Select
        :value.sync="firstParent.elements[index].fillStyle"
        :options="firstParent.json.fillStyles"
        :inputEventFunction="firstParent.drawCanvas"
        title="Select the fill style you prefer."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Fill Style</label>
        </template>
      </Select>
      <!-- FILL STYLE SELECT END -->
      <!-- VARIANT SELECT START -->
      <Select
        v-if="firstParent.elements[index].case == 'normal'"
        :value.sync="firstParent.elements[index].variant"
        :options="firstParent.json.variants"
        :inputEventFunction="firstParent.drawCanvas"
        title="Select the font variant you prefer."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Variant</label>
        </template>
      </Select>
      <!-- VARIANT SELECT END -->
      <!-- TEXT ALIGN SELECT START -->
      <Select
        :value.sync="firstParent.elements[index].textAlign"
        :options="firstParent.json.textAlignments"
        :inputEventFunction="firstParent.drawCanvas"
        title="Select the text alignemnt you prefer."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Text Alignment</label>
        </template>
      </Select>
      <!-- TEXT ALIGN SELECT END -->
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
      <!-- USE FILL BUTTON START -->
      <ToggleButton
        :text="firstParent.elements[index].useFill ? 'On' : 'Off'"
        :title="
          firstParent.elements[index].useFill
            ? 'Fill the text'
            : `Don't fill the text`
        "
        label="Use Fill"
        :clickEventFunction="() => {
          firstParent.elements[index].useFill = !firstParent.elements[index].useFill;
        }"
        :inputEventFunction="firstParent.drawCanvas"
        class="mb-3"
      />
      <!-- USE FILL BUTTON END -->
      <!-- USE STROKE BUTTON START -->
      <ToggleButton
        :text="firstParent.elements[index].useStroke ? 'On' : 'Off'"
        :title="
          firstParent.elements[index].useStroke
            ? 'Stroke the text'
            : `Don't stroke the text`
        "
        label="Use Stroke"
        :clickEventFunction="() => {
          firstParent.elements[index].useStroke = !firstParent.elements[index].useStroke;
        }"
        :inputEventFunction="firstParent.drawCanvas"
        class="mb-3"
      />
      <!-- USE STROKE BUTTON END -->
      <!-- LINE JOIN SELECT START -->
      <Select
        v-if="firstParent.elements[index].useStroke == true"
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
      <!-- LINE WIDTH NUMBER INPUT START -->
      <NumberInput
        v-if="firstParent.elements[index].useStroke == true"
        :min="0"
        :max="50"
        :step="0.1"
        :value.sync="firstParent.elements[index].lineWidth"
        :inputEventFunction="firstParent.drawCanvas"
        title="Play with this value until you like the result."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Stroke Width</label>
        </template>
      </NumberInput>
      <!-- LINE WIDTH NUMBER INPUT END -->
      <!-- OPACITY NUMBER INPUT START -->
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
      <!-- OPACITY NUMBER INPUT END -->
      <!-- FONT SIZE NUMBER INPUT START -->
      <NumberInput
        :min="1"
        :max="500"
        :value.sync="firstParent.elements[index].size"
        :inputEventFunction="firstParent.drawCanvas"
        title="Play with this value until you like the result."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Size</label>
        </template>
      </NumberInput>
      <!-- FONT SIZE NUMBER INPUT END -->
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
    </Group>
    <Group icon="arrows-alt" title="Position" uniqueId="titleSettingsPosition">
      <!-- OFFSET X NUMBER INPUT START -->
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
      <!-- OFFSET X NUMBER INPUT END -->
      <!-- OFFSET Y NUMBER INPUT START -->
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
      <!-- OFFSET Y NUMBER INPUT END -->
    </Group>
    <!-- LINEAR GRADIENT SETTINGS START -->
    <LinearGradientInput
      v-if="firstParent.elements[index].fillStyle == 'linear gradient'"
      :unique-id="`titleSettingsLinearGradientInput${index}`"
      :target="firstParent.elements[index]"
      :first-parent="firstParent"
    />
    <!-- LINEAR GRADIENT SETTINGS END -->
    <!-- RADIAL GRADIENT SETTINGS START -->
    <RadialGradientInput
      v-if="firstParent.elements[index].fillStyle == 'radial gradient'"
      :unique-id="`titleSettingsRadialGradientInput${index}`"
      :target="firstParent.elements[index]"
      :first-parent="firstParent"
    />
    <!-- RADIAL GRADIENT SETTINGS END -->
  </Accordion>
</template>

<script>
import Select from "@/components/settings/inputs/Select.vue";
import ColorInput from "@/components/settings/inputs/ColorInput.vue";
import NumberInput from "@/components/settings/inputs/NumberInput.vue";
import Group from "@/components/settings/common/Group.vue";
import Accordion from "@/components/settings/common/Accordion.vue";
import LinearGradientInput from "@/components/settings/inputs/LinearGradientInput.vue";
import RadialGradientInput from "@/components/settings/inputs/RadialGradientInput.vue";
import TextInput from "@/components/settings/inputs/TextInput.vue";
import ToggleButton from "@/components/settings/inputs/ToggleButton.vue";


export default {
  name: "TitleSettings",

  components: {
    Select,
    ColorInput,
    NumberInput,
    TextInput,
    Group,
    Accordion,
    RadialGradientInput,
    LinearGradientInput,
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
