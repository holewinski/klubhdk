<template>
  <div>
    <transition name="slide-fade" mode="out-in">
      <h1 class="page-title" :duration="300" :key="title">{{ title }}</h1>

    </transition>
    <transition name="zoom" mode="out-in">
      <div id="galleries" v-if="activeGallery == false " key="galleries">
      <div class="gallery-card" v-for="(item, id) in list" :key="item+id">
        <div
          class="gallery-cover"
          :style="{ backgroundImage: 'url(\''+item.url.photo+' ('+item.thumb+').jpg\')'}"
        >
          <h3>{{ item.title}}</h3>
        </div>
        <div class="gallery-info">
          <span class="number">
            <font-awesome-icon :icon="['fas', 'images']"/>
            {{item.number}}
          </span>
          <p class="description">{{ item.desc }}</p>
          <span class="play" @click="activeGallery=item, activeComponent = 'slide-show'">
            <font-awesome-icon :icon="['fas', 'play-circle']"/>Pokaz zdjęć
          </span>
          <span class="grid" @click="activeGallery=item, activeComponent = 'gallery-grid', title = item.title">
            <font-awesome-icon :icon="['fas', 'th']"/>Wszystkie zdjęcia
          </span>
        </div>
      </div>
    </div>
    <GalleryGrid
      v-else
      @clicked="changeGallery"
      :is="activeComponent"
      :gallery="activeGallery"
      :act-slide="1"
      :key="activeComponent"
    ></GalleryGrid>
    </transition>
    
  </div>
</template>
<script>
import SlideShow from "@/components/galeria/SlideShow";
import GalleryGrid from "@/components/galeria/GalleryGrid";

export default {
  name: "Galeria",
  props: { endpoint: String },
  data() {
    return {
      activeGallery: false,
      activeComponent: null,
      title: "Galeria",
      list: []
    };
  },
  methods: {
    changeGallery(value) {
      this.activeGallery = value;
      this.title = "Galeria";
    }
  },
  components: {
    SlideShow,
    GalleryGrid
  },
  created() {
    fetch("http://vtest.klubhdkferstena.pl/assets/jsons/galleries.json")
      .then(resp => resp.json())
      .then(resp => {
        this.list = resp;
        this.list.forEach(item => {
          item.url.photo =
            "http://vtest.klubhdkferstena.pl/assets/photo/" +
            item.title +
            "/" +
            item.title;
          item.url.thumb =
            "http://vtest.klubhdkferstena.pl/assets/thumb/" +
            item.title +
            "/" +
            item.title;
        });
      });
  }
};
</script>
