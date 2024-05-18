<template>
  <div class="userData">
    <!-- CONTACT ROW START -->
    <div class="row">
      <!-- FIELDS START -->
      <div
        v-for="(field, fieldKey) in formData"
        :key="`userData_field_${fieldKey}`"
        class="col-12 col-sm-12 col-md-6 col-lg-6"
      >
        <!-- SELECT START -->
        <div class="input-group" v-if="field.type == 'select'">
          <label :for="field.name" class="input-group-prepend cursor-pointer">
            <span class="input-group-text">{{field.label}}</span>
          </label>
          <select class="form-control cursor-pointer" :id="field.name" v-model="field.value">
            <option
              v-for="(option, optionKey) in field.values"
              :key="`userData_field_option_${optionKey}`"
              :value="option.value"
            >{{option.option}}</option>
          </select>
        </div>
        <!-- SELECT END -->
        <!-- NUMBER START -->
        <div class="input-group" v-else-if="field.type == 'number'">
          <label :for="field.name" class="input-group-prepend cursor-pointer">
            <span class="input-group-text">{{field.label}}</span>
          </label>
          <input
            :id="field.name"
            type="number"
            class="form-control"
            :step="field.step"
            :min="field.min"
            :max="field.max"
            v-model="field.value"
          />
        </div>
        <!-- NUMBER END -->
        <!-- TEXT START -->
        <div class="input-group" v-else-if="field.type == 'text'">
          <label :for="field.name" class="input-group-prepend cursor-pointer">
            <span class="input-group-text">{{field.label}}</span>
          </label>
          <input :id="field.name" type="text" class="form-control" v-model="field.value" />
        </div>
        <!-- TEXT END -->
        <!-- CHECKBOX START -->
        <div class="input-group" v-else-if="field.type == 'checkbox'">
          <label :for="field.name" class="input-group-prepend cursor-pointer">
            <span class="input-group-text">{{field.label}}</span>
          </label>
          <input
            :id="field.name"
            type="checkbox"
            class="form-control cursor-pointer m-0"
            v-model="field.value"
          />
        </div>
        <!-- CHECKBOX END -->
        <!-- EMAIL START -->
        <div class="input-group" v-else-if="field.type == 'email'">
          <label :for="field.name" class="input-group-prepend cursor-pointer">
            <span class="input-group-text">{{field.label}}</span>
          </label>
          <input :id="field.name" type="email" class="form-control" v-model="field.value" />
        </div>
        <!-- EMAIL END -->
        <!-- COLOR START -->
        <div class="input-group" v-else-if="field.type == 'color'">
          <label :for="field.name" class="input-group-prepend cursor-pointer">
            <span class="input-group-text">{{field.label}}</span>
          </label>
          <input
            :id="field.name"
            type="color"
            class="form-control cursor-pointer"
            v-model="field.value"
          />
        </div>
        <!-- COLOR END -->
        <!-- FILE START -->
        <div class="input-group" v-else-if="field.type == 'file'">
          <label :for="field.name" class="input-group-prepend cursor-pointer">
            <span class="input-group-text">{{field.label}}</span>
          </label>
          <div class="custom-file">
            <input
              :id="field.name"
              type="file"
              class="custom-file-input cursor-pointer"
              @change="function(event){field.value = event.target.files[0]}"
            />
            <label class="custom-file-label" :for="field.name">Choose file</label>
          </div>
        </div>
        <!-- FILE END -->
        <!-- PASSWORD START -->
        <div class="input-group" v-else-if="field.type == 'password'">
          <label :for="field.name" class="input-group-prepend cursor-pointer">
            <span class="input-group-text">{{field.label}}</span>
          </label>
          <input :id="field.name" type="password" class="form-control" v-model="field.value" />
        </div>
        <!-- PASSWORD END -->
        <!-- TEL START -->
        <div class="input-group" v-else-if="field.type == 'tel'">
          <label :for="field.name" class="input-group-prepend cursor-pointer">
            <span class="input-group-text">{{field.label}}</span>
          </label>
          <input :id="field.name" type="tel" class="form-control" v-model="field.value" />
        </div>
        <!-- TEL END -->
      </div>
      <!-- FIELDS END -->
      <!-- SUBMIT BUTTON START -->
      <div class="col-12 col-sm-12 col-md-6 col-lg-6">
        <button v-if="formIsFilled" type="button" class="btn btn-primary btn-block">Submit</button>
        <button v-else type="button" class="btn btn-primary btn-block" disabled="disabled">Submit</button>
      </div>
      <!-- SUBMIT BUTTON END -->
    </div>
  </div>
</template>

<script>
import routingHelpers from "@/mixins/helpers/routingHelpers.js";

export default {
  name: "UserData",

  mixins: [routingHelpers],

  data() {
    return {
      formData: [
        {
          name: "size",
          label: "Größer",
          type: "select",
          value: null,
          values: [
            {
              option: "XL",
              value: "XL"
            },
            {
              option: "L",
              value: "L"
            },
            {
              option: "M",
              value: "M"
            },
            {
              option: "S",
              value: "S"
            },
            {
              option: "XS",
              value: "XS"
            }
          ]
        },
        {
          name: "amount",
          label: "Amount",
          type: "number",
          value: null,
          min: 0,
          max: 999,
          step: 1
        },
        {
          name: "address",
          label: "Address",
          value: null,
          type: "text"
        },
        {
          name: "checkbox",
          label: "Checkbox",
          value: null,
          type: "checkbox"
        },
        {
          name: "email",
          label: "Email",
          value: null,
          type: "email"
        },
        {
          name: "color",
          label: "Color",
          value: null,
          type: "color"
        },
        {
          name: "file",
          label: "File",
          value: null,
          type: "file"
        },
        {
          name: "password",
          label: "Password",
          value: null,
          type: "password"
        },
        {
          name: "tel",
          label: "Tel.",
          value: null,
          type: "tel"
        }
      ]
    };
  },

  props: {
    imageData: {
      type: Object,
      required: true
    },
    product: {
      type: Object,
      required: true
    }
  },

  computed: {
    formIsFilled() {
      let formIsFilled = true;
      this.formData.forEach(data => {
        if (data.value === null) {
          formIsFilled = false;
        }
      });
      return formIsFilled;
    }
  }
};
</script>
