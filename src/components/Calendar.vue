<template>
  <div class="calendar">
    <events-list
      :activeYear="activeYear"
      :currentMonth="currentMonth"
      :currentDay="currentDay"
      :currentYear="currentYear"
      :actEvents="actEvents"
      :months="months"
      @event="showEvent"
      @changeYear="onChange"
      v-if="component == 'list'"
    ></events-list>
    <event
      @close="closeEvent"
      :event="closestEvent"
      :months="months"
      v-if="component == 'event'"
    ></event>
  </div>
</template>

<script>
import EventsList from "@/components/calendar/EventsList";
import Event from "@/components/calendar/Event";
import firebase from "firebase";

export default {
  name: "Calendar",
  props: ["windowWidth", "component"],
  data() {
    return {
      date: new Date(),
      months: [
        "Styczeń",
        "Luty",
        "Marzec",
        "Kwiecień",
        "Maj",
        "Czerwiec",
        "Lipiec",
        "Sierpień",
        "Wrzesień",
        "Październik",
        "Listopad",
        "Grudzień"
      ],

      activeYear: 2,
      activeMonth: null,
      firstRender: false,
      eventShow: false,
      activeEvent: {},
      events: {},
      actEvents: {},
      closestEvent: {},
      new: null
    };
  },
  computed: {
    currentDay() {
      return this.date.getDate();
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
      this.activeYear += a;
    },
    getEvents() {
      return new Promise((resolve, reject) => {
        const database = firebase.database(),
          events = database.ref(`events/${this.activeYear}`);
        events.on(
          "value",
          data => {
            resolve();
            this.events[this.activeYear] = data.val();
            if (data.val() != null) {
              const ind = Object.keys(this.events[this.activeYear])[0];
              this.closestEvent = this.events[this.activeYear][ind];
              localStorage.setItem("calendar", JSON.stringify(this.events));
            }
          },
          error => {
            reject(console.log("not success"));
          }
        );
      });
    },
    changeActEvents() {
      this.actEvents = this.events[this.activeYear];
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
  mounted() {
    this.activeYear = this.currentYear;
    this.activeMonth = this.currentMonth;
  },
  watch: {
    activeYear(newValue) {
      if (!localStorage.calendar || !this.events[newValue]) {
        this.getEvents().then(() => this.changeActEvents());
      }
      this.changeActEvents();
    }
  },
  components: {
    EventsList,
    Event
  }
};
</script>
