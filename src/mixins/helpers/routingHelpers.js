export default {
    methods: {
        rerouteToProductSelection(predefinedSettings = null) {
          this.$parent.step = 2;
          if (predefinedSettings instanceof Event == true) { // we are dealing with an event (click)
            this.$router.push({
              name: "ProductSelection",
              params: {
                imageData: {
                  file: this.audioParser.getCanvasData(),
                  filename: this.file.name + ".png"
                }
              }
            });
          } else if (
            predefinedSettings.name.length > 0
            && predefinedSettings.canvasData.length > 0
          ) { // we are dealing with a regular function call
            this.$router.push({
              name: "ProductSelection",
              params: {
                imageData: {
                  file: predefinedSettings.canvasData,
                  filename: predefinedSettings.name + ".png"
                }
              }
            });
          }
        },
        rerouteToAudioToSvg() {
            this.$parent.step = 1;
            this.$router.push({name: "AudioToSvg"});
        },
        rerouteToCheckInput(product, imageData, userData) {
            this.$parent.step = 4;
            this.$parent.$router.push({
                name: "CheckInput",
                params: {
                    imageData: imageData,
                    product: product,
                    userData: userData
                }
            });
        },
        rerouteToUserData(product, imageData) {
          this.$parent.step = 3;
          this.$router.push({
            name: "UserData",
            params: {
              imageData: imageData,
              product: product
            }
          });
        }
    }
};
