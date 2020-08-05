<template>
    <div id="slide-show" @mousemove="showPanel($event)" :class="{hide : !mouseMove}" @keydown.left="changeSlide(-1)" >
        <div id="box" >
            <div id="back" class="panel" :class="{'dis-button' : activeSlide == 1}" @click="changeSlide(-1)">
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </div>
             <div id="panel" class="panel" >

                    
                    <span class="play-pause" :class="{playing : slideShowPlay}">
                        <font-awesome-icon :icon="['fas', 'play']" @click="slideShowPlay = true, slideShow()"/>
                        <font-awesome-icon :icon="['fas', 'pause']" @click="slideShowPlay = false "/>
                    </span>
                    <div class="set-time" >
                        <span>Prędkość:</span>
                        <span 
                        v-for="(option,index) in timeOptions" 
                        class="option-time" 
                        :class="{active : playTime == option}"
                        @click="playTime = option" 
                        :key="option"> {{index+1}}x </span>
                       
                        
                    </div>
                    

                </div>
                <font-awesome-icon :icon="['fas', 'times']" class="panel" @click="nullGallery()"/>
                <div :class="{loading : isLoading == true, mouseover : mouseover }" id="slide">
                    <img :src="src">
                    <span class="slide-number panel" >{{ activeSlide }}/{{ gallery.number }}</span>    
                    <font-awesome-icon :icon="['fas', 'spinner']" />
                </div>
            <div id="next" class="panel" :class="{'dis-button' : activeSlide == gallery.number}" @click="changeSlide(1)">
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </div>
        </div>
        
        
    </div>
</template>
<script>

import { preloadImage } from "../../helpers" 

export default {
    name:'SlideShow',
    props:['gallery','actSlide'],
    data(){
        return{
            isLoading:false,
            mouseover:false,
            activeSlide: JSON.parse(this.actSlide),
            slideShowPlay: false,
            playTime: 3,
            timeOptions:[3,5,8],
            mouseMove:false,
            mouseX:0,
            mouseY:0,
            timeoutMouse:null,
            timeoutSlideshow:null
        }
    },
    computed:{
        // activeSlide(){
        //     return JSON.parse(this.actSlide);
        // },
        src(){
            return this.gallery.url.photo+' ('+( this.activeSlide)+').jpg';
        }
    },
    wtach: {
        actSlide:function(){
            this.activeSlide = JSON.parse(this.actSlide);
            
        }
    },
    methods:{
        showPanel(e){
            
            this.mouseMove = true;
            clearTimeout(this.timeoutMouse)
            this.timeoutMouse = setTimeout(()=>{
                this.mouseMove = false;
            },1000);
            
        },
        
        nullGallery(event){
            this.$emit('clicked',false);
        },
        slideShow(){
            if(this.activeSlide < this.gallery.number && this.slideShowPlay){
                this.timeoutSlideshow = setTimeout(()=>{
                    this.isLoading = true;
                    preloadImage(this.gallery.url.photo+' ('+( this.activeSlide + 1)+').jpg')
                .then(url =>{
                    this.activeSlide++;
                    this.isLoading = false;
                    this.slideShow();
                })
                    
                },this.playTime *1000)
                
            }
                
        },
        changeSlide(a){
            if(this.activeSlide+a == 0 || this.activeSlide+a > this.gallery.number){

            }else{
                this.isLoading = true;
                preloadImage(this.gallery.url.photo+' ('+( this.activeSlide+a)+').jpg')
                .then(url =>{
                    this.activeSlide+=a;
                    this.isLoading = false;
                })
                
                
            }
        }
    },
    created() {
      var vm = this;
      window.addEventListener('keyup', function(event) {
        // If down arrow was pressed...
        switch (event.keyCode ) { 
            case 39:
                vm.changeSlide(1);
                break;
            case 37:
                vm.changeSlide(-1);
                break;
            default:
            break;
        }
      });
    }
    
}

</script>
