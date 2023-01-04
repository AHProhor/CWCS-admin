import axios from 'axios';
import FAPI from '../../../api-path/api-path';
// import router from "../../router/index";

const state = {
    access_token: null,
    refresh_token: null,
    isLoggedIn: false
}

const getters = {}

const mutations = {
    SET_ACCESS_TOKEN (state, token) {
        localStorage.setItem('access_token', token)
        state.access_token = token
    },

    SET_REFRESH_TOKEN (state, token) {
        localStorage.setItem('refresh_token', token)
        state.refresh_token = token
    },

    SET_LOGIN_STATUS(state, status) {
        state.isLoggedIn = status;
    },
}

const actions = {
    getLoginStatus({commit}) {
        let loginStatus = localStorage.getItem('access_token')==undefined? false : true;
        localStorage.setItem('loggedIn', loginStatus)
        commit('SET_LOGIN_STATUS', loginStatus)
    },

    get_Login({ commit, dispatch }, payload) {
        console.log('store payload -->', payload)
        let response = axios.post(FAPI.get_login, payload).then(result => {
            console.log(result)
            let access_token = result.data.access
            let refresh_token = result.data.refresh
            commit('SET_ACCESS_TOKEN', access_token)
            commit('SET_REFRESH_TOKEN', refresh_token) 
            dispatch('getLoginStatus')
            return result
        })
        .catch(error => {
            console.log(error)
        }) 
        return response      
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}