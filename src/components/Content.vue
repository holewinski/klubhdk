<template>
  <main class="content">
    <div class="content__menu" v-if="childrenArray">
      <transition name="slide-fade" mode="out-in" appear>
        <ul class="list">
          <router-link
            v-for="{ name, path } in childrenArray"
            :to="path"
            :key="name"
            tag="li"
            class="menu__link"
            :class="{ 'active-link': includesPath(path) }"  
          exact>
            {{ name }}
          </router-link>
        </ul>
      </transition>
    </div>
    <div class="content__inside">
      <transition :name="transitionName" mode="out-in">
        <router-view :key="currentPath"></router-view>
      </transition>
    </div>
  </main>
</template>

<script>
import Choroby from "@/components/donacje/Choroby";
import Kroki from "@/components/donacje/Kroki";
import Sposoby from "@/components/donacje/Sposoby";
import Warunki from "@/components/donacje/Warunki";
import Korzysci from "@/components/donacje/Korzysci";
import Biologia from "@/components/donacje/Biologia";
import Calendar from "@/components/Calendar";
import Klub from "@/components/historia/Klub";
import Patron from "@/components/historia/Patron";
import Kontakt from "@/components/informacje/Kontakt";
import Aktualnosci from "@/components/informacje/Aktualnosci";
import Galeria from "@/components/Galeria";
import Wpis from "@/components/informacje/Wpis";

export default {
  name: "Content",

  data() {
    return {
      transitionName: "slide-top"
    };
  },
  methods: {
    includesPath(path) {
      return this.currentPath.split("/").includes(path);
    }
  },
  computed: {
    hasChilds() {
      return this.currentPath.split("/").length > 2;
    },
    firstDepth() {
      return this.$router.options.routes[0].children;
    },
    childrenArray() {
      const rout = this.$router.options.routes[0].children;
      if (this.hasChilds) {
        const firstPart = this.currentPath.split("/")[1],
          currentObject = rout.find(item => item.path == firstPart);
        return currentObject.children;
      } else {
        return false;
      }
    },
    child() {
      return this.currentPath.split("/")[1];
    },
    currentPath() {
      return this.$route.path;
    }
  },
  components: {
    Warunki,
    Choroby,
    Kroki,
    Sposoby,
    Korzysci: Korzysci,
    Biologia,
    Kalendarz: Calendar,
    Kontakt,
    Klub,
    Patron,
    Galeria,
    Aktualnosci
  },
  watch: {
    $route(to, from) {
      if (this.hasChilds) {
        const toDepth = to.path.split("/"),
          toDepthIndex = this.firstDepth.findIndex(({ path }) => {
            return path == toDepth[1];
          }),
          fromDepth = from.path.split("/"),
          fromDepthIndex = this.firstDepth.findIndex(({ path }) => {
            return path == fromDepth[1];
          }),
          toIndex = this.childrenArray.findIndex(({ name }) => name == to.name),
          fromIndex = this.childrenArray.findIndex(
            ({ name }) => name == from.name
          );
        if (toDepthIndex > fromDepthIndex) {
          this.transitionName = "slide-top";
        } else if (toDepthIndex < fromDepthIndex) {
          this.transitionName = "slide-bottom";
        } else if (toIndex > fromIndex) {
          this.transitionName = "slide-left";
        } else {
          this.transitionName = "slide-right";
        }
      }
    }
  }
};
</script>
