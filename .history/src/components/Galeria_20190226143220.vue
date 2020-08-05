<template>
    <div>
        <h1 class="page-title">{{ title }}</h1>
        <div id="galleries" v-if="activeGallery == false ">
            <div class="gallery-card" v-for="(item, id) in list" :key="item+id" >
                <div class="gallery-cover">
                    <img  :src="item.url+' (1).jpg'">
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
          list:[
              {
                  title:"VIII Kongres SHDK RP",
                  url:{},
                  desc:`To już VIII kongres Stowaryszenia Honorowych Dawców Krwi Rzeczpospolitej Polskiej na którym byli obecni 
                  przedstawiciele naszego klubu `,
                  number:101,
                  
              },
            //    {
            //       title:"VIII Kongres SHDK RP",
            //       url:"http://klubhdkferstena.pl/wp-content/uploads/hdkvu/VIII Kongres SHDK RP",
            //       desc:`To już VIII kongres Stowaryszenia Honorowych Dawców Krwi Rzeczpospolitej Polskiej na którym byli obecni 
            //       przedstawiciele naszego klubu `,
            //       number:101
            //   },
            //    {
            //       title:"VIII Kongres SHDK RP",
            //       url:"http://klubhdkferstena.pl/wp-content/uploads/hdkvu/VIII Kongres SHDK RP",
            //       desc:`To już VIII kongres Stowaryszenia Honorowych Dawców Krwi Rzeczpospolitej Polskiej na którym byli obecni 
            //       przedstawiciele naszego klubu `,
            //       number:101
            //   },
            //   {
            //       title:"Listwa",
            //       url:"http://klubhdkferstena.pl/wp-content/uploads/hdkvu/VIII Kongres SHDK RP",
            //       number:50
            //   }
          ]
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
      axios.get(this.gallery)
        .then()
    this.list.forEach((item) => { item.url.photo = 'http://vtest.klubhdkferstena.pl/photo'+this.title+'/'+this.title;  console.log(this.url.photo)})
  }
  
  
}
</script>