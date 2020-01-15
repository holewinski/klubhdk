import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import Donacje from '@/components/Donacje'
// import Historia from '@/components/Historia'
import Content from '@/components/Content'
import calendarConf from '@/components/calendarConf'

import responsive from 'vue-responsive'
Vue.use(responsive)

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/donacje',
      name: 'Donacje',
      component: Content
    },
    {
      path: '/informacje',
      name: 'Informacje',
      component: Content
    }, {
      path: '/asd',
      name: 'calendarConf',
      component: calendarConf
    },
    {
      path: '/galeria',
      name: 'Galeria',
      component: Content
    },
    {
      path: '/historia',
      name: 'Historia',
      component: Content
    }
  ]
})
