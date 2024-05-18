<template>
  <div class="fileInput">
    <div :title="title">
      <div class="input-group">
        <!-- FILE INPUT LABEL START -->
        <div class="input-group-prepend mr-3">
          <slot name="default">
            <label class="m-0">File</label>
          </slot>
        </div>
        <!-- FILE INPUT LABEL END -->
        <!-- FILE INPUT CONTENT START -->
        <input
          ref="fileInput"
          :id="id"
          :name="id"
          class="inputfile"
          accept="audio/*"
          type="file"
          @change="inputEventFunction($event)"
        />
        <div class="form-control form-control-sm rounded-left py-0 px-3">
          <label
            :class="
              `form-control form-control-sm px-0 border-0 bg-transparent overflow-hidden white-space-nowrap cursor-pointer
                ${fileNameColorClass}
              `
            "
            :for="id"
          >{{ fileName ? fileName : placeholder }}</label>
        </div>
        <div class="input-group-append">
          <label class="btn btn-sm btn-primary cursor-pointer m-0" :for="id">
            <font-awesome-icon v-if="icon.length > 0" :icon="icon" class="mr-2" />
            <span>{{ audioInputButtonText }}</span>
          </label>
        </div>
        <!-- FILE INPUT CONTENT END -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FileInput",

  props: {
    placeholder: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    title: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      required: true
    },
    icon: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    audioInputButtonText: {
      type: String,
      required: true
    },
    fileNameColorClass: {
      type: String,
      required: true
    },
    inputEventFunction: {
      type: Function,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  }
};
</script>
