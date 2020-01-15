<template>
  <div>
    <h1>Najbliższe wydarzenie</h1>
    <div class="calendar-card" :class="event.type.key">
      <div class="date">
        <div class="month">{{ months[event.month] }}</div>
        <div class="day">{{ event.day }}</div>
        <div class="year">{{ event.year }}</div>
      </div>

      <div class="info">
        <div class="type">
          <span class="type-name">{{ event.type.name }}</span>
          <p class="type-desc">{{ event.desc }}</p>
        </div>
        <div class="place">
          <span class="place-name">{{ event.place.name }}</span>
          <p class="place-adres">
            <a :href="`https://www.google.com/maps/place/${mapUrl}`">
              <font-awesome-icon :icon="['fas', 'map-marked-alt']" />
              {{ event.place.adres }}</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["event", "months"],
  data() {
    return {};
  },
  computed: {
    mapUrl() {
      return this.event.place.adres.replace(/ /g, "+");
    }
  },
  methods: {
    closeEvent() {
      this.$emit("close", false);
    }
  }
};
</script>
