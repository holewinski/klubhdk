<template>
  <div>
    <form @submit.prevent="send">
      <h2>Dodaj nowe wydarzenie</h2>
      <table>
        <tbody>
          <tr>
            <td>Data:</td>
            <td><input v-model="event.date" id="er" type="date" /></td>
          </tr>

          <tr>
            <td>Miejsce:</td>
            <td>
              <select v-model="event.place">
                <option v-for="place in places" :key="place.key">{{
                  place.key
                }}</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Typ:</td>
            <td>
              <select v-model="event.type">
                <option v-for="type in types" :key="type.key">{{
                  type.key
                }}</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Opis:</td>
            <td>
              <textarea v-model.lazy="event.desc"></textarea>
            </td>
          </tr>
          <tr>
            <td>
              <input type="submit" value="Dodaj wydarzenie" />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    <ul>
      <li v-for="{ addres, key, name } in places" :key="key">
        <form>
          <table>
            <th>
              <input type="text" :value="name" :size="name.length" readonly />
            </th>
            <tr>
              <td>
                <input
                  type="text"
                  :value="addres"
                  readonly
                  :size="addres.length"
                />
              </td>
            </tr>
            <tr>
              <td>
                <input type="text" :value="key" :size="key.length" readonly />
              </td>
            </tr>
            <tr>
              <td>
                <input type="submit" value="Zapisz" />
                <input type="button" value="Anuluj" />
              </td>
            </tr>
          </table>
        </form>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase, { storage } from "firebase/app";

export default {
  name: "calendarConf",
  data() {
    return {
      places: [],
      event: {},
      types: [],
      date: null,
      select: null
    };
  },
  computed: {
    year() {
      return Number(this.event.date.split("-")[0]);
    }
  },
  methods: {
    send() {
      const databse = firebase.firestore();
      databse
        .collection("events")
        .doc()
        .set(this.event)
        .then(() => {
          this.event = {};
        })
        .catch(error => console.log(error));
    }
  },
  created() {
    const database = firebase.firestore(),
      places = database.collection("places"),
      types = database.collection("types"),
      events = database.collection("events");
    places
      .get()
      .then(array => array.forEach(doc => this.places.push(doc.data())));

    types
      .get()
      .then(array => array.forEach(doc => this.types.push(doc.data())));
  }
};
</script>
