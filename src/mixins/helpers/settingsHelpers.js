export default {
    methods: {
        copySettingsToClipboard() {
            let that = this;
            this.file.loading = true;
            this.displayCanvasOverlay = true;
            this.canvasData = this.audioParser.getCanvasData();
            let settingsToCopy = {
            name: this.json.usedSettings.name,
            elements: this.elements,
            canvasData: this.canvasData
            };
            let copyText = JSON.stringify(settingsToCopy);
            navigator.clipboard.writeText(copyText).finally(function() {
            that.file.loading = false;
            that.displayCanvasOverlay = false;
            });
        },
        deepCopy(source) {
            return JSON.parse(JSON.stringify(source));
        },
        // Overrides the current vue-data with the default one.
        loadPredefinedSettings() {
          this.file.loading = true;
          // sets the usedSettings if they haven't been set already
          if (
            Object.entries(this.json.usedSettings).length === 0 &&
            this.json.usedSettings.constructor === Object
          ) {
            this.json.usedSettings = this.json.predefinedSettings[
              this.json.predefinedSettings.length - 1
            ];
          }
    
          // prepare the elements to be copied
          this.elements = []; // empty the elements before we add the new elements
          this.canvases = []; // empty the canvases before we add the new elements
          for (
            let settingIndex = 0;
            settingIndex < this.json.usedSettings.elements.length;
            settingIndex++
          ) {
            let settingElement = this.json.usedSettings.elements[settingIndex];
            for (
              let defaultIndex = 0;
              defaultIndex < this.json.elementsToChooseFrom.length;
              defaultIndex++
            ) {
              // deep copy the chosen element so we can't reference it over and over again (leads to overwriting-errors)
              let defaultElement = this.deepCopy(this.json.elementsToChooseFrom[defaultIndex]);
              if (defaultElement.name == settingElement.name) {
                // add the default-version of the chosen element so it has all the values needed for the scripts to work
                this.elements.push(defaultElement);
                break // end for loop after the element was found
              }
            }
          }
          this.copyEverythingTo(this.json.usedSettings.elements, this.elements); // actually copy the elements
          this.addTextToTitleElements(); // add a text to title-elements that have none
          this.drawCanvas();
        },
        /*
          Copies the variables of the proivided copyObject into the other provided insertObject.
          Also calls another instance of the copyEverythingTo-function when the variable is itself an object (deep-copy).
        */
        copyEverythingTo(copyObject, insertObject, oldCombinedKey = "data.elements") {
          Object.keys(copyObject).forEach(newKey => {
            let combinedKey = `${oldCombinedKey}.${newKey}`; // makes a key that is relative to the parent-objects, i.e.: data.waveform.color
            if (isNaN(newKey) == false) { // if the new key is a number we are in an array and try to replace the index with [] so it matches the settingsToIgnore
              combinedKey = `${oldCombinedKey}.[]`; // the combined key is used solely to be compared with the settingsToIgnore so its perfectly fine if we just replace all occurances of indexed-keys with "[]"
            }
            if (this.json.settingsToIgnore.includes(combinedKey) == true) {
              return;
            }
            if (
              typeof copyObject[newKey] === "object" &&
              copyObject[newKey] !== null
            ) {
              this.copyEverythingTo(
                copyObject[newKey],
                insertObject[newKey],
                combinedKey
              );
            } else {
              insertObject[newKey] = copyObject[newKey];
            }
          });
        },
        saveSettingsToHistory: _.throttle(function(event) {
          // TODO: SAVE AND UNDO ONLY THE CHANGES, NOT THE WHOLE ELEMENTS-ARRAY (PERFORMANCE)
          this.settingHistory.push(this.deepCopy(this.elements));
        }, 1000),
        undoChanges() {
          this.elements = this.settingHistory.splice(this.settingHistory.length - 2, 2)[0];
          this.drawCanvas();
        }
    }
}
