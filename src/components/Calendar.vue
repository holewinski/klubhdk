<template>
  <section class="section section--calendar calendar" v-if="date">
    <events-list
      :activeYear="activeYear"
      :currentMonth="currentMonth"
      :currentDay="currentDay"
      :currentYear="currentYear"
      :actEvents="actEvents"
      :edge="edge"
      @event="showEvent"
      @changeYear="onChange"
      v-if="component == 'list'"
    ></events-list>
    <event @close="closeEvent" :event="closestEvent"  v-if="component == 'event'"></event>
    
  </section>
</template>

<script>
import EventsList from "@/components/calendar/EventsList";
import Event from "@/components/calendar/Event";
import firebase, { storage } from "firebase/app";

export default {
  name: "Calendar",
  data() {
    return {
      date: null,
      activeYear: null,
      activeMonth: null,
      firstRender: false,
      eventShow: false,
      activeEvent: {},
      actEvents: [],
      new: null,
      edge: null
    };
  },
  computed: {
    closestEvent() {
      return this.events.find(el => {
        const date = new Date(el.date);
        return date >= this.date;
      });
    },
    component() {
      return this.$route.meta.calendar;
    },
    currentDay() {
      return this.date.getDate();
    },
    events() {
      return this.$store.state.calendar.events;
    },
    currentYear() {
      return this.date.getFullYear();
    },
    currentMonth() {
      return this.date.getMonth();
    },
    numberOfDays() {
      return new Date(this.activeYear, this.activeMonth, 0).getDate();
    }
  },
  methods: {
    onChange(a) {
      const yearContains = this.events.find(item => {
        return item.year == this.activeYear + a;
      });
      const nextYearContains = this.events.find(item => {
        return item.year == this.activeYear + 2 * a;
      });
      !nextYearContains ? (this.edge = a) : (this.edge = 0);
      if (yearContains || this.activeYear + a == this.currentYear) {
        this.activeYear += a;
      }
    },
    getDate() {
      this.date = this.$store.state.currentDate;
    },
    getEvents() {
      return new Promise((resolve, reject) => {
        if (this.$store.state.calendar.events.length == 0) {
          const database = firebase.firestore(),
            events = database.collection("events").orderBy("date");
          let eventsArray = [];
          events
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                eventsArray.push(doc.data());
              });
            })
            .then(() => this.$store.commit("addEvents", eventsArray))
            .then(() => {
              resolve("Success");
            });
        } else {
          return resolve("Success");
        }
      });
    },
    changeActEvents() {
      this.actEvents = this.events.filter(
        ({ year }) => year == this.activeYear
      );
    },
    closeEvent(value) {
      this.eventShow = value;
    },
    showEvent(value) {
      this.eventShow = true;
      this.activeEvent = value;
      this.firstRender = true;
    },

    resize(event) {
      this.windowWidth = document.documentElement.clientWidth;
    }
  },
  ready() {
    window.addEventListener("resize", this.resize);
  },
  created() {
    this.getEvents().then(() => this.getDate());

    //Get date from server if is not already in localStorage
  },
  watch: {
    activeYear(newValue) {
      this.changeActEvents();
    },
    date() {
      this.activeYear = this.currentYear;
      this.activeMonth = this.currentMonth;
    }
  },
  components: {
    EventsList,
    Event
  }
};
</script>
