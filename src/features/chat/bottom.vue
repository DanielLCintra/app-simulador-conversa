<script>
import { QInput, QBtn, Toast } from 'quasar'
import moment from 'moment'
import _ from 'lodash'
import { required } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    QInput,
    QBtn,
    Toast
  },
  data () {
    return {
      msg: {
        description: '',
        date: moment().format('DD/MM/YYYY H:m:s'),
        sent: true,
        icone: 'statics/logo-jn2.png',
        class: 'sent'
      },
      cliente: {
        id: _.random(0, 999999999),
        nome: '',
        email: '',
        site: '',
        n_func: '',
        m_vendas: 0,
        n_sku: 0,
        perfil: '',
        telefone: ''
      }
    }
  },
  computed: {
    ...mapState('Chat', ['talking']),
    ...mapState('Chat', ['session_id']),
    ...mapState('Chat', ['msgs']),
    ...mapState('Chat', ['placeholder']),
    ...mapState('Chat', ['type_question'])
  },
  methods: {
    saveClientData (obj) {
      this.$db.ref(`clientes/${obj.id}`).set(obj)
    },
    submit (msg) {
      this.msg.description = msg !== undefined ? msg : this.msg.description
      this.$v.msg.$touch()
      if (this.$v.msg.$error) {
        Toast.create('Dados inválidos, por favor reveja as informações digitadas.')
      }
      else {
        this.setMsg(this.msg)
        this.$db.ref(`chats/${this.session_id}/msgs`).push(this.msg)
        if (this.cliente.nome === '') {
          this.cliente.nome = this.msg.description
          this.msg.description = ''
          this.setPlaceholder('')
        }
        else if (this.cliente.email === '') {
          this.cliente.email = this.msg.description
          this.msg.description = ''
          this.setPlaceholder('')
        }
        else if (this.cliente.telefone === '') {
          this.cliente.telefone = this.msg.description
          this.msg.description = ''
          this.setPlaceholder('')
        }
        else if (this.cliente.site === '') {
          this.cliente.site = this.msg.description
          this.msg.description = ''
          this.setPlaceholder('')
        }
        else if (this.cliente.perfil === '') {
          this.cliente.n_func = this.msg.description
          this.cliente.perfil = this.msg.description === '0-10' ? 'small' : this.msg.description === '11-49' ? 'middle' : 'enterprise'
          this.msg.description = ''
          this.setPlaceholder('')
        }
        else if (this.cliente.m_vendas === 0) {
          this.cliente.m_vendas = this.msg.description
          this.msg.description = ''
          this.setPlaceholder('')
        }
        else if (this.cliente.n_sku === 0) {
          this.cliente.n_sku = this.msg.description
          this.msg.description = ''
          this.setPlaceholder('')
        }
        this.setCliente(this.cliente)
        this.saveClientData(this.cliente)
      }
    },
    ...mapActions('Chat', ['setMsg']),
    ...mapActions('Chat', ['setCliente']),
    ...mapActions('Chat', ['setPlaceholder'])
  },
  validations: {
    msg: {
      description: { required }
    }
  }
}
</script>

<template>
  <div>
    <div v-if="talking">
      <div v-if="type_question == 'text'">
        <div class=" bottom-chat shadow-up-8">
          <div class="content-bottom">
            <div class="block-1">
              <q-input class="input-chat" color="dark" v-model="msg.description" :placeholder="placeholder" @keyup.13.native="submit()"></q-input>
            </div>
            <div class="block-2">
              <q-btn class="btn-chat" icon-right="fa-paper-plane" color="primary" small @click="submit()">Enviar</q-btn>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="type_question == 'qtd_func'" class="div-bottom">
        <q-btn class="btn-qtd-func" small @click="submit('0-10')">0 - 10</q-btn>
        <q-btn class="btn-qtd-func" small @click="submit('11-49')">11 - 49</q-btn>
        <q-btn class="btn-qtd-func" small @click="submit('>=50')"> >= 50 </q-btn>
      </div>
    </div>
    <div v-else>
      <div class="div-bottom">
        <q-btn class="btn-prosseguir" icon-right="fa-chevron-right"  small>Prosseguir</q-btn>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
@import "../../statics/styles/style.scss";
.bottom-chat{
  position: fixed;
  width: 100vw;
  background-color: $bottom-bg-color;
  bottom: 0;
  padding: .5em 1em;
  transition: all 0.5s;

  .content-bottom{
    display: flex;
    align-items: center;
    justify-content: center;
    @media (min-width: 992px){
      max-width: 992px;
      margin: 0 auto;
      justify-content: space-between;
      padding: 1.5em 20px;
    }
    .block-1{
      flex-basis: 65%;
      @media (min-width: 425px){
        flex-basis: 75%;
      }
      @media (min-width: 992px){
        flex-basis: 85%;
      }
    }
  }
}
.btn-chat{
  background-color: $send-button-bg-color!important;
  color: #fff!important;
  border-radius: 100px;
  padding: .7em 1.3em;
  @media (min-width: 992px){
    padding: 1em 2.5em;
    font-size: 13px;
  }
}
.input-chat{
  color: #fff!important;
  .q-input-target{
    color: #fff!important;
    font-family: 'Montserrat', sans-serif;
    &::placeholder {
      color: #fff!important;
    }
  }
}
.btn-prosseguir{
  background-color: $green-alt!important;
  color: #fff!important;
  border-radius: 100px;
  padding: 1.7em 3.4em;
  font-size: 14px;
}
.btn-qtd-func{
  background-color: $green-alt!important;
  color: #fff!important;
  border-radius: 100px;
  padding: 1.7em 3.4em;
  font-size: 16px;
}
.div-bottom{
  text-align:center;
  position: fixed;
  width: 100%;
  bottom: 0px;
  margin: 0 auto;
  height: 100%;
  top: 85vh;
  transition: all 0.5s;
}

input.col.q-input-target.text-left {
  width: 50vw !important;
  @media (min-width: 768px){
    //width: 80vw !important;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

.bounce-enter-active {
  animation: bounce-in 1s;
}
.bounce-leave-active {
  animation: bounce-in 1s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
