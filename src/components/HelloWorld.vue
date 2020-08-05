<template>
    <div class="hello">
      <Calendar />  
      <Aktualnosci />

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
