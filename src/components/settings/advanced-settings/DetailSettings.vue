<template>
  <Accordion
    title="Detail"
    icon="chess-board"
    :unique-id="`detailSettingsAccordion${index}`"
    :firstParent="firstParent"
    :index="index"
  >
    <Group
      icon="eye"
      title="Style"
      uniqueId="repeatingShapesDetailSettingsStyle"
      :showSettingsInitially="true"
      :marginTop="false"
    >
      <!-- FUNCTION SELECT START -->
      <Select
        :value.sync="firstParent.elements[index].function"
        :options="firstParent.json.detail"
        :inputEventFunction="firstParent.drawCanvas"
        title="Select the detail you prefer."
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
        title="Select the fill style you prefer."
        class="mb-3"
      >
        <template v-slot:default>
          <label class="m-0">Fill Style</label>
        </template>
      </Select>
      <!-- FILL STYLE SELECT END -->
    </Group>
    <!-- REPEATING SHAPES DETAIL SETTINGS START -->
    <RepeatingShapesDetailSettings
      v-if="firstParent.elements[index].function == 'repeating shapes'"
      :index="index"
    />
    <!-- REPEATING SHAPES DETAIL SETTINGS END -->
    <!-- SHAPE DETAIL SETTINGS START -->
    <ShapeDetailSettings
      v-if="firstParent.elements[index].function == 'shape'"
      :index="index"
    />
    <!-- SHAPE DETAIL SETTINGS END -->
    <!-- MANDALA DETAIL SETTINGS START -->
    <MandalaDetailSettings
      v-if="firstParent.elements[index].function == 'mandala'"
      :index="index"
    />
    <!-- MANDALA DETAIL SETTINGS END -->
  </Accordion>
</template>

<script>
import Select from "@/components/settings/inputs/Select.vue";
import Group from "@/components/settings/common/Group.vue";
import Accordion from "@/components/settings/common/Accordion.vue";
import RepeatingShapesDetailSettings from "@/components/settings/advanced-settings/detail-settings/RepeatingShapesDetailSettings.vue";
import ShapeDetailSettings from "@/components/settings/advanced-settings/detail-settings/ShapeDetailSettings.vue";
import MandalaDetailSettings from "@/components/settings/advanced-settings/detail-settings/MandalaDetailSettings.vue";

export default {
  name: "DetailSettings",

  components: {
    RepeatingShapesDetailSettings,
    MandalaDetailSettings,
    Select,
    Accordion,
    Group,
    ShapeDetailSettings
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
