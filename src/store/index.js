import { createStore } from 'vuex'
import login from './modules/login'
import dashboard from './modules/dashboard'
import areaOfWork from './modules/areaOfWork'
import projects from'./modules/projects'
import campaigns from './modules/campaigns'
import gallery from './modules/gallery'
import contact from './modules/contact'

export default createStore({
    modules: {
        login,
        dashboard,
        areaOfWork,
        projects,
        campaigns,
        gallery,
        contact,
    },

    state () {
        return {}
    },
    
    getters: {},
    mutaions: {},
    actions: {}
})