import Vue from "vue";
import App from "./App";
import router from "./router";
import * as firebase from "firebase/app";
import * as firebaseui from 'firebaseui'
import "firebase/database";

import {
  library
} from "@fortawesome/fontawesome-svg-core";

import {
  faCaretRight,
  faCaretLeft,
  faTimes,
  faCalendarAlt,
  faMapMarkedAlt,
  faBars,
  faFilePdf,
  faImages,
  faTh,
  faPlayCircle,
  faChevronRight,
  faChevronLeft,
  faSpinner,
  faPlay,
  faCaretDown,
  faCaretSquareLeft,
  faPause,
  faClock,
  faPlusSquare,
  faMinusSquare,
  faEye
} from "@fortawesome/free-solid-svg-icons";

import {
  FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";

export const Events = new Vue();

library.add(
  faCaretRight,
  faCaretLeft,
  faTimes,
  faCalendarAlt,
  faMapMarkedAlt,
  faBars,
  faFilePdf,
  faImages,
  faTh,
  faPlayCircle,
  faChevronRight,
  faChevronLeft,
  faSpinner,
  faPlay,
  faCaretDown,
  faCaretSquareLeft,
  faPause,
  faClock,
  faPlusSquare,
  faMinusSquare,
  faEye
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
const firebaseConfig = {
  apiKey: "AAAAsvZ0VJU:APA91bHTIKz-LddY-2I7b9dit-V8ESovZ-vQAqeANqTjaUc0im5eZL3qNXmt8GSCSKzyx9wZoqL4qlzoCjeNNnSg5fLzGze29lRIRFAjvl7hiYSC8udfC67wfcAO_ICB044aqNicwjez",
  authDomain: "klubhdk-b275c.firebaseapp.com",
  databaseURL: "https://klubhdk-b275c.firebaseio.com",
  projectId: "klubhdk-b275c",
  storageBucket: "klubhdk-b275c.appspot.com",
  messagingSenderId: "768638997653"
};
firebase.initializeApp(firebaseConfig);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
