<script>
import { QChatMessage, QSpinnerComment } from 'quasar'
import _ from 'lodash'
import moment from 'moment'
import Avatar from 'vue-avatar'
import { mapActions, mapState } from 'vuex'

export default{
  components: {
    QChatMessage,
    QSpinnerComment,
    Avatar

  },
  data () {
    return {
      typing: false
    }
  },
  computed: {
    ...mapState('Chat', ['session_id']),
    ...mapState('Chat', ['msgs']),
    ...mapState('Chat', ['cliente'])
  },
  watch: {
    session_id (value) {
      if (value !== 0) {
        this.setmsg('JN2', 'Olá, bem vindo! Como posso chamar você?', false, 'statics/logo-jn2.png')
      }
      this.$db.ref(`chats/${this.session_id}/msgs`).on('value', data => {
        const obj = data.val()
        this.list = _.map(obj, (msg, index) => {
          msg.id = index
          return msg
        })
      })
    },
    cliente: {
      handler (value) {
        const Vthis = this
        if (this.cliente.n_sku !== 0) {
          this.typing = true
          setTimeout(function () {
            Vthis.setmsg('JN2', `Muito bom! Obrigado pelas respostas ${value.nome}!`, false, 'statics/logo-jn2.png')
            Vthis.typing = false
          }, 2000)
          setTimeout(function () {
            Vthis.setmsg('JN2', `Estou analisando seus dados para te mostrar os planos que se encaixam no seu perfil.`, false, 'statics/logo-jn2.png')
          }, 4000)
          setTimeout(function () {
            Vthis.setmsg('JN2', `Por favor, clique em prosseguir.`, false, 'statics/logo-jn2.png')
            Vthis.setPlaceholder('Clique em prosseguir')
            Vthis.typing = false
            Vthis.setTalking(false)
          }, 6000)
        }
        else if (this.cliente.m_vendas !== 0) {
          this.typing = true
          setTimeout(function () {
            Vthis.setmsg('JN2', `Qual seria a quantidade de SKU's que você precisa?`, false, 'statics/logo-jn2.png')
            Vthis.setPlaceholder("Insira a quantidade de sku's")
            Vthis.typing = false
          }, 2000)
        }
        else if (this.cliente.n_func !== '') {
          this.typing = true
          setTimeout(function () {
            Vthis.setmsg('JN2', `Qual seria a sua média de vendas/mês?`, false, 'statics/logo-jn2.png')
            Vthis.setPlaceholder('Insira a quantidade de vendas/mês')
            Vthis.typing = false
            Vthis.setTypeQuestion('text')
          }, 2000)
        }
        else if (this.cliente.site !== '') {
          this.typing = true
          setTimeout(function () {
            Vthis.setmsg('JN2', `Beleza... E quantos funcionários tem sua empresa?`, false, 'statics/logo-jn2.png')
            Vthis.setPlaceholder('Insira a quantidade de funcionário de sua empresa')
            Vthis.typing = false
            Vthis.setTypeQuestion('qtd_func')
          }, 2000)
        }
        else if (this.cliente.telefone !== '') {
          this.typing = true
          setTimeout(function () {
            Vthis.setmsg('JN2', `Excelente! Sua empresa possui um site? Se sim, qual é o endereço?`, false, 'statics/logo-jn2.png')
            Vthis.setPlaceholder('Insira seu site')
            Vthis.typing = false
          }, 2000)
        }
        else if (this.cliente.email !== '') {
          this.typing = true
          setTimeout(function () {
            Vthis.setmsg('JN2', 'Ótimo, informe também seu telefone para que possamos entrar em contato com você.', false, 'statics/logo-jn2.png')
            Vthis.setPlaceholder('Insira seu telefone')
            Vthis.typing = false
          }, 2000)
        }
        else if (this.cliente.nome !== '') {
          this.typing = true
          setTimeout(function () {
            Vthis.setmsg('JN2', `Muito prazer ${value.nome}!`, false, 'statics/logo-jn2.png')
            Vthis.setmsg('JN2', 'Para continuarmos, informe seu e-mail.', false, 'statics/logo-jn2.png')
            Vthis.setPlaceholder('Insira seu e-mail')
            Vthis.typing = false
          }, 2000)
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('Chat', ['setMsg']),
    ...mapActions('Chat', ['setCliente']),
    ...mapActions('Chat', ['setPlaceholder']),
    ...mapActions('Chat', ['setTalking']),
    ...mapActions('Chat', ['setTypeQuestion']),
    setmsg (name, description, sent, icone) {
      const msg = {
        name: name,
        description: description,
        date: moment().format('DD/MM/YYYY H:m:s'),
        sent: sent,
        icone: icone,
        class: 'received'
      }

      this.$db.ref(`chats/${this.session_id}/msgs`).push(msg)

      this.setMsg(msg)
    }
  }
}
</script>

<template>
  <div class="content-chat" v-chat-scroll>
    <div :class="msg.class" v-for="msg in msgs" style="padding: 10px;">
      <q-chat-message
      name=""
      :avatar="msg.icone"
      :text="[msg.description]"
      stamp=""
      :sent="msg.sent"
      ></q-chat-message>

      <avatar v-if="msg.sent" :username="cliente.nome"  :size="50"></avatar>
      <avatar v-else :username="msg.name" :size="50" :rounded="false" src="statics/logo-jn2.png"></avatar>
    </div>
    <q-spinner-comment v-show="typing" style="color:#f32c40;" size="40px"/>
  </div>
</template>

<style lang="scss">
@import "../../statics/styles/style.scss";
.content-chat{
  z-index: 9;
  padding: 20px;
  height: calc(100vh - 8.5em);
  margin: 2.1em auto 0 auto;
  overflow: auto;
  @media (min-width: 992px){
    max-width: 992px;
    height: calc(100vh - 9.7em);
    margin: 0 auto;
    padding: 4.5em 20px 20px 20px;
  }
}
img.q-message-avatar {
  display: none;
}
.q-message-received .q-message-text {
  margin-left: 70px;
}

.q-message{
  .q-message-text{
    background-color: transparent;
    transform: translate3d(0, 20%, 0);
    &:before{
      display: none;
    }
    .q-message-text-content{
      font-family: 'Rajdhani', sans-serif;
      font-size: 18px;
      color:#58555c;
    }
  }
}

.vue-avatar--wrapper {
  position: relative;
  margin-top: -57px;
}
.q-message.q-message-sent {
  margin-right: 70px;
}
.sent .vue-avatar--wrapper {
  float: right;
  background-color: #F32C40!important;
  color:#fff!important;
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 0;
    height: 0;
    right: 0;
    border-right: 0 solid transparent;
    border-left: 22px solid transparent;
    border-bottom: 22px solid #F32C40;
  }
}

.title-chat{
  margin-top: 70px;
}
</style>
