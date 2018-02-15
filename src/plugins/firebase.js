import firebase from 'firebase'

var config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
}

const connection = firebase.initializeApp(config)

const DB = connection.database()
const AUTH = connection.auth()

export default function install (Vue, { router }) {
  AUTH.onAuthStateChanged(user => {
    // if (!user) {
    //   //router.push({path: 'auth'})
    // }
  })

  Object.defineProperties(Vue.prototype, {
    $db: {
      get () {
        return DB
      }
    },
    $auth: {
      get () {
        return AUTH
      }
    }
  })
}
