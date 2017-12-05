import _ from 'lodash'

const setCliente = ({ commit }, obj) => {
  commit('SET_CLIENTE', { obj })
}

const setMsg = ({commit, state}, obj) => {
  commit('SET_MSG', { obj })
}

const setSessionId = ({commit, state}, obj) => {
  const SessionId = _.random(0, 999999999)
  commit('SET_SESSION_ID', { SessionId })
}

const setPlaceholder = ({commit, state}, obj) => {
  commit('SET_PLACEHOLDER', { obj })
}

const setTalking = ({commit, state}, obj) => {
  commit('SET_TALKING', { obj })
}

const setTypeQuestion = ({commit, state}, obj) => {
  commit('SET_TYPE_QUESTION', { obj })
}

export default {
  setCliente,
  setMsg,
  setSessionId,
  setPlaceholder,
  setTalking,
  setTypeQuestion
}
