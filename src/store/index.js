import { createStore } from 'vuex'
import login from './modules/login'
import dashboard from './modules/dashboard'
import areaOfWork from './modules/areaOfWork'
import projects from'./modules/projects'
import campaigns from './modules/campaigns'
import gallery from './modules/gallery'
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
        home
    },

    state () {
        return {}
    },
    
    getters: {},
    mutaions: {},
    actions: {}
})