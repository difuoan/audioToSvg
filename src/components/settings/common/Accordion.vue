<template>
  <!-- ACCORDION START -->
  <div :class="`card mb-3 ${uniqueId}Settings accordion`">
    <!-- ACCORDION BUTTON START -->
    <div class="card-header p-0" :id="`${uniqueId}SettingsHeading`">
      <h5 class="mb-0 position-relative">
        <!-- ACCORDION TITLE START -->
        <button
          class="btn btn-link btn-block collapsed"
          data-toggle="collapse"
          :data-target="`#${uniqueId}Settings`"
          :aria-expanded="ariaExpanded"
          :aria-controls="`${uniqueId}Settings`"
        >
          <font-awesome-icon :icon="icon" class="mr-2" />
          <span>{{ accordionTitle }}</span>
        </button>
        <!-- ACCORDION TITLE END -->
        <!-- COPY AND REMOVE ELEMENT BUTTONS START -->
        <div
          v-if="
            index != null
            && firstParent != null
          "
          class="accordionButtons"
        >
          <button
            @click="copyElement(index)"
            type="button"
            class="btn btn-sm btn-outline-secondary btn-sm mr-2"
          >
            <font-awesome-icon icon="copy" />
          </button>
          <div
            class="btn-group mr-2"
            role="group"
          >
            <button
              @click="moveElementDown(index)"
              v-if="index != firstParent.elements.length - 1"
              type="button"
              class="btn btn-sm btn-outline-secondary"
            >
              <font-awesome-icon icon="arrow-down" />
            </button>
            <button
              @click="moveElementUp(index)"
              v-if="index != 0"
              type="button"
              class="btn btn-sm btn-outline-secondary"
            >
              <font-awesome-icon icon="arrow-up" />
            </button>
          </div>
          <button
            v-if="firstParent.elements.length > 1"
            @click="removeElement(index)"
            type="button"
            class="btn btn-sm btn-outline-secondary btn-sm mr-2"
          >
            <font-awesome-icon icon="trash" />
          </button> 
        </div>
        <!-- COPY AND REMOVE ELEMENT BUTTONS END -->
      </h5>
    </div>
    <!-- ACCORDION BUTTON END -->
    <!-- ACCORDION CONTENT START -->
    <div
      :id="`${uniqueId}Settings`"
      :class="`collapse ${cardBodyClass}`"
      :aria-labelledby="`${uniqueId}SettingsHeading`"
      data-parent="#accordion"
    >
      <div class="card-body">
        <slot name="default" />
      </div>
    </div>
    <!-- ACCORDION CONTENT END -->
  </div>
  <!-- ACCORDION END -->
</template>

<script>
export default {
  name: "Accordion",

  computed: {
    ariaExpanded() {
      if (this.show) {
        return true;
      }
      return false;
    },
    cardBodyClass() {
      if (this.show) {
        return "show";
      }
      return "";
    },
    accordionTitle() {
      if (this.index == null) {
        return this.title;
      } else {
        return this.title + ' (' + this.firstParent.elements[this.index].index +')';
      }
    }
  },

  props: {
    firstParent: {
      type: Object,
      required: false,
      default: () => {
        return null
      }
    },
    index: {
      type: Number,
      required: false,
      default: () => {
        return null;
      }
    },
    uniqueId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    }
  },

  methods: {
    moveElementUp(index) {
      this.firstParent.moveArrayElementUp(index, this.firstParent.elements);
      // TODO: don't re-draw the canvas here, we don't need to, we just need to move the dom around a bit => generate canvases based on data, instead of creating them every time
      this.firstParent.drawCanvas();
    },
    moveElementDown(index) {
      this.firstParent.moveArrayElementDown(index, this.firstParent.elements);
      this.firstParent.drawCanvas();
    },
    removeElement(index) {
      this.firstParent.removeArrayElement(index, this.firstParent.elements);
      this.firstParent.removeArrayElement(index, this.firstParent.canvases);
      this.firstParent.drawCanvas();
    },
    copyElement(index) {
      this.firstParent.copyArrayElement(index, this.firstParent.elements);
      this.firstParent.elements[this.firstParent.elements.length - 1].index = this.firstParent.getNextElementIndex();
      this.firstParent.drawCanvas();
    }
  }
};
</script>

<style lang="scss" scoped>
  .accordionButtons {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;

    button {
      opacity: 50%;
    }
    button:hover {
      opacity: 100%;
    }
  }

  h5 {
    button {
      text-align: left;
    }
  }
</style>