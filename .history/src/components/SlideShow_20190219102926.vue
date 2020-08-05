<template>
    <div id="slide-show" @mousemove="showPanel(event)" :class="{panel : mouseMove}">
        <div id="box" >
            <div id="back" :class="{'dis-button' : activeSlide == 1}" @click="changeSlide(-1)">
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </div>
             <div id="panel">

                    

                    <div class="set-time" >
                        <span> 1x </span>
                        <span> 2x </span>
                        <span> 3x </span>
                    </div>
                    <span class="play-pause" :class="{playing : slideShowPlay}">
                        <font-awesome-icon :icon="['fas', 'play']" @click="slideShowPlay = true, slideShow()"/>
                        <font-awesome-icon :icon="['fas', 'pause']" @click="slideShowPlay = false"/>
                    </span>

                </div>
                <font-awesome-icon :icon="['fas', 'times']" @click="nullGallery()"/>
            <div :class="{loading : isLoading == true, mouseover : mouseover }" id="slide">
                <img :src="src">
                <span class="slide-number">{{ activeSlide }}/{{ gallery.number }}</span>
               
                
                     
                <font-awesome-icon :icon="['fas', 'spinner']" />
            </div>
            <div id="next" :class="{'dis-button' : activeSlide == gallery.number}" @click="changeSlide(1)">
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </div>
        </div>
        
        
    </div>
</template>
<script>

import { preloadImage } from "../helpers" 

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
            timeOptions:[3,5,8,10,15],
            mouseMove:false
        }
    },
    computed:{
        src(){
            return this.gallery.url+' ('+( this.activeSlide)+').jpg';
        }
    },
    methods:{
        showPanel(event){
            if(event){
                this.mouseMove = true;
            }
            
        },
        
        nullGallery(event){
            this.$emit('clicked',null);
        },
        slideShow(){
            if(this.activeSlide < this.gallery.number && this.slideShowPlay){
                setTimeout(()=>{
                    this.isLoading = true;
                    preloadImage(this.gallery.url+' ('+( this.activeSlide+1)+').jpg')
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
                preloadImage(this.gallery.url+' ('+( this.activeSlide+a)+').jpg')
                .then(url =>{
                    this.activeSlide+=a;
                    this.isLoading = false;
                })
                
                
            }
        }
    }
}
</script>
