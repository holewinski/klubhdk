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
    props:['gallery','activeSlide'],
    data(){
        return{
            isLoading:false,
            mouseover:false
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
            
            setInterval(()=>{ 
                this.activeSlide++;
            },1000)
            
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
