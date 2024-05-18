export default {
    methods: {
        fileNameToPosterTitle(title) {
          let result = title;
          // remove extension from the filename if there is one
          if (title[title.length - 4] == ".") {
            result = result
              .split(".")
              .slice(0, -1)
              .join(".");
          }
          return result
            .replace(/[&/\\#,+()$~%;.'"*?<>{}_]/g, " ") // replace most special chars with spaces
            .replace(/  +/g, " ") // replace multiple spaces with just one space
            .trim(); // trim the result of unneccessary spaces at the beginning and end
        },
        addTextToTitleElements() {
          let posterTitle = this.fileNameToPosterTitle(this.file.name);
          // add a text to all title-elements if they don't have one already
          this.elements.forEach((element, index) => {
            if ("text" in element && element.text.length == 0) {
              this.elements[index].text = posterTitle;
            }
          });
        }
    }
  };
  