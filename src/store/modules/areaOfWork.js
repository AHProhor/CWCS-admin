import axios from 'axios';
import FAPI from '../../../api-path/api-path';

const state = {
    areaOfWork: [],
    new_aow:{},
    edited_AOW: {},
    get_Detail:{},
    message:{}
}

const getters = {}

const mutations = {
    SET_AREAOFWORK (state, items) {
        state.areaOfWork = items
    },
    POST_AREAOFWORK (state, items) {
        state.new_aow = items
    },
    EDIT_AREAOFWORK (state, items) {  
        state.edited_AOW = items
    },
    DELETE_AREAOFWORK (state, items) {
        state.message = items
    },
    GET_AREAOFWORK_DETAILS(state,items){
        state.get_Detail = items
    }
}

const actions = {
    get_AOW ({ commit }) {
        axios.get(FAPI.get_AOW).then(result => {
            let items = result.data.data
            commit('SET_AREAOFWORK', items)
        })
    },

    async create_aow ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        let response = await axios.post(FAPI.post_AOW, payload, config).then(result => {
            let items = result.data.data
            commit('POST_AREAOFWORK', items)
            dispatch('get_AOW')
            return result
        })
        return response
    },

    async edit_AOW ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        let response = await axios.patch(FAPI.edit_AOW + payload.slug, 
            {
                title: payload.aow.title,
                details: payload.aow.details,
                priority: payload.aow.priority,
                image: payload.aow.image,
            }
            ,config).then(result => {
            let items = result.data.data
            commit('EDIT_AREAOFWORK', items)
            dispatch('get_AOW')
            return result
        })
        return response
    },

    async delete_AOW({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.delete(FAPI.delete_AOW + payload, config).then(result => {
            let items = result.data
            console.log(items)
            commit('DELETE_AREAOFWORK', items)
            dispatch('get_AOW')
            return result
        })
        return response
    },

    async get_AOW_By_Slug({ commit }, payload) {

        let response = await axios.get(FAPI.get_AOW_By_Slug + payload).then(result => {
            let items = result.data.data
            commit('GET_AREAOFWORK_DETAILS', items)
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