<template>
    <div class="thumbnail"
    :style="!show ? {transform:'scale(0)',opacity:0}: null"
     ref="thumbnail" 
     @click="$emit('click')"
     >
         <img :src="img.src" :key="id"> 
    </div> 
</template>
<script>
export default {
  props: ["id", "thumbUrl"],
  data() {
    return {
      intersected: false,
      observer: null,
      img: new Image(),
      loaded: false
    };
  },

  computed: {
    complete() {
      return this.img.complete;
    },
    show() {
      return this.intersected && this.loaded;
    },

    url() {
      return `${this.thumbUrl} (${this.id + 1}).jpg`;
    }
  },
  methods: {
    oberve() {
      this.img.src = this.url;
      this.intersected = true;
      this.img.complete ? this.observer.disconnect() : null;
    }
  },
  mounted() {
    this.img.onload = () => {
      this.loaded = true;
    };
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.oberve();
        }
      });
    });
    this.observer.observe(this.$refs.thumbnail);
  }
};
</script>
