<template>
  <div class="monthly-cal">
    <div class="cal-head">
      <div class="next-prev prev" @click="changeMonth(-1)">
        <font-awesome-icon :icon="['fas', 'caret-left']"/>
        <transition name="slide-fade" mode="out-in">
          <div :key="prevMonth">{{ months[prevMonth] }}</div>
        </transition>
      </div>

      <div class="currentDate">
        <transition name="slide-fade" mode="out-in">
          <div class="year" :key="activeYear">{{ activeYear }}</div>
        </transition>
        <transition name="slide-fade" mode="out-in">
          <div class="month" :key="monthName">{{ monthName }}</div>
        </transition>
      </div>
      <div class="next-prev next" @click="changeMonth(+1)">
        <transition name="slide-fade" mode="out-in">
          <div :key="nextMonth">{{ months[nextMonth] }}</div>
        </transition>
        <font-awesome-icon :icon="['fas', 'caret-right']"/>
      </div>
    </div>
    <div class="day-names">
      <span class="day-name" v-for="day in days" :key="day">{{ day }}</span>
    </div>
    <transition name="rotate" mode="out-in">
      <div class="cal-days" :key="activeMonth+'-month'">
        <div class="day prev" v-for="p in weekDay-1" :key="months[prevMonth]+'-'+p">
          <template v-if=" windowWidth > 991 ">
            <div>{{months[prevMonth] }}</div>
          </template>
          <template v-else>
            <div>{{ months[prevMonth].substring(0,3) }}</div>
          </template>
        </div>

        <div
          class="day"
          v-for="i in dayArray"
          :class="{ 
                 'current-day' : i[1] == currentDay && activeMonth == currentMonth && activeYear == currentYear, 
                 'pass' : i[1] < currentDay && activeMonth == currentMonth && activeYear == currentYear 
                 || activeMonth < currentMonth && activeYear == currentYear 
                 || activeYear < currentYear 
                 }"
          :key="'day-'+i[1]"
          title="Dzień dzisiejszy"
        >
          <div
            class="day-number has-event"
            :class="actualEvents[i[2]].typ.key"
            v-if="i[0] == 'e'"
            :key="'event-'+i[1]"
            @click="showEvent(i[2])"
            :title="actualEvents[i[2]].typ.name"
          >
            <div class="number">{{ i[1] }}</div>
          </div>

          <div class="day-number" v-else :key="'day-'+i[1]">
            <div class="number">{{ i[1] }}</div>
          </div>
        </div>

        <div class="day next" v-for="n in 7 - nextNumber" :key="months[nextMonth]+'-'+n">
          <template v-if=" windowWidth > 991 ">
            <div>{{months[nextMonth] }}</div>
          </template>
          <template v-else>
            <div>{{ months[nextMonth].substring(0,3) }}</div>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: [
    "numberOfDays",
    "activeYear",
    "activeMonth",
    "actualEvents",
    "dayArray",
    "eventsArray",
    "months",
    "currentDay",
    "currentYear",
    "currentMonth",
    "windowWidth"
  ],
  data() {
    return {
      days: ["Pn", "Wt", "Śr", "Czw", "Pt", "So", "Nd"]
    };
  },
  computed: {
    weekDay() {
      var d = new Date(this.activeYear, this.activeMonth).getDay();
      if (d == 0) {
        return 7;
      } else {
        return d;
      }
    },
    nextNumber() {
      return (this.weekDay - 1 + this.numberOfDays) % 7;
    },
    prevNumber() {
      return new Date(this.activeYear, this.prevMonth, 0).getDate();
    },
    prevMonth() {
      switch (this.activeMonth == 0) {
        case true:
          return 11;
          break;
        default:
          return this.activeMonth - 1;
      }
    },
    nextMonth() {
      switch (this.activeMonth) {
        case 11:
          return 0;
          break;
        default:
          return this.activeMonth + 1;
      }
    },

    monthName() {
      return this.months[this.activeMonth];
    }
  },
  methods: {
    changeMonth(value) {
      this.$emit("month", value);
    },
    showEvent(value) {
      this.$emit("event", this.actualEvents[value]);
    }
  }
};
</script>

