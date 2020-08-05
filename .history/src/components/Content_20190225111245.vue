<template>

    <div id="content">
         
        <div id="side-menu">
            <font-awesome-icon 
            :icon="['fas', 'bars']" 
            />
            <transition name="slide-fade" mode="out-in" appear>
                <ul :key="currMain" :style="{marginTop : -mobileMargin*30+'px'}">
                    <li  
                    v-for="(link, index ) in currMain" 
                    @click="currentComponent = link, windowWidth < 700 ? mobileMargin = index : mobileMargin = 0" 
                    :key="link" 
                    :class="{ activeLink: link == currentComponent}" >
                        {{ link }}
                    </li>
                    
                </ul>
            
            </transition>
        </div>
        
        <div id="content-in">
            <transition name="slide-fade" mode="out-in" appear>
                 <component :is='currentComponent' :legend="true"></component>
            </transition>
           
        </div>
        
    </div>
</template>

<script>

import Choroby from '@/components/donacje/Choroby'
import Kroki from '@/components/donacje/Kroki'
import Sposoby from '@/components/donacje/Sposoby'
import Warunki from '@/components/donacje/Warunki'
import Korzysci from '@/components/donacje/Korzysci'
import Biologia from '@/components/donacje/Biologia'
import Calendar from '@/components/Calendar'
import Klub from '@/components/historia/Klub'
import Patron from '@/components/historia/Patron'
import Kontakt from '@/components/informacje/Kontakt'
import Galeria from '@/components/Galeria'

export default {
  name: 'Content', 
  
    data () {
        return {
            donacje:[ 'Warunki','Choroby','Kroki','Sposoby', 'Korzysci', 'Biologia' ],
            historia:[ 'Klub','Patron'],
            informacje:['Kalendarz', 'Kontakt'],
            galeria:['Galeria'],
            currentComponent:null,
            currMain:null,
            mobileMargin: 0,
            windowWidth: document.documentElement.clientWidth,
        }
    },
    computed:{
        
    },
    watch:{
        $route: function(to, from){
            console.log(10)
            switch(this.$route.path){
                case '/donacje':
                    this.currMain = this.donacje
                    console.log(this.$route.path)
                    break;                
                case '/historia':
                    this.currMain = this.historia
                    console.log(this.$route.path)
                    break;
                case '/informacje':
                    this.currMain = this.informacje
                    console.log(this.$route.path)
                    break;
                case '/galeria':
                    this.currMain = this.galeria;
                    break;
            }
            this.currentComponent = this.currMain[0];
        }
    },
    // computed:{
    //     currMain(){
    //         switch(this.$route.path){
    //             case '/donacje':
    //                 return this.donacje
    //                 break;
    //             case '/historia':
    //                 return this.historia
    //                 break;
    //        }
    //    },
    //    currentComponent() {
    //        return 
    //    }
    // },
    created(){
        switch(this.$route.path){
            case '/donacje':
                this.currMain = this.donacje
                console.log(this.$route.path)
                break;                
            case '/historia':
                this.currMain = this.historia
                console.log(this.$route.path)
                break;
            case '/informacje':
                this.currMain = this.informacje
                console.log(this.$route.path)
                break;
            case '/galeria':
                this.currMain = this.galeria
                break;
        }
        this.currentComponent = this.currMain[0];
        
        
    },
    components: {
                Warunki,
                Choroby,
                Kroki,
                Sposoby,
                Korzysci,
                Biologia,
                'Kalendarz':Calendar,
                Kontakt,
                Klub,
                Patron,
                Galeria
            }
    }
</script>