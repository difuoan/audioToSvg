<template>
  <Accordion
    title="Background"
    icon="paint-roller"
    :unique-id="`backgroundSettingsAccordion${index}`"
    :firstParent="firstParent"
    :index="index"
  >
    <!-- TODO: ADD FILTERS AS AN INPUT (OR MAYBE AS AN ELEMENT?) SO IT CAN BE ADDED TO BASICALLY EVERYTHING MAKE THE FILTERS SO THAT THERE CAN BE MULTIPLE FILTERS FOR ONE ELEMENT AT ONCE -->
    <!-- FUNCTION SELECT START -->
    <Select
      :value.sync="firstParent.elements[index].function"
      :options="firstParent.json.backgrounds"
      :inputEventFunction="firstParent.drawCanvas"
      title="Select the background you prefer."
      class="mb-3"
    >
      <template v-slot:default>
        <label class="m-0">Type</label>
      </template>
    </Select>
    <!-- FUNCTION SELECT END -->
    <!-- LINEAR GRADIENT SETTINGS START -->
    <LinearGradientInput
      v-if="firstParent.elements[index].function == 'linear gradient'"
      :unique-id="`backgroundLinearGradientInput${index}`"
      :target="firstParent.elements[index]"
      :first-parent="firstParent"
    />
    <!-- LINEAR GRADIENT SETTINGS END -->
    <!-- RADIAL GRADIENT SETTINGS START -->
    <RadialGradientInput
      v-if="firstParent.elements[index].function == 'radial gradient'"
      :unique-id="`backgroundRadialGradientInput${index}`"
      :target="firstParent.elements[index]"
      :first-parent="firstParent"
    />
    <!-- RADIAL GRADIENT SETTINGS END -->
    <!-- FILL BACKGROUND SETTINGS START -->
    <FillBackgroundSettings
      v-if="firstParent.elements[index].function == 'fill'"
      :index="index"
    />
    <!-- FILL BACKGROUND SETTINGS END -->
  </Accordion>
</template>

<script>
import Select from "@/components/settings/inputs/Select.vue";
import Accordion from "@/components/settings/common/Accordion.vue";
import LinearGradientInput from "@/components/settings/inputs/LinearGradientInput.vue";
import RadialGradientInput from "@/components/settings/inputs/RadialGradientInput.vue";
import FillBackgroundSettings from "@/components/settings/advanced-settings/background-settings/FillBackgroundSettings.vue";

export default {
  name: "BackgroundSettings",

  components: {
    LinearGradientInput,
    RadialGradientInput,
    FillBackgroundSettings,
    Select,
    Accordion
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
