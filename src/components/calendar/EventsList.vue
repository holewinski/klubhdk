<template>
  <div class="events-list">
    <h2 class="title">Wydarzenia w {{ activeYear }} roku.</h2>
    <div class="year">
      <button class="button button--primary prev" @click="changeYear(-1)" :class="{edge:edge<0}">
      <font-awesome-icon
        :icon="['fas', 'caret-left']"
          
      />
      </button>
<p class="year__number" >
      <transition :name="animation" mode="out-in">
        <span class="year__span" :key="activeYear">{{ activeYear }}</span>
      </transition>
      </p>
      <button class="button button--primary next" @click="changeYear(1)" :class="{edge:edge>0}" >
        <font-awesome-icon
        :icon="['fas', 'caret-right']"
        
        
      />
      </button>
      
    </div>
    <transition name="calendar" mode="out-in">
      <table :key="activeYear">
        <tbody>
          <tr v-if="actEvents.length == 0" class="brak">
            
            <td class="date">
              <span class="day">{{ currentDay }}</span>
              <br />
              <span class="month">{{ months[currentMonth] }}</span>
            </td>
            <td
              class="info"
              :class="{ rotate: rotate == 1 }"
              ref="info-box"
            >
              <div class="box info-front">
                <h2 class="name">Brak zaplanowanych wydarzeń</h2>
                
              </div>
              <div class="box info-back" ref="info-back">
                <p class="alert">Z powodu pandemii wszystkie klubowe akcje zostają odwołane.
            <br>
            Wszystkie donacje zostaną zakwalifikowane jako udział w akcji klubowej.</p>
               
              </div>
            </td>
            <td class="eye" @click="showEvent(1)">
              <font-awesome-icon :icon="['fas', 'eye']" />
            </td>
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
                currentYear > event.year ||
                  event.day < currentDay &&
                  currentMonth >= event.month &&
                  currentYear >= event.year
              },
              { rotate: rotate == index }
            ]"
          >
            <td class="date">
              <span class="day">{{event.day}}</span>
              <br>
              <span class="month">{{months[event.month]}}</span>
             
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
                <a class="not-link"
                  :href="
                    `https://www.google.com/maps/place/${event.place.addres}`
                  "
                >
                  <i>{{ event.place.addres }}</i>
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
    "activeYear",
    "currentMonth",
    "currentDay",
    "currentYear",
    "edge"
  ],
  data() {
    return {
      events: this.actEvents,
      rotate: null,
      animation: ""
    };
  },
  computed: {
    months() {
      return this.$store.state.months.variation;
    }
  },
  methods: {
    changeYear(a) {
      if (a > 0) {
        this.animation = "slide-left";
      } else {
        this.animation = "slide-right";
      }
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
