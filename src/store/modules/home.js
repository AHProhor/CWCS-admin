import axios from 'axios';
import FAPI from '../../../api-path/api-path';

const state = {
    home: [],
    createHome:{},
    message: "",
    edit_home: {},
    home_details:{}
}

const getters = {}

const mutations = {
    GET_HOME (state, items) {
        state.home = items
    },

    CREATE_HOME (state, items) {
        state.createHome = items
    },

    EDIT_HOME (state, items) {
        state.edit_home = items
    },

    DELETE_HOME (state, items) {
        state.message = items
    },

    TOGGLE_STATUS_HOME(state, items) {
        state.message = items
    },
    
    HOME_DETAILS(state, items){
        state.home_details = items
    }
}

const actions = {
    get_home ({ commit }) {
        axios.get(FAPI.get_home).then(result => {
            let items = result.data.data
            commit('GET_HOME', items)
        })
    },

    async create_home ({ commit }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response =  await axios.post(FAPI.create_home, payload, config).then(result => {
            let items = result.data
            commit('CREATE_HOME', items)
            return result
        })
        return response
    },

    async toggleActiveStatus({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response =  await axios.get(FAPI.get_status + payload, config).then(result => {
            let items = result.data
            commit('TOGGLE_STATUS_HOME', items)
            dispatch('get_home')
            return result
        })
        return response
    },

    async delete_home ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.delete(FAPI.delete_home + payload, config).then(result => {
            let items = result.data
            commit('DELETE_HOME', items)
            dispatch('get_home')
            return result
        })
        return response
    },

    async get_home_by_slug ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.get(FAPI.get_home_by_id + payload, config).then(result => {
            let items = result.data.data
            commit('HOME_DETAILS', items)
            return result
        })
        return response
    },

    async update_home ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.patch(FAPI.edit_home + payload.id, payload, config).then(result=> {
            let items = result.data.data
            commit('EDIT_HOME', items)
            dispatch('get_home')
            return result
        })
        return response
    },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}