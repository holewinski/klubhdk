<template>
    <div id="slide-show">
        <div id="box" >
            <div id="back" :class="{'dis-button' : activeSlide == 1}" @click="changeSlide(-1)">
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </div>
            <div :class="{loading : isLoading == true, mouseover : mouseover }" id="slide">
                <img :src="src">
                <div id="panel">
                    <font-awesome-icon :icon="['fas', 'play']" @click="slideShow()"/>
                    {{ activeSlide }}/{{ gallery.number }}
                    <font-awesome-icon :icon="['fas', 'times']" @click="nullGallery()"/>
                </div>
                     
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
            slideShowPlay: false
        }
    },
    computed:{
        src(){
            return this.gallery.url+' ('+( this.activeSlide)+').jpg';
        }
    },
    methods:{
        
        nullGallery(event){
            this.$emit('clicked',null);
        },
        slideShow(){
            if(this.activeSlide < this.gallery.number && slideShowPlay){
                setTimeout(()=>{
                    this.isLoading = true;
                    preloadImage(this.gallery.url+' ('+( this.activeSlide+1)+').jpg')
                .then(url =>{
                    this.activeSlide++;
                    this.isLoading = false;
                    this.slideShow();
                })
                    
                },3000)
                
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
