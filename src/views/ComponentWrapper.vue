<template>
    <div class="ComponentWrapper">
        <div class="row mb-3">
            <div class="col-2">
            <!-- BACK BUTTON START -->
            <button
                v-if="$route.name != 'Overview'"
                @click="goBack()"
                class="btn btn-sm btn-secondary"
            >
                <font-awesome-icon icon="arrow-left" class="mr-2" />
                <span>Back</span>
            </button>
            <!-- BACK BUTTON START -->
            </div>
                <div class="col-8 stepWrapper">
                <div class="stepStroke">
                    <div
                        class="stepStrokePart bg-success"
                        :style="`width: ${spacePartWidth}%;`"
                    ></div>
                    <div :class="`stepStrokePart w-${colorPartWidth} bg-primary`"></div>
                </div>
                <div
                    v-for="(step, index) in steps"
                    :key="`componentWrapper_step_${index}`"
                    @click="goBack(index)"
                    :class="stepClass(index)"
                    :title="stepTitle(index)"
                >
                    <span>{{step.title}}</span>
                </div>
            </div>
            <div class="col-2"></div>
            <div class="col-12 text-center mt-3">
                <font-awesome-icon icon="info-circle" class="mr-2 text-secondary" />
                <span>{{steps[step].info}}</span>
            </div>
        </div>
        <keep-alive>
            <router-view />
        </keep-alive>
    </div>
</template>

<script>
export default {
    name: "ComponentWrapper",

    data() {
        return {
            step: 0,
            steps: [
                {
                    info: "Select one of the predefined images or create your own.",
                    title: 1,
                    component: "Overview"
                },
                {
                    info: "Select an audio file, a poster-style and a poster-format.",
                    title: 2,
                    component: "AudioToSvg"
                },
                {
                    info: "Select the product you want to print.",
                    title: 3,
                    component: "ProductSelection"
                },
                {
                    info: "Enter the information needed to send the product.",
                    title: 4,
                    component: "UserData"
                },
                {
                    info: "Please check the data before you submit the request to.",
                    title: 5,
                    component: "CheckInput"
                }
            ]
        }
    },

    methods: {
        stepClass(index) {
            if (index == this.step) {
                return "step rounded-circle bg-primary text-light";
            }
            if (index < this.step) {
                return "step rounded-circle bg-success text-light cursor-pointer";
            }
            return "step rounded-circle bg-secondary text-light cursor-not-allowed";
        },
        stepTitle(index) {
            if (
                index == this.step
                || index < this.step
            ) {
                return this.steps[this.step].info
            }
            return "";
        },
        goBack(directIndex = null) {
            if (directIndex != null) { // if we get a direct index we only want to check wether we are allowed to go there
                if (directIndex < this.step) {
                    this.step = directIndex;
                    this.$router.push({name: this.steps[directIndex].component});
                    return true;
                }
                return false;
            }
            // default: go back one step in the array of steps
            let index = this.step - 1;
            if (index < 0) {
                index = 0;
            }
            this.step = index;
            this.$router.push({name: this.steps[index].component});
        }
    },

    computed: {
        colorPartWidth() {
            if (this.step == 0) {
                return 0;
            } else {
                return "25";
            }
        },
        spacePartWidth() {
            let index = this.step -1;
            if (index < 0) {
                index = 0;
            }
            return (100 / (this.steps.length - 1)) * index;
        }
    }
};
</script>

<style lang="scss">
.stepWrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;

    .stepStroke {
        margin: 0 5%;
        width: 90%;
        height: 5px;
        line-height: 28px;
        top: 12.5px;
        left: 0;
        position: absolute;
        background: lightgray;
        z-index: 1;

        .stepStrokePart {
            height: 5px;
            float: left;
        }
    }

    .step {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        text-align-last: center;
        position: relative;
        z-index: 9;

        * {
            vertical-align: middle;
        }
    }
}
</style>