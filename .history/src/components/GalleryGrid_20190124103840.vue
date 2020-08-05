<template>
    <div id="gallery">
        <form >
	        <select name="nazwa">
                <option v-for="option in options" :key="option" @click="onPage = option">{{ option }}</option>
	        </select>
        </form>
            <div class="thumbnail" 
                v-for="(photo, id) in gallery.number" 
                :key="id"
                @click="slideShow = true, firstRender = true, activeSlide = id+1">
                <img :src="gallery.url+' ('+(id+1)+').jpg'">
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
            onPage:20
        }
    },
    computed:{
        numOfPage(){
            return Math.ceil(this.gallery.number / this.onPage);
        }
    },
    components:{
        SlideShow
    }
}
</script>