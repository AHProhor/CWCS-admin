import axios from 'axios';
import FAPI from '../../../api-path/api-path';

const state = {
    sliderData: [],
    slider:{},
    edit_slider:null,
    message:{}
}

const getters = {}

const mutations = {
    GET_SLIDER (state, items) {
        state.sliderData = items
    },
    POST_SLIDER (state, items) {
        state.slider = items
    },
    DELETE_SLIDER (state, items) {
        state.message = items
    },
    EDIT_SLIDER (state, items) {
        state.edit_slider = items
    },
}

const actions = {
    get_slider ({ commit }) {
        axios.get(FAPI.get_slider).then(result => {
            let items = result.data.data
            commit('GET_SLIDER', items)
        })
    },

    async create_slider ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        let response = await axios.post(FAPI.post_slider, payload, config).then(result => {
            let items = result.data.data
            commit('POST_SLIDER', items)
            dispatch('get_slider')
            return result
        })
        return response
    },

    async delete_slider({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.delete(FAPI.delete_slider + payload, config).then(result => {
            let items = result.data
            commit('DELETE_SLIDER', items)
            dispatch('get_slider')
            return result
        })
        return response
    },

    async updatePriority ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
            console.log(config)
        let response = await axios.get(FAPI.update_priority + payload.id +"/"+ payload.priority, 
            config).then(result => {
            let items = result.data.data
            commit('EDIT_SLIDER', items)
            dispatch('get_slider')
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