<template>
  <div id="content">
    <h1>{{ title }}</h1>
    <div id="side-menu">
      <ul>
        <li
          v-for="link in component"
          @click="currentComponent = link"
          :key="link"
          :class="{ activeLink: link == currentComponent }"
        >
          {{ link }}
        </li>
      </ul>
    </div>
    <div id="content-in">
      <transition name="slide-fade" mode="out-in" appear>
        <component :is="currentComponent"></component>
      </transition>
    </div>
  </div>
</template>

<script>
import Choroby from "@/components/donacje/Choroby";
import Kroki from "@/components/donacje/Kroki";
import Sposoby from "@/components/donacje/Sposoby";
import Warunki from "@/components/donacje/Warunki";
import Korzysci from "@/components/donacje/Korzysci";
import Biologia from "@/components/donacje/Biologia";
import Calendar from "@/components/Calendar";

export default {
  name: "Donacje",
  props: ["title"],
  data() {
    return {
      currentComponent: "Calendar",
      component: [
        "Warunki",
        "Choroby",
        "Kroki",
        "Sposoby",
        "Korzyści",
        "Biologia",
        "Calendar"
      ]
    };
  },

  components: {
    Warunki,
    Choroby,
    Kroki,
    Sposoby,
    Korzysci: "Korzyci",
    Biologia,
    Calendar
  }
};
</script>
