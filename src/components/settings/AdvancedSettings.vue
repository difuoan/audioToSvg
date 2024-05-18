<template>
  <div class="advancedSettings">
    <div
      v-for="(element, index) in firstParent.elements"
      :key="`advancedSettings_elementKey_${index}`"
    >
      <TitleSettings v-if="element.name == 'title'" :index="index" />

      <WaveformSettings v-if="element.name == 'waveform'" :index="index" />

      <DetailSettings v-if="element.name == 'detail'" :index="index" />

      <BackgroundSettings v-if="element.name == 'background'" :index="index" />
    </div>
    <AddNewElementButton />
  </div>
</template>

<script>
import TitleSettings from "@/components/settings/advanced-settings/TitleSettings.vue";
import BackgroundSettings from "@/components/settings/advanced-settings/BackgroundSettings.vue";
import WaveformSettings from "@/components/settings/advanced-settings/WaveformSettings.vue";
import DetailSettings from "@/components/settings/advanced-settings/DetailSettings.vue";
import AddNewElementButton from "@/components/settings/advanced-settings/AddNewElementButton.vue"

export default {
  name: "AdvancedSettings",

  components: {
    TitleSettings,
    BackgroundSettings,
    WaveformSettings,
    DetailSettings,
    AddNewElementButton
  },

  computed: {
    firstParent() {
      return this.$parent.$parent;
    }
  }
};
</script>
