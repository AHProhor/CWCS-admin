import axios from 'axios';
import FAPI from '../../../api-path/api-path';

const state = {
    research: [],
    createResearch: {},
    message: "",
    delete:"",
    edited_campaign: {},
    research_detail:{}
}

const getters = {}

const mutations = {
    GET_RESEARCH (state, items) {
        state.research = items
    },
    CREATE_RESEARCH (state, items) {
        state.createResearch = items
    },
    EDIT_RESEARCH (state, items) {
        state. edited_research = items
    },
    DELETE_RESEARCH (state, items) {
        state.delete = items
    },
    GET_RESEARCH_BY_ID(state, items){
        state.research_detail = items
    }
}

const actions = {

    // Get all research 
    async get_research ({ commit }) {
        let response = await axios.get(FAPI.get_research).then(result => {
            let items = result.data.data
            commit('GET_RESEARCH', items) 
        })
        return response
    },

    // Create Research
    async create_research ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.post(FAPI.post_research, payload, config).then(result => {
            let items = result.data.data
            commit('CREATE_RESEARCH', items)
            dispatch('get_research')
            return result
        })
        return response
    },

    // edit Research
    async edit_research ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.patch(FAPI.edit_research + payload.id, payload.research ,config).then(result => {
            let items = result.data.data
            commit('EDIT_RESEARCH', items)
            dispatch('get_research')
            return result
        })
        return response
    },

    // Delete Research
    async delete_research ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        // console.log(payload)

        let response = await axios.delete(FAPI.delete_research + payload, config).then(result => {
            let items = result.data
            commit('DELETE_RESEARCH', items)
            dispatch('get_research')
            return result
        })
        return response
    },

    // Research Details
    async get_research_by_id ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.get(FAPI.get_research_by_id + payload, config).then(result => {
            let items = result.data.data
            commit('GET_RESEARCH_BY_ID', items)
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