import axios from 'axios';
import FAPI from '../../../api-path/api-path';

const state = {
    gallery: [],
    message: "",
    edited_gallery: {},
    gallery_details:{}
}

const getters = {}

const mutations = {
    SET_GALLERY (state, items) {
        state.gallery = items
    },

    POST_GALLERY (state, items) {
        state.gallery = items
    },

    EDIT_GALLERY (state, items) {
        state.edited_story = items
    },

    DELETE_GALLERY (state, items) {
        state.message = items
    },
    
    GET_GALLERY_DETAILS(state, items){
        state.gallery_details = items
    },

    GET_GALLERY_BY_PROJECT(state, items){
        state.gallery_by_project = items
    }
}

const actions = {
    get_gallery ({ commit }) {
        axios.get(FAPI.get_gallery).then(result => {
            let items = result.data.data
            commit('SET_GALLERY', items)
        })
    },

    async post_gallery ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response =  await axios.post(FAPI.post_gallery, payload, config).then(result => {
            let items = result.data
            commit('POST_GALLERY', items)
            dispatch('get_gallery')
            return result
        })
        return response
    },

    async edit_Gallery ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.patch(FAPI.edit_gallery + payload.id, 
            {
                image: payload.gallery.image,
                project: payload.gallery.project
            }
            ,config).then(result => {
            let items = result.data.data
            commit('EDIT_GALLERY', items)
            dispatch('get_gallery')
            return result
        })
        return response
    },

    async deleteGallery ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.delete(FAPI.delete_gallery + payload, config).then(result => {
            let items = result.data
            commit('DELETE_GALLERY', items)
            dispatch('get_gallery')
            return result
        })
        return response
    },

    async get_gallery_by_slug ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.get(FAPI.get_gallery_by_slug + payload, config).then(result => {
            let items = result.data.data
            commit('GET_GALLERY_DETAILS', items)
            return result
        })
        return response
    },

    async getGalleryByProject ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.get(FAPI.get_gallery_by_project + payload, config).then(result => {
            let items = result.data.data
            commit('GET_GALLERY_BY_PROJECT', items)
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