import Vue from "vue";
import Vuex from "vuex"
import App from "./App";
import router from "./router";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";

import vuexStore from './store.js';
const store = vuexStore;

import firebaseConfig from './apiKeys.js'
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

import {
  library
} from "@fortawesome/fontawesome-svg-core";

import {
  faTerminal,
  faCode,
  faListOl,
  faListUl,
  faParagraph,
  faQuoteRight,
  faRedo,
  faUndo,
  faStrikethrough,
  faUnderline,
  faBold,
  faItalic,
  faCaretRight,
  faCaretLeft,
  faTimes,
  faCalendarAlt,
  faMapMarkedAlt,
  faBars,
  faFilePdf,
  faImages,
  faImage,
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
  faTerminal,
  faCode,
  faListOl,
  faListUl,
  faParagraph,
  faQuoteRight,
  faRedo,
  faUndo,
  faStrikethrough,
  faUnderline,
  faBold,
  faItalic,
  faCaretRight,
  faCaretLeft,
  faTimes,
  faCalendarAlt,
  faMapMarkedAlt,
  faBars,
  faFilePdf,
  faImages,
  faImage,
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

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
