<template>
  <section class="news">
    <h1>{{ news.title }}</h1>
    <span>{{ news.date }}</span>
    <div class="news--ins" v-html="news.text"></div>
  </section>
</template>
<script>
export default {
  porps: ["prop"],
  name: "Wpis",
  data() {
    return {
      news: null
    };
  },
  mounted() {
    this.news = this.prop;
  }
};
</script>
