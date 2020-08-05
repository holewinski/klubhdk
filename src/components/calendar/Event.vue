<template>
  <div>
    <h2 class="page-title">Aktualna data</h2>
    <div
      v-if="event"
      class="calendar-card"
      :class="event.type.key"
    >
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
            <a
              :href="
                `https://www.google.com/maps/place/${this.event.place.adres}`
              "
            >
              <font-awesome-icon :icon="['fas', 'map-marked-alt']" />
              {{ event.place.adres }}</a
            >
          </p>
        </div>
      </div>
    </div>
    <div class="calendar-card brak" v-else>
      <div class="date">
        <div class="month">{{ months[currentDater.month] }}</div>
        <div class="day">{{ currentDater.day }}</div>
        <div class="year">{{ currentDater.year }}</div>
      </div>
      <div class="info">
        <div class="type">
          <span class="type__name">Brak zaplanowanych wydarzeń</span>
          <p class="type__desc type__desc--alert">Z powodu pandemii wszystkie klubowe akcje zostają odwołane.
            <br>
            Wszystkie donacje zostaną zakwalifikowane jako udział w akcji klubowej.
            </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["event"],
  data() {
    return {};
  },
  computed: {
    months() {
      return this.$store.state.months.ordinary;
    },
    currentDater() {
      const fullDate = this.$store.state.currentDate;
      return {
        month: fullDate.getMonth(),
        year: fullDate.getFullYear(),
        day: fullDate.getDate()
      };
    },
    currentMonth() {}
  },
  methods: {
    closeEvent() {
      this.$emit("close", false);
    }
  }
};
</script>
