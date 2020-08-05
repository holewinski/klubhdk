<template>
    <div class="slideshow" @mousemove="showPanel($event)" :class="{hide : !mouseMove}" @keydown.left="changeSlide(-1)" >
        <div id="box" class="slideshow__box " >
            <button id="back" class="slideshow__back slideshow__control" :class="{'dis-button' : activeSlide == 1}" @click="changeSlide(-1)">
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </button>
             <div id="panel" class="slideshow__panel" >

                    
                    <button class="play-pause slideshow__control" :class="{playing : slideShowPlay}">
                        <font-awesome-icon :icon="['fas', 'play']" @click="slideShowPlay = true, slideShow()"/>
                        <font-awesome-icon :icon="['fas', 'pause']" @click="slideShowPlay = false "/>
                    </button>
                    <div class="set-time slideshow__control" >
                        <span>Prędkość:</span>
                        <button 
                        v-for="(option,index) in timeOptions" 
                        class="option-time slideshow__control" 
                        :class="{active : playTime == option}"
                        @click="playTime = option" 
                        :key="option"> {{index+1}}x </button>
                       
                        
                    </div>
                    

                </div>
                <font-awesome-icon :icon="['fas', 'times']" class="slideshow__control" @click="nullGallery()"/>
                <div :class="{loading : isLoading == true, mouseover : mouseover }" class="slideshow__slide" id="slide">
                   
                    <img :src="src" :key="src">

                    <span class="slide-number panel" >{{ activeSlide }}/{{ gallery.number }}</span>    
                    <font-awesome-icon :icon="['fas', 'spinner']" />
                </div>
            <button id="next" class="slideshow__next slideshow__control" :class="{'dis-button' : activeSlide == gallery.number}" @click="changeSlide(1)">
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </button>
        </div>
        
        
    </div>
</template>
<script>
import { preloadImage } from "../../helpers";

export default {
  name: "SlideShow",
  props: ["gallery", "actSlide"],
  data() {
    return {
      isLoading: false,
      mouseover: false,
      activeSlide: JSON.parse(this.actSlide),
      slideShowPlay: false,
      playTime: 3,
      timeOptions: [3, 5, 8],
      mouseMove: false,
      mouseX: 0,
      mouseY: 0,
      timeoutMouse: null,
      timeoutSlideshow: null
    };
  },
  computed: {
    // activeSlide(){
    //     return JSON.parse(this.actSlide);
    // },
    src() {
      return this.gallery.url.photo + " (" + this.activeSlide + ").jpg";
    }
  },
  watch: {
    actSlide: function() {
      this.activeSlide = JSON.parse(this.actSlide);
    }
  },
  methods: {
    showPanel(e) {
      this.mouseMove = true;
      clearTimeout(this.timeoutMouse);
      this.timeoutMouse = setTimeout(() => {
        this.mouseMove = false;
      }, 1000);
    },

    nullGallery(event) {
      this.$emit("clicked", false);
    },
    slideShow() {
      if (this.activeSlide < this.gallery.number && this.slideShowPlay) {
        this.timeoutSlideshow = setTimeout(() => {
          this.isLoading = true;
          preloadImage(
            this.gallery.url.photo + " (" + (this.activeSlide + 1) + ").jpg"
          ).then(url => {
            this.activeSlide++;
            this.isLoading = false;
            this.slideShow();
          });
        }, this.playTime * 1000);
      }
    },
    changeSlide(a) {
      if (
        this.activeSlide + a == 0 ||
        this.activeSlide + a > this.gallery.number
      ) {
      } else {
        this.isLoading = true;
        preloadImage(
          this.gallery.url.photo + " (" + (this.activeSlide + a) + ").jpg"
        ).then(url => {
          setTimeout(() => {
            this.activeSlide += a;
            setTimeout(() => {
              this.isLoading = false;
            }, 50);
          }, 100);
        });
      }
    }
  },
  created() {
    var vm = this;
    window.addEventListener("keyup", function(event) {
      // If down arrow was pressed...
      switch (event.keyCode) {
        case 39:
          vm.changeSlide(1);
          break;
        case 37:
          vm.changeSlide(-1);
          break;
        default:
          break;
      }
    });
  }
};
</script>
