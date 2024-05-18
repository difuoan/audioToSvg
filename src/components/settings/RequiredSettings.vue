<template>
  <Accordion
    title="Required settings"
    icon="exclamation"
    :show="true"
    :unique-id="`requiredSettingsAccordion`"
  >
    <!-- FILE INPUT START -->
    <FileInput
      ref="fileInputComponent"
      class="mb-3"
      title="Select an audio file to use."
      :inputEventFunction="firstParent.onAudioFileInput"
      id="audioInput"
      placeholder="Select an audio file to start"
      :fileName="firstParent.computedFileName"
      :fileNameColorClass="firstParent.computedFileNameColorClass"
      :audioInputButtonText="firstParent.computedAudioInputButtonText"
    >
      <label class="m-0">Audio file</label>
    </FileInput>
    <!-- FILE INPUT END -->
    <!-- POSTER STYLE SELECT START -->
    <Select
      :value.sync="firstParent.json.usedSettings"
      :options="firstParent.json.predefinedSettings"
      title="Select the poster style you prefer."
      class="mb-3"
      :inputEventFunction="firstParent.loadPredefinedSettings"
    >
      <template v-slot:default>
        <label class="m-0">Poster style</label>
      </template>
      <template v-slot:option="scope">
        {{ scope.option.name }}
      </template>
    </Select>
    <!-- POSTER STYLE SELECT END -->
    <!-- POSTER FORMAT SELECT START -->
    <Select
      :value.sync="firstParent.svgFormat"
      :options="firstParent.json.svgFormats"
      :inputEventFunction="firstParent.setUpAudioParser"
      title="Select the format you prefer."
    >
      <template v-slot:default>
        <label class="m-0">Poster format</label>
      </template>
      <template v-slot:option="scope">
        {{ scope.option.x }}&nbsp;&times;&nbsp;{{ scope.option.y }}
      </template>
    </Select>
    <!-- POSTER FORMAT SELECT END -->
  </Accordion>
</template>

<script>
import FileInput from "@/components/settings/inputs/FileInput.vue";
import Select from "@/components/settings/inputs/Select.vue";
import Accordion from "@/components/settings/common/Accordion.vue";

export default {
  name: "RequiredSettings",

  components: {
    Select,
    FileInput,
    Accordion
  },

  computed: {
    firstParent() {
      return this.$parent.$parent;
    }
  }
};
</script>
