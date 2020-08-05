<template>
  <section class="section section--newses" v-if="news">
<transition name="zoom" mode="out-in">

    <wpis v-if="activeNewsID" @close="close()" :meta="meta" :newsID="activeNewsID" key="news"/>

    <section class="newses" v-else-if="!meta" key="newses">
      <div
        class="news-card"
        v-for="(el, index) in news"
        :key="el + '-' + index"
      ><span class="news-card__date" v-html="date(el.date)"></span>
       
          <h2 class="news-card__title">{{ el.title }}</h2>
          
          <div class="button-container">
            <button class="button button--primary" @click="activeNewsID = el.id">Zobacz całość</button>
          </div>
      </div>
    </section>
</transition>

  </section>
  
</template>
<script>
import Wpis from "@/components/informacje/Wpis";
import firebase, { storage } from "firebase/app";

export default {
  porps: ["width"],
  name: "Aktualnosci",
  data() {
    return {
      activeNewsID: null
    };
  },

  computed: {
    months() {
      return this.$store.state.months.variation;
    },
    firstNews() {
      return this.news[Object.keys(this.news)[0]];
    },
    meta() {
      return this.$route.meta.news;
    },
    news() {
      return this.$store.state.news;
    },
    active() {
      const route = this.$route.path.split("/");
      return route.length > 3 ? true : false;
    }
  },
  methods: {
    close() {
      this.meta ? null : (this.activeNewsID = null);
    },
    date(date) {
      const dateArr = date.split("-"),
        year = dateArr[0],
        month = this.months[dateArr[1] - 1],
        day = dateArr[2];

      return `${day} ${month} ${year}`;
    }
  },
  created() {
    if (!this.$store.news) {
      const db = firebase.firestore();
      db.collection("news")
        .get()
        .then(query => {
          let object = {};
          query.forEach(doc => {
            let item = doc.data();
            item.id = doc.id;
            object[doc.id] = item;
          });
          this.$store.commit("setNews", object);
        })
        .then(
          () => (this.meta ? (this.activeNewsID = this.firstNews.id) : null)
        );
    }
  },
  components: {
    Wpis
  }
};
</script>
