// Import the data from json.
import fonts from "@/json/fonts.json";
import svgFormats from "@/json/svgFormats.json";
import predefinedSettings from "@/mixins/predefinedSettings.js";
import settingsToIgnore from "@/json/settingsToIgnore.json";
import fontStyles from "@/json/fontStyles.json";
import variants from "@/json/variants.json";
import backgrounds from "@/json/backgrounds.json";
import detail from "@/json/detail.json";
import waveforms from "@/json/waveforms.json";
import fillStyles from "@/json/fillStyles.json";
import shapes from "@/json/shapes.json";
import elements from "@/json/elements.json";
import elementsToChooseFrom from "@/json/elementsToChooseFrom.json";
import cases from "@/json/cases.json";
import sizeModes from "@/json/sizeModes.json";
import shapeModes from "@/json/shapeModes.json";
import lineCaps from "@/json/lineCaps.json";
import lineJoins from "@/json/lineJoins.json";
import textAlignments from "@/json/textAlignments.json";

export default {
  mixins: [
    predefinedSettings
  ],
  data() {
    return {
      file: {
        loading: false,
        src: "",
        name: "",
        data: null,
        wasSet: false,
        channelsPreprocessing: null
      },
      canvasContainer: null,
      canvases: [],
      canvasData: null,
      nextElementIndex: null,
      audioParser: null,
      svgFormat: {
        x: 5,
        y: 2.5
      },
      settingHistory: [],
      json: {
        settingsToIgnore: settingsToIgnore,
        cases: cases,
        fillStyles: fillStyles,
        svgFormats: svgFormats,
        fonts: fonts,
        fontStyles: fontStyles,
        backgrounds: backgrounds,
        detail: detail,
        waveforms: waveforms,
        variants: variants,
        usedSettings: {},
        shapes: shapes,
        elements: elements,
        elementsToChooseFrom: elementsToChooseFrom,
        sizeModes: sizeModes,
        lineJoins: lineJoins,
        lineCaps: lineCaps,
        shapeModes: shapeModes,
        textAlignments: textAlignments
      },
      showAdvancedSettings: false,
      elements: [],
      canvasPreview: {
        loading: false,
        open: false,
        image: null,
        refresh: true
      }
    };
  }
};
