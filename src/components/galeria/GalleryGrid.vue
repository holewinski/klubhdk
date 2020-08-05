<template>
  <div class="gallery">
      <div class="button-container">
          <button class="button button--primary back-gallery" @click="nullGallery()">
        <font-awesome-icon :icon="['fas', 'caret-left']" />wróć
          </button>
      
      

      
    </div>
    <div class="thumbnail-grid">
      
      <thumbnail 

      v-for="(photo, id) in gallery.number" 
      :key="`${gallery.title}-${id}`"
      @click="openSlidshow(id)"
      :id="id"
      :thumbUrl="gallery.url.thumb"
      />
      </div>
     
      
      
    <transition name="zoom">
      <slide-show

      @clicked="changeGallery"
      :gallery="gallery"
      :act-slide="activeSlide"
      v-show="slideShow"
      v-if="firstRender"
    />
    </transition>
    
  </div>
</template>
<script>
import SlideShow from "@/components/galeria/SlideShow";
import Thumbnail from "@/components/galeria/Thumbnail";

export default {
  name: "GalleryGrid",
  props: ["gallery"],
  data() {
    return {
      slideShow: false,
      firstRender: false,
      activeSlide: 1,
      changingNumber: false,
      observer: null,
      intersected: 0
    };
  },
  methods: {
    changeGallery(value) {
      this.slideShow = value;
    },
    nullGallery(event) {
      this.$emit("clicked", false);
    },
    openSlidshow(id) {
      console.log("halo", id);
      this.slideShow = true;
      this.firstRender = true;
      this.activeSlide = id + 1;
    }
  },
  components: {
    SlideShow,
    Thumbnail
  }
};
</script>
