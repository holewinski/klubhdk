import Vue from 'vue'
import Router from 'vue-router'
import RouterView from '@/components/RouterView'
import HelloWorld from '@/components/HelloWorld'
import {
  Biologia,
  Choroby,
  Korzysci,
  Kroki,
  Sposoby,
  Warunki
} from '@/components/donacje/export'
import Klub from '@/components/historia/Klub'
import Patron from '@/components/historia/Patron'
import Aktualnosci from '@/components/informacje/Aktualnosci'
import Kontakt from '@/components/informacje/Kontakt'
import Galeria from '@/components/Galeria'
import Calendar from '@/components/Calendar'
import Content from '@/components/Content'
import calendarConf from '@/components/calendarConf'
import newsConf from '@/components/newsConf'
import Wpis from '@/components/informacje/Wpis'

// import responsive from 'vue-responsive'
// Vue.use(responsive)

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [{
    path: '',
    component: Content,
    redirect: '/home',
    props: true,
    children: [{
      path: '/home',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: { calendar: 'event', news: 1 }
    },
    {
      path: 'donacje',
      component: RouterView,
      props: true,
      redirect: 'donacje/choroby',
      children: [
        {
          path: 'choroby',
          name: 'Choroby',
          component: Choroby

        },
        {
          path: 'biologia',
          name: 'Biologia',
          component: Biologia
        },
        {
          path: 'korzysci',
          name: 'Korzysci',
          component: Korzysci
        },
        {
          path: 'kroki',
          name: 'Kroki',
          component: Kroki
        },
        {
          path: 'sposoby',
          name: 'Sposoby',
          component: Sposoby
        },
        {
          path: 'warunki',
          name: 'Warunki',
          component: Warunki
        }
      ]
    },

    {
      path: 'historia',
      redirect: '/historia/klub',
      name: 'Historia',
      component: RouterView,
      props: true,

      children: [{
        path: 'klub',
        name: "Klub",
        component: Klub
      }, {
        path: 'patron',
        name: "Patron",
        component: Patron
      }]
    },
    {
      path: 'informacje',
      component: RouterView,
      props: true,

      redirect: '/informacje/aktualnosci',
      children: [
        {
          path: 'aktualnosci',
          component: Aktualnosci,
          name: 'Aktualności',

          children: [
            {
              path: ':news',
              name: 'Wpis',
              component: Wpis
            }
          ]
        },
        {
          path: 'kontakt',
          component: Kontakt,
          name: 'Kontakt'
        }, {
          path: 'kalendarz',
          component: Calendar,
          name: 'Kalendarz',
          meta: { calendar: 'list' }

        }]
    },
    {
      path: 'asd',
      name: 'calendarConf',
      component: calendarConf
    },
    {
      path: 'dsa',
      name: 'newsConf',
      component: newsConf
    },
    {
      path: 'galeria',
      name: 'Galeria',
      component: Galeria
    },

    ]
  }]
})
