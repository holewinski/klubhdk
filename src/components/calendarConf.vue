<template>
  <div>
    <form @submit="send">
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
      <li v-for="{ adres, key, name } in places" :key="key">
        <form>
          <table>
            <th>
              <input type="text" :value="name" :size="name.length" readonly />
            </th>
            <tr>
              <td>
                <input
                  type="text"
                  :value="adres"
                  readonly
                  :size="adres.length"
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
import firebase from "firebase";

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
      firebase
        .database()
        .ref(`events/${this.year}`)
        .child(this.event.date)
        .set(this.event);
      console.log(`events/${this.year}`, this.event);
    }
  },
  created() {
    const database = firebase.database(),
      places = database.ref("places"),
      types = database.ref("types"),
      events = database.ref("events");
    places.on(
      "value",
      data => (this.places = data.val()),
      error => console.log(error.code)
    );
    types.on(
      "value",
      data => (this.types = data.val()),
      error => console.log(error.code)
    );
    events.push(event);
  }
};
</script>
