import { createStore } from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
const getAPI = axios.create({
  baseURL: 'http://127.0.0.1:5050/',
})
export default createStore({
  state: {
    accessToken: null,
    refreshToken: null,
    data: '',
    username: '',
    character: '',
    test: null,
  },
  plugins:
    [createPersistedState()],
  mutations: {
    updateStorage(state, { access, refresh }) {
      state.accessToken = access
      state.refreshToken = refresh
    },
    updateAccess(state, access) {
      state.accessToken = access
    },
    destroyToken(state) {
      state.accessToken = null
      state.refreshToken = null
      state.username = null
      state.data = null
    },
  },
  getters: {
    loggedIn(state) {
      return state.accessToken != null
    }
  },
  actions: {
    refreshToken(context) {
      return new Promise((resolve, reject) => {
        getAPI.post("/api-token-refresh/", {
          refresh: context.state.refreshToken
        }).then(response => {
          context.commit('updateAccess', response.data.access)
          resolve(response.data.access)
        })
          .catch(err => {
            reject(err)
          })
      })
    },
    userLogin(context, user) {
      return new Promise((resolve, reject) => {
        getAPI.post('/api-token/', {
          username: user.username,
          password: user.password
        })
          .then(response => {
            context.commit('updateStorage', { access: response.data.access, refresh: response.data.refresh })
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    userLogout(context) {
      if (context.getters.loggedIn) {
        context.commit('destroyToken')
      }
    }
  },
  modules: {
  }
})
