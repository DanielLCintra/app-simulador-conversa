<script>
  import { QLayout } from 'quasar'
  import JTop from './top.vue'
  import JBottom from './bottom.vue'
  import JBody from './body.vue'
  import { mapActions } from 'vuex'

  export default{
    components: {
      JTop,
      JBottom,
      JBody,
      QLayout
    },
    mounted () {
      this.setSessionId()
    },
    methods: {
      ...mapActions('Chat', ['setSessionId'])
    }
  }
</script>

<template>
  <q-layout>
    <j-top></j-top>
    <j-body></j-body>
    <j-bottom></j-bottom>
  </q-layout>
</template>

<style lang="scss">

</style>
