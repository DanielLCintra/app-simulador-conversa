<script>
	import { QToolbar, QToolbarTitle, QBtn, QIcon } from 'quasar'

	export default{
	  components: {
	    QToolbar,
	    QToolbarTitle,
	    QIcon,
	    QBtn
	  }
	}
</script>

<template>
	<q-toolbar class="top-chat" color="primary">
      <q-btn flat>
        <q-icon name="fa-angle-left" />
      </q-btn>
      <q-toolbar-title class="title-toolbar">
        Apresentação da proposta conforme perfil
      </q-toolbar-title>
    </q-toolbar>
</template>

<style lang="scss">
	.top-chat{
	  width: 100%;
	  padding: 10px;
	  position: fixed;
	  top: 0;
	  z-index:10;
	  background-color: rgba(56,16,130,1)!important;
	  background: linear-gradient(135deg, rgba(56,16,130,1) 29%, rgba(159,24,76,1) 109%, rgba(247,30,30,1) 100%)!important;
	}
	.title-toolbar{
	  text-align: center;
	  font-size: 12px;
	  font-family: 'Montserrat', sans-serif;
	}
</style>