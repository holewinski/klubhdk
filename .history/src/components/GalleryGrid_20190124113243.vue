<template>
    <div id="gallery">
        <form >
	        <div class="select-option">
                <div class="option" v-for="option in options" :key="option" @click="onPage = option">{{ option }}</div>
	        </div>
        </form>
        <div id="thumbnail-grid">
            <div class="thumbnail" 
                v-for="(photo, id) in onThisPage" 
                :key="id"
                @click="slideShow = true, firstRender = true, activeSlide = id+1">
                <img :src="gallery.url+' ('+(id+1+(page-1)*onPage)+').jpg'">
            </div>
        </div>
        <div id="pages">
            <font-awesome-icon :icon="['fas', 'caret-left']" @click="changePage(-1)" :class="{ 'un-active' : page == 1 }"/> 
            <span>{{page}}</span>
            <font-awesome-icon :icon="['fas', 'caret-right']" @click="changePage(1)" :class="{ 'un-active' : page == numOfPages }"/> 
        </div>
            <slide-show :gallery="gallery" :active-slide="activeSlide" v-show="slideShow" v-if="firstRender"></slide-show>
    </div>
        
</template>
<script>

import SlideShow from '@/components/SlideShow'

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
            onPage:this.option[0]
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
        changePage(a){
            if(this.page+a == 0 || this.page+a > this.numOfPages){

            }
            else{
                this.page+=a;
            }
        }
    },
    components:{
        SlideShow
    }
}
</script>