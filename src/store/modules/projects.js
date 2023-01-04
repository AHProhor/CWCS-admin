import axios from 'axios';
import FAPI from '../../../api-path/api-path';

const state = {
    projects: [],
    message: "",
    edited_projects: {},
    new_project: {},
    project_detail:{}
}

const getters = {}

const mutations = {
    SET_PROJECTS (state, items) {
        state.projects = items
    },
    POST_PROJECTS (state, items) {
        state.new_project = items
    },
    EDIT_PROJECTS (state, items) {
        state.edited_projects = items
    },
    DELETE_PROJECTS (state, items) {
        state.message = items
    },
    GET_PROJECT_BY_SLUG(state, items){
        state.project_detail = items
    }
}

const actions = {
    get_projects ({ commit }) {
        axios.get(FAPI.get_projects).then(result => {
            let items = result.data.data
            commit('SET_PROJECTS', items)
        })
    },

    async post_projects ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.post(FAPI.post_projects, 
            {
                title: payload.title,
                details: payload.details,
                featured: payload.featured,
                areaofwork: [payload.areaofwork],
                image: payload.image
            }
            , config).then(result => {
            let items = result.data
            commit('POST_PROJECTS', items)
            dispatch('get_projects')
            return result
        })
        return response
    },

    async edit_Projects ({ commit, dispatch }, payload) {
        let config=
            {   
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }   
                 
            }

        let response = await axios.patch(FAPI.edit_projects + payload.slug, 
            {
                title: payload.project.title,
                details: payload.project.details,
                image: payload.project.image,
                areaofwork: [payload.project.areaofwork],
                featured: payload.project.featured,
            }
            ,config).then(result => {
            let items = result.data.data
            commit('EDIT_PROJECTS', items)
            dispatch('get_projects')
            return result
        })
        return response
    },

    async delete_projects ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        // console.log(payload)

        let response = await axios.delete(FAPI.delete_project + payload, config).then(result => {
            let items = result.data
            // console.log(items)
            commit('DELETE_PROJECTS', items)
            dispatch('get_projects')
            return result
        })
        return response
    },
    async get_project_by_slug ({ commit, dispatch }, payload) {
        let config=

            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.get(FAPI.get_project_by_slug + payload, config).then(result => {
            let items = result.data.data
            commit('GET_PROJECT_BY_SLUG', items)
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