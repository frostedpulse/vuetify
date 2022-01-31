<template>
  <v-container
    class="px-0"
    fluid
  >
    <v-checkbox
      v-model="checkbox"
      :label="`AKTIV`"
    ></v-checkbox>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        checkbox: true,
      }
    },
  }
</script>
