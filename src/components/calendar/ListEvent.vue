<template>
  <tr :class="[
          event.typ.key, 
          {warning : warning }]">
    <td class="date">
      <span class="day">{{ event.day}}</span>
      <br>
      <span class="month">{{ months[event.month]}}</span>
    </td>
    <td class="info">
      <h2 class="name">{{ event.typ.name }}</h2>
      <span class="address">
        <font-awesome-icon :icon="['fas', 'map-marked-alt']"/>
        {{ event.lokal.name }}
      </span>
    </td>
    <td class="eye" @click="showEvent(event)">
      <font-awesome-icon :icon="['fas', 'eye']"/>
    </td>
  </tr>
</template>
<script>
export default {
  props: [
    "actualEvents",
    "months",
    "activeYear",
    "currentMonth",
    "currentDay",
    "event"
  ],
  data() {
    return {};
  },
  computed: {
    warning() {
      if (
        currentMonth == event.month &&
        event.day - currentDay <= 7 &&
        event.day - currentDay >= 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

