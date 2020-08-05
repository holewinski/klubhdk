<template>
  <div id="app" class="app">
    <nav class="main-menu" :class="{ show_menu: showMenu }" @click="menuAppear">
      <ul class="main__list">
        <router-link class="main__item" tag="li" to="/home" id="main-link">
          <a class="main__link">
            <img class="main__img" src="@/assets/images/house-outline.png" />
            Start</a>

        </router-link>
        <router-link class="main__item" tag="li" to="/donacje">
          <a class="main__link"><img class="main__img" src="@/assets/images/blood-donation.png" />Donacje</a>

        </router-link>
        <router-link class="main__item" tag="li" to="/historia" id="before-main">
          <a class="main__link">
            <img class="main__img" src="@/assets/images/greek-column.png" />Historia
          </a>
        </router-link>
        <router-link class="main__item" tag="li" to="/informacje" id="after-main">
          <a class="main__link">
            <img class="main__img" src="@/assets/images/news.png" />Informacje
          </a>
        </router-link>
        <router-link class="main__item" tag="li" to="/galeria">
          <a class="main__link">
            <img class="main__img" src="@/assets/images/gallery.png" />Galeria
          </a>
        </router-link>
      </ul>
    </nav>
    <button id="humburger" class="hamburger" :class="{ slide__left: showMenu }" @click="menuAppear">
      <font-awesome-icon class="hamburger--icon" :icon="['fas', 'bars']" />
    </button>
    <div class="banner">
      <img src="./assets/images/logo-ksk.png" />
      <h4 class="banner__text">
        Stowarzyszenie Honorowych Dawców Krwi Rzeczpospolitej Polskiej,
        <br />Klub Honorowych Dawców Krwi im. dr. praw Andrzeja Ferstena
        <br />przy Centrali PKP S.A. w Warszawie
      </h4>
    </div>
    <router-view />

    <footer id="footer" class="footer">
      <div class="footer__contact">
        <h3 class="title"> Klub HDK im. dr. praw Andrzeja Festena<br>
          przy Centrali PKP S.A. w Warszawie
        </h3>
        <ul>
          <li>ul. Szczęśliwicka 62, Warszawa</li>
          <li>KRS: 0000186577</li>
          <li>tel.: <a href="tel:608 466 933" class="link">608 466 933</a></li>
          <li>e-mail: <a href="mailto:prezes@klubhdkferstena.pl" class="link">prezes@klubhdkferstena.pl</a></li>
        </ul>
      </div>
      <div class="footer__shdk">
        <p>Klub należy do</p>
        <a href="http://shdkrp.pl/">
          <img src="@/assets/images/SHDK.png" />
        </a>
      </div>

    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      showMenu: false
    };
  },
  methods: {
    menuAppear() {
      this.showMenu = !this.showMenu;
    }
  },
  created() {
    if (this.$store.state.currentDate == null) {
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          this.date = new Date(xmlHttp.responseText.replace(/"*\\*"/gm, ""));
          this.$store.commit("setCurrentDate", this.date);
        }
      };
      xmlHttp.open(
        "GET",
        " https://us-central1-klubhdk-b275c.cloudfunctions.net/actualDate ",
        true
      );
      xmlHttp.send(null);
    }
  }
};
</script>
<style>
@import "/assets/css/style.css";
</style>
