import Vue from 'vue'
import App from './App'
import router from './router'
// import vGallery from 'v-gallery'
// Vue.use(vGallery);
import { library } from '@fortawesome/fontawesome-svg-core'

import {   
  faCaretRight,
  faCaretLeft ,
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
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'



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
  faMinusSquare, )

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
