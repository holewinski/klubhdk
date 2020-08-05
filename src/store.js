import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentDate: null,
        news: {},
        windowHeight: 0,
        months: {
            ordinary: [
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
            variation: ["Stycznia",
                "Lutego",
                "Marca",
                "Kwietnia",
                "Maja",
                "Czerwca",
                "Lipca",
                "Sierpnia",
                "Września",
                "Października",
                "Listopada",
                "Grudnia"]
        },
        calendar: {
            events: []

        }
    },
    mutations: {
        setCurrentDate(state, date) {
            state.currentDate = date;
        },
        addEvents(state, array) {

            state.calendar.events = array;
        },
        addNews(state, array) {
            state.news = [...state.news, ...array]
        },
        setNews(state, array) {
            state.news = array;
        },
        setHeight(state, height) {
            state.windowHeight = height;
        }
    }

})