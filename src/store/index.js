import { createStore } from 'vuex'
import login from './modules/login'
import dashboard from './modules/dashboard'
import areaOfWork from './modules/areaOfWork'
import projects from'./modules/projects'
import campaigns from './modules/campaigns'
import research from './modules/researchAndPublications'
import gallery from './modules/gallery'
import slider from './modules/slider'
import contact from './modules/contact'
import home from './modules/home'

export default createStore({
    modules: {
        login,
        dashboard,
        areaOfWork,
        projects,
        campaigns,
        gallery,
        contact,
        research,
        home,
        slider
    },

    state () {
        return {}
    },
    
    getters: {},
    mutaions: {},
    actions: {}
})