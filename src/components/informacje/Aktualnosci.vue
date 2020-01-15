<template>
  <div>
    <section class="newses">
      <div
        class="news-card"
        v-for="(el, index) in news"
        :class="{ 'news-card-end': news.length - index <= 3 }"
        :key="el + '-' + index"
      >
        <template v-if="el.text">
          <h1 class="title">{{ el.title }}</h1>
          <span v-html="news.short(el.text)">{{}}</span>
          <button @click="actNews = el" class="primary-button">
            Więcej...
          </button>
        </template>
      </div>
    </section>
    <Wpis v-if="actNews != null" :prop="actNews"></Wpis>
  </div>
</template>
<script>
import Wpis from "@/components/informacje/Wpis";

export default {
  porps: ["width"],
  name: "Aktualnosci",
  data() {
    return {
      news: null,
      actNews: null
    };
  },

  created() {
    fetch("http://vtest.klubhdkferstena.pl/assets/jsons/akt.json")
      .then(resp => resp.json())
      .then(resp => {
        this.news = resp;
        this.news.short = text => text.match(/<p>.*?<\/p>/).join();
        while (this.news.length % 3 != 0) {
          this.news.push({});
        }
      });
  },
  components: {
    Wpis
  }
};
</script>
