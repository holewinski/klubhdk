<template>
    <div id="content">
        <div id="side-menu">
            <ul>
                <li  v-for="link in component" @click="currentComponent = link" :key="link" :class="{ activeLink: link == currentComponent, disable: slideMenu}">
                    {{ link }}
                </li>
                
            </ul>
            <div class="slide-menu" @click="slideMenu = !slideMenu"><font-awesome-icon :icon="['fas', 'bars']" />  <font-awesome-icon :icon="['fas', 'caret-right']" /> </div>
            
        </div>
        <div id="content-in">
            <transition name="slide-fade" mode="out-in" appear>
                 <component :is='currentComponent'></component>
            </transition>
           
        </div>
        
    </div>
</template>

<script>


import Klub from '@/components/historia/Klub'
import Patron from '@/components/historia/Patron'

export default {
  name: 'Historia', 
  data () {
    return {
      currentComponent:'Klub',
      component:[ 'Klub','Patron'],
      slideMenu:false
    }
  },

  components: {
            Klub,
            Patron
        }
}
</script>