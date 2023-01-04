import axios from 'axios';
import FAPI from '../../../api-path/api-path';

const state = {
    campaigns: [],
    message: "",
    edited_campaign: {},
    new_campaign: {},
    campaign_detail:{}
}

const getters = {}

const mutations = {
    SET_CAMPAIGNS (state, items) {
        state.campaigns = items
    },
    POST_CAMPAIGNS (state, items) {
        state.new_campaign = items
    },
    EDIT_CAMPAIGNS (state, items) {
        state. edited_campaign = items
    },
    DELETE_CAMPAIGNS (state, items) {
        state.message = items
    },
    GET_CAMAPIGN_BY_SLUG(state, items){
        state.campaign_detail = items
    }
}

const actions = {
    get_campaigns ({ commit }) {
        axios.get(FAPI.get_campaigns).then(result => {
            let items = result.data.data
            commit('SET_CAMPAIGNS', items) 
        })
    },

    async post_campaigns ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.post(FAPI.post_campaign, 
            {
                title: payload.title,
                details: payload.details,
                description: payload.description,
                projects: [payload.projects],
                image: payload.image,
            }
            , config).then(result => {
            let items = result.data.data
            commit('POST_CAMPAIGNS', items)
            dispatch('get_campaigns')
            return result
        })
        return response
    },

    async edit_Campaigns ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.patch(FAPI.edit_campaigns + payload.slug, 
            {
                title: payload.title,
                date: payload.date,
                details: payload.details,
                image: payload.image,
            }
            ,config).then(result => {
            let items = result.data.data
            commit('EDIT_CAMPAIGNS', items)
            dispatch('get_HotelsList')
            return result
        })
        return response
    },

    async delete_Campaign ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        console.log(payload)

        let response = await axios.delete(FAPI.delete_campaign + payload, config).then(result => {
            let items = result.data
            commit('DELETE_CAMPAIGNS', items)
            dispatch('get_campaigns')
            return result
        })
        return response
    },
    async get_Campaign_by_slug ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.get(FAPI.get_campaign_by_slug + payload, config).then(result => {
            let items = result.data.data
            commit('GET_CAMAPIGN_BY_SLUG', items)
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