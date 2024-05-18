import defaultSetting from "@/json/predefinedSettings/default.json";
import bars from "@/json/predefinedSettings/bars.json";
import miami from "@/json/predefinedSettings/miami.json";

export default {
    data() {
      return {
        json: {
          predefinedSettings: [
            defaultSetting,
            bars,
            miami
          ]
        }
      };
    }
}