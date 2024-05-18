<template>
  <div class="productSelection">
    <!-- PRODUCT SELECTION START -->
    <!-- TODO: ADD A BETTER LOADER (USE APOLLO) -->
    <div v-if="$apollo.loading">Loading...</div>
    <div class="row px-2">
      <div
        v-for="(product, index) in products"
        :key="`productselection_productcard_${index}`"
        class="col-4 col-lg-4 col-md-6 col-sm-12 p-2"
      >
        <!-- TODO: GET PRICES (AND PRODUCTS) FROM THE API (POST /v3.0/catalogue/prodigi%20direct/destination/{countryCode}/prices); ALSO SOMEHOW FIND OUT THE CUSTOMERS COUNTRY BEFORE HE SETS IT IN THE USER-DATA-COMPONENT (MAYBE JUST GUESS IT AND ADD SOME INFO TO THE PRICE UNTIL WE KNOW BETTER) -->
        <!-- TODO: MOVE THE DATA, THE METHODS AND EVERYTHING ELSE INTO THE COMPONENT-WRAPPER-FILE AND MAKE THAT THE NEW FIRST-PARENT SO WE CAN EASILY SHARE DATA AND METHODS AMONG ALL COMPONENTS -->
        <div
          @click="rerouteToUserData(product, imageData)"
          class="card cursor-pointer"
        >
          <h4 class="p-2 m-0">{{ product.name }}</h4>
          <!-- PREVIEW START -->
          <img
            :src="imageData.file"
            alt="image preview"
            class="px-2 imagePreview"
          />
          <!-- PREVIEW END -->
          <!-- PRODUCT INFORMATION START -->
          <div class="productInformation p-2">
            <span>Product: {{ product.name }} €</span>
            <!-- TODO: ADD FUNCTIONALITY TO FIND OUT CURRENCY OF USER AND CONVERT PRICE TO THAT CURRENCY -->
            <br />
            <span>Price: {{ product.price }} €</span>
          </div>
          <!-- PRODUCT INFORMATION END -->
        </div>
      </div>
    </div>
    <!-- PRODUCT SELECTION END -->
  </div>
</template>

<script>
import routingHelpers from "@/mixins/helpers/routingHelpers.js";
import gql from "graphql-tag";

export default {
  name: "ProductSelection",

  mixins: [routingHelpers],

  apollo: {
    products: gql`query {
        products {
          data {
            name
            slug
            description
            brand
            image
            type {
              name
              slug
            }
            subtype {
              name
              slug
              type {
                name
                slug
              }
              created_at
              updated_at
              deleted_at
            }
            options {
              name
              slug
              values {
                label
                value
              }
            }
            files {
              slug
              price
              type {
                slug
                label
              }
            }
            created_at
            updated_at
            deleted_at
          }
        }
      }`,
  },

  props: {
    imageData: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      products: [
        {
          name: "t-shirt",
          price: 25, // The amount (in cents/pence) that Pwinty will charge you for this product.
          currency: null, // Currency code in which product is priced.
          sku: null, // An identification code of the product.
        },
        // TODO: ADD BILLING, COMPANY AND OTHER DATA IN PWINTY-DASHBOARD
        {
          name: "poster",
          price: 15,
          currency: null,
          sku: null,
        },
        {
          name: "pillow",
          price: 40,
          currency: null,
          sku: null,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.productSelection {
  .imagePreview {
    width: 100%;
    height: auto;
  }
}
</style>
