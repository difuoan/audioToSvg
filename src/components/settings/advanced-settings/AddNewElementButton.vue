<template>
  <div class="addNewElementButton btn-group mb-3 w-100" role="group">
    <!-- ADD NEW ELEMENT SELECT START -->
      <!-- ADD NEW ELEMENT BUTTON START -->
      <button
        class="btn btn-sm btn-outline-primary"
        @click="addElement('waveform')"
      >
        <font-awesome-icon icon="plus" class="mr-2" />
        <span class="mr-2" >waveform</span>
        <font-awesome-icon icon="wave-square"/>
      </button>
      <!-- ADD NEW ELEMENT BUTTON END -->
      <!-- ADD NEW ELEMENT BUTTON START -->
      <button
        class="btn btn-sm btn-outline-primary"
        @click="addElement('detail')"
      >
        <font-awesome-icon icon="plus" class="mr-2" />
        <span class="mr-2" >detail</span>
        <font-awesome-icon icon="chess-board"/>
      </button>
      <!-- ADD NEW ELEMENT BUTTON END -->
      <!-- ADD NEW ELEMENT BUTTON START -->
      <button
        class="btn btn-sm btn-outline-primary"
        @click="addElement('title')"
      >
        <font-awesome-icon icon="plus" class="mr-2" />
        <span class="mr-2" >text</span>
        <font-awesome-icon icon="heading"/>
      </button>
      <!-- ADD NEW ELEMENT BUTTON END -->
      <!-- ADD NEW ELEMENT BUTTON START -->
      <button
        class="btn btn-sm btn-outline-primary"
        @click="addElement('background')"
      >
        <font-awesome-icon icon="plus" class="mr-2" />
        <span class="mr-2" >background</span>
        <font-awesome-icon icon="paint-roller"/>
      </button>
      <!-- ADD NEW ELEMENT BUTTON END -->
    <!-- ADD NEW ELEMENT SELECT END -->
  </div>
</template>

<script>
export default {
  name: "AddNewElementButton",

  computed: {
    firstParent() {
      return this.$parent.$parent.$parent;
    }
  },
  methods: {
    addElement(nextElement) {
      let elementToPush = this.firstParent.json.elementsToChooseFrom.find(element => { // find the element we want to add
        return element.name == nextElement;
      });
      elementToPush.index = this.firstParent.getNextElementIndex();
      this.firstParent.elements.push(
        this.firstParent.deepCopy(elementToPush)
      );
      this.firstParent.addTextToTitleElements(); // add a text to title-elements that have none
      this.firstParent.drawCanvas();
    }
  }
}
</script>