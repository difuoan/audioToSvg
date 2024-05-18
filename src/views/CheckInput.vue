<template>
  <div class="checkInput">
        <div class="row">
            <div class="col-12 col-sm-12 col-md-6 col-lg-6 mt-3">
                <h4>Image Preview</h4>
                <div class="card">
                    <img
                        id="imagePreview"
                        :src="imageData.file" alt="image preview"
                        class="w-100 rounded"
                    />
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-6 mt-3">
                <h4>Product Preview</h4>
                <div class="card">
                    <img
                        id="imagePreview"
                        :src="imageData.file" alt="image preview"
                        class="w-100 rounded"
                    />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-sm-12 col-md-6 col-lg-6 mt-3">
                <h4>User Data</h4>
                <div class="border rounded py-2 px-3">
                    <div class="float-left text-right">
                        <span><b>Email</b>:&nbsp;<br></span>
                        <span><b>Name</b>:&nbsp;<br></span>
                        <span v-if="userData.company != null"><b>Company</b>:&nbsp;<br></span>
                        <span v-if="userData.postOfficeBox != null"><b>Post Office Box</b>:&nbsp;<br></span>
                        <span><b>Address</b>:&nbsp;<br></span>
                        <span><b>City</b>:&nbsp;<br></span>
                        <span><b>Country</b>:&nbsp;</span>
                    </div>
                    <div class="float-left text-left">
                        <span>{{userData.email}}<br></span>
                        <span>{{userData.title}} {{userData.name}} {{userData.surname}}{{userData.position != null ? ` (${userData.position})` : ``}}<br></span>
                        <span v-if="userData.company != null">{{userData.company}}<br></span>
                        <span v-if="userData.postOfficeBox != null">{{userData.postOfficeBox}}<br></span>
                        <span>{{userData.street}} {{userData.streetNumber}}<br></span>
                        <span>{{userData.postalCode}} {{userData.city}}<br></span>
                        <span>{{userData.country}}</span>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-6 mt-3">
                <h4>Payment Data</h4>
                <div class="border rounded py-2 px-3">
                    <div class="float-left text-right">
                        <span><b>Payment Method</b>:&nbsp;<br></span>
                        <span><b>Payment Details</b>:&nbsp;<br></span>
                    </div>
                    <div class="float-left text-left">
                        <span>{{userData.paymentMethod}}<br></span>
                        <span></span> <!-- TODO: ADD PAYMENT DETAILS (detailing what account etc. the user has; needs to be added to the UserData.vue as well) -->
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
        <div class="text-right">
            <button
                @click="finaliseOrder()"
                class="btn btn-primary"
                type="button"
            >Buy</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "CheckInput",

    props: {
        imageData: {
            type: Object,
            required: true
        },
        product: {
            type: Object,
            required: true
        },
        userData: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            merchantId: "7a66639e-d550-4133-86e9-9d04490ecc7c",
            apiKey: "test_120c3439-753a-4857-9e56-4a17523faa58"
        }
    },

    methods: {
        finaliseOrder() {
            alert("not implemented yet");
        }
    }
};
</script>
