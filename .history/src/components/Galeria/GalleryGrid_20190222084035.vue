<template>
    <div id="gallery">

        <div id="image-options">
            <div class="back-gallery" @click="nullGallery()">
                <font-awesome-icon :icon="['fas', 'caret-square-left']" /> 
            wróć
            </div>
            
	        <div class="select-option" @click="changingNumber = !changingNumber" >
                <span>Ilosć zdjęć na stronie</span>
                <font-awesome-icon :icon="['fas', 'caret-down']" />
                <span class="current-option">{{ onPage }}</span>
                <div class="options" :class="{active : changingNumber}">
                    <span class="option" 
                    v-for="(option,id) in options" 
                    :key="option" 
                    @click="changeOption(option)"
                    :style="{ transitionDelay : '0.'+id+'s' }">
                         {{ option }}
                    </span>
                </div>
               
	        </div>
        </div>
        <transition-group 
        name="slide-fade" 
        tag="div" 
        id="thumbnail-grid">
            <div class="thumbnail" 
            v-for="(photo, id) in onThisPage" 
            :key="id" 
            @click="slideShow = true, firstRender = true, activeSlide = id+1">
                <img :src="gallery.url+' ('+(id+1+(page-1)*onPage)+').jpg'">
            </div>
        </transition-group>
        <div id="pages">
            <font-awesome-icon 
            :icon="['fas', 'caret-left']" 
            @click="changePage(-1)" 
            :class="{ 'un-active' : page == 1 }"/> 
            <span>{{page}}</span>
            <font-awesome-icon 
            :icon="['fas', 'caret-right']" 
            @click="changePage(1)" 
            :class="{ 'un-active' : page == numOfPages }"/> 
        </div>
            <slide-show 
            @clicked="changeGallery"
            :gallery="gallery"
            :act-slide="activeSlide" 
            v-show="slideShow" 
            v-if="firstRender"></slide-show>
    </div>
        
</template>
<script>

import SlideShow from '@/components/Galeria/SlideShow'

export default {
    name: 'GalleryGrid',
    props:['gallery'],
    data(){
        return{
            slideShow:false,
            firstRender:false,
            activeSlide:1,
            options:[20,30,40,50],
            page:1,
            onPage:20,
            changingNumber:false
        }
    },
    computed:{
        
        numOfPages(){
            return Math.ceil(this.gallery.number / this.onPage);
        },
        onThisPage(){
            if(this.page == this.numOfPages){
                return this.gallery.number - this.onPage*(this.page-1)
            }
            else{
                return this.onPage
            }
        },
        photoId(){
            
        }
    },
    methods:{
        changeGallery(value){
          this.slideShow = value;
      },
        changeOption(option){
            this.onPage = option;
            if(this.page > this.numOfPages){
                this.page = this.numOfPages;
            }
        },
        nullGallery(event){
            this.$emit('clicked',false);
        },
        changePage(a){
            
            if(this.page+a == 0 || this.page+a > this.numOfPages){

            }
            else{
                this.page+=a;
                document.querySelector('#thumbnail-grid').scrollIntoView({ behavior: 'smooth' });
            }
        }
    },
    components:{
        SlideShow
    }
}
</script>