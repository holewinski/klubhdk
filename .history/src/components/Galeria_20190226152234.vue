<template>
    <div>
        <h1 class="page-title">{{ title }}</h1>
        <div id="galleries" v-if="activeGallery == false ">
            <div class="gallery-card" v-for="(item, id) in list" :key="item+id" >
                <div class="gallery-cover">
                    <img  :src="item.url.thumb+' (1).jpg'">
                    <h3>{{ item.title}}</h3>
                </div>
                <div class="gallery-info">
                    <span class="number"><font-awesome-icon :icon="['fas', 'images']" /> {{item.number}}</span>
                    <p class="description">{{ item.desc }}</p>
                    <span class="play"  @click="activeGallery=item, activeComponent = 'slide-show'"><font-awesome-icon :icon="['fas', 'play-circle']" />Pokaz zdjęć</span>
                    <span class="grid"  @click="activeGallery=item, activeComponent = 'gallery-grid'"><font-awesome-icon :icon="['fas', 'th']" />Wszystkie zdjęcia</span>
                </div>
                
            </div>
        </div>
        <component v-else @clicked="changeGallery" :is="activeComponent" :gallery="activeGallery" :act-slide="1"></component>

        
    </div>
</template>
<script>

import SlideShow from '@/components/galeria/SlideShow';
import GalleryGrid from '@/components/galeria/GalleryGrid';
import axios from "axios";

export default {
  name: 'Galeria',
  
  data () {
      return {
          activeGallery:false,
          activeComponent:null,
          title:'Galeria',
          list:[]
      }
  },
  methods:{
      changeGallery(value){
          this.activeGallery = value;
          this.title = this.activeGallery.title;
      }
  },
  components:{
      SlideShow,
      GalleryGrid
  },
  created(){
    axios.get(this.endpoint)
        .then(response => this.list = response.data);

    this.list.forEach((item) => { 
        item.url.photo = 'http://vtest.klubhdkferstena.pl/assets/photo/'+item.title+'/'+item.title;  console.log(item.url.photo)
        item.url.thumb = 'http://vtest.klubhdkferstena.pl/assets/thumb/'+item.title+'/'+item.title;  console.log(item.url.thumb)
        })
  }
  
  
}
</script>