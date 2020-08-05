<template key="news">

  <section class="news" :class="{show: newsID}" key="news" >
        <h2 class="page-title news__page-title" v-if="meta">Aktulaności</h2>
        <h2 class="red-title">{{news.title}}</h2>
        <span class="news__date">{{ date }}</span>
        <div class="news--ins" v-html="news.text"></div>
        <div class="button-container">
          <button v-if="!meta" class="button button--primary button--square" @click="close">
        <font-awesome-icon :icon="['fas', 'times']"/>

        </button>
      </div>
        
  </section>

</template>
<script>
export default {
  props: ["newsID", "meta"],
  name: "Wpis",
  data() {
    return {};
  },
  computed: {
    news() {
      return this.$store.state.news[this.newsID];
    },
    months() {
      return this.$store.state.months.variation;
    },
    date() {
      const dateArr = this.news.date.split("-"),
        year = dateArr[0],
        month = this.months[dateArr[1] - 1],
        day = dateArr[2];

      return `${day} ${month} ${year}`;
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>
