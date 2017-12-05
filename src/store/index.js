import Vue from 'vue'
import Vuex from 'vuex'
import Chat from '@/chat/store'

Vue.use(Vuex)

const modules = {
  Chat
}

const store = new Vuex.Store({
  modules
})

export default store
