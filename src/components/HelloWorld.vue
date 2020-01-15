<template>
  <div id="content">
    <div class="hello">
      <h1>Aktualności</h1>
      <!-- <Aktualnosci width="6"></Aktualnosci> -->

      <Calendar :component="'event'"></Calendar>
    </div>
  </div>
</template>

<script>
import Calendar from "@/components/Calendar";
import Aktualnosci from "@/components/informacje/Aktualnosci";

export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  components: {
    Calendar,
    Aktualnosci
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
