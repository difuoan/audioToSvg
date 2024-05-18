// VUE STANDARD
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// VUE STANDARD END

// AXIOS
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
// AXIOS END

// APOLLO
import ApolloClient from "apollo-boost";
const apolloClient = new ApolloClient({
  uri: "https://api.audio-to-svg.venturini.codes/graphql",
});
import VueApollo from "vue-apollo";
Vue.use(VueApollo);
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
// APOLLO END

// BOOTSTRAP
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import "popper.js";
import "bootstrap";
import "./assets/css/app.scss";
// BOOTSTRAP END

// FONTAWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faInfoCircle,
  faCogs,
  faEye,
  faTasks,
  faExclamation,
  faExclamationTriangle,
  faHeading,
  faSignInAlt,
  faChessBoard,
  faTrash,
  faMinus,
  faArrowLeft,
  faUserPlus,
  faArrowAltCircleRight,
  faArrowRight,
  faArrowUp,
  faArrowDown,
  faUpload,
  faWaveSquare,
  faPaintRoller,
  faCaretDown,
  faCaretUp,
  faCopy,
  faPlus,
  faStopCircle,
  faClipboard,
  faFont,
  faUndo,
  faArrowsAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare, faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faInfoCircle,
  faCogs,
  faEye,
  faExclamation,
  faCopy,
  faArrowUp,
  faClipboard,
  faArrowDown,
  faCaretDown,
  faHeading,
  faArrowRight,
  faWaveSquare,
  faPaintRoller,
  faTrash,
  faCaretUp,
  faSignInAlt,
  faExclamationTriangle,
  faSquare,
  faMinus,
  faChessBoard,
  faArrowAltCircleRight,
  faUserPlus,
  faArrowLeft,
  faPlus,
  faUpload,
  faStopCircle,
  faFont,
  faTasks,
  faArrowsAlt,
  faUndo,
  faAddressCard
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
// FONTAWESOME END

// CUSTOM GLOBAL COMPONENTS START
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
Vue.component("LoadingSpinner", LoadingSpinner);
// CUSTOM GLOBAL COMPONENTS END

// ANIMATE CSS
import "animate.css/animate.css";
// ANIMATE CSS END

// VUE STANDARD
Vue.config.productionTip = false;
// VUE STANDARD END

// VUE APP
new Vue({
  router,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
// VUE APP END
