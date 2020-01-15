<template>
  <div class="events-list">
    <h2 class="title">Wydarzenia w {{ activeYear }} roku.</h2>
    <div class="year">
      <font-awesome-icon
        :icon="['fas', 'caret-left']"
        @click="changeYear(-1)"
        class="prev button"
      />

      <transition name="slide-left" mode="out-in">
        <p class="year-number" :key="activeYear">{{ activeYear }}</p>
      </transition>
      <font-awesome-icon
        :icon="['fas', 'caret-right']"
        @click="changeYear(1)"
        class="next button"
      />
    </div>
    <transition name="calendar" mode="out-in">
      <table :key="activeYear">
        <tbody>
          <tr v-if="!actEvents">
            <td>Brak zaplanowanych wydarzeń na {{ activeYear }} rok.</td>
          </tr>
          <tr
            v-else
            v-for="(event, index) in actEvents"
            :key="`${event.type.key}-${event.date}`"
            :class="[
              event.type.key,
              {
                warning:
                  currentYear == event.year &&
                  currentMonth == event.month &&
                  event.day - currentDay <= 7 &&
                  event.day - currentDay >= 0,
                passed:
                  event.day < currentDay &&
                  currentMonth >= event.month &&
                  currentYear >= event.year
              }
            ]"
          >
            <td class="date">
              <span class="day">{{ event.day }}</span>
              <br />
              <span class="month">{{ months[event.month] }}</span>
            </td>
            <td
              class="info"
              :class="{ rotate: rotate == index }"
              ref="info-box"
            >
              <div class="box info-front">
                <h2 class="name">{{ event.type.name }}</h2>
                <span class="address">
                  <font-awesome-icon :icon="['fas', 'map-marked-alt']" />
                  {{ event.place.name }}
                </span>
              </div>
              <div class="box info-back" ref="info-back">
                <p>{{ event.desc }}</p>
                <b>{{ event.place.name }}</b>
                <br />
                <a
                  :href="
                    `https://www.google.com/maps/place/${event.place.adres}`
                  "
                >
                  <i>{{ event.place.adres }}</i>
                </a>
              </div>
            </td>
            <td class="eye" @click="showEvent(index)">
              <font-awesome-icon :icon="['fas', 'eye']" />
            </td>
            <!-- <span class="ale">ale chała</span> -->
          </tr>
        </tbody>
      </table></transition
    >

    <span></span>
  </div>
</template>
<script>
export default {
  props: [
    "actEvents",
    "months",
    "activeYear",
    "currentMonth",
    "currentDay",
    "currentYear"
  ],
  data() {
    return {
      events: this.actEvents,
      rotate: null
    };
  },
  methods: {
    changeYear(a) {
      this.$emit("changeYear", a);
    },
    showEvent(value) {
      if (this.rotate == value) {
        this.rotate = null;
      } else {
        this.rotate = value;
      }
    }
  }
};
</script>
