<template>
    <div>
        <h1 class="page-title">Galeria</h1>
        <v-gallery :images="list"  >
        </v-gallery>
    </div>
</template>
<script>
export default {
  name: 'Galeria',
  data () {
      return {
          list:[
              {title:"image1", url:'https://static.boredpanda.com/blog/wp-content/uploads/2016/07/funny-men-parody-women-photos-15-5799e76231d15__605.jpg'}
          ]
      }
  }
}
</script>