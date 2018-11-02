<template>
  <v-layout row justify-space-around style="padding-left: 10%">
    <v-flex xs7 >
      <app-text></app-text>
    </v-flex>

    <v-flex  xs5>
      <app-traduction v-if="currentWord"></app-traduction>
    </v-flex>
  </v-layout>
</template>

<script>
  import Text from './Text'
  import Traduction from './Traduction'
	export default {
    computed: {
      currentWord () {
        return this.$store.getters['book/currentWord']
      }
    },

    components:{
      appText: Text,
      appTraduction: Traduction
    }
	}
</script>

<style scoped>

</style>
