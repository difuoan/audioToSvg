import Vue from "vue";
import Router from "vue-router";
import AudioToSvg from "./views/AudioToSvg.vue";
import ProductSelection from "./views/ProductSelection.vue";
import Overview from "./views/Overview.vue";
import UserData from "./views/UserData.vue";
import CheckInput from "./views/CheckInput.vue";
import ComponentWrapper from "./views/ComponentWrapper.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: ComponentWrapper,
      props: true,
      redirect: "/overview",
      children: [
        {
          path: "/audiotosvg",
          name: "AudioToSvg",
          component: AudioToSvg,
          props: true
        },
        {
          path: "/productselection",
          name: "ProductSelection",
          component: ProductSelection,
          props: true
        },
        {
          path: "/overview",
          name: "Overview",
          component: Overview,
          props: true
        },
        {
          path: "/userdata",
          name: "UserData",
          component: UserData,
          props: true
        },
        {
          path: "/checkinput",
          name: "CheckInput",
          component: CheckInput,
          props: true
        }
      ]
    }
  ]
});
