import axios from 'axios';
import FAPI from '../../../api-path/api-path';

const state = {
    contact: [],
    message: "",
}

const getters = {}

const mutations = {
    SET_CONTACT (state, items) {
        state.contact = items
    },

    DELETE_CONTACT (state, items) {
        state.message = items
    },
}

const actions = {
    get_contact({ commit }) {
        // console.log(localStorage.getItem('access_token') )
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        axios.get(FAPI.get_contact,config).then(result => {
            let items = result.data.data
            commit('SET_CONTACT', items)
        })
    },

    async delete_contact({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.delete(FAPI.delete_contact + payload, config).then(result => {
            let items = result.data
            commit('DELETE_CONTACT', items)
            dispatch('get_contact')
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