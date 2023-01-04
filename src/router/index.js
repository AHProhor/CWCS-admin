import { createRouter, createWebHistory } from "vue-router";
import Dashboard from '../views/dashboard/index.vue'
import Login from '../views/login/index.vue'

import CreateAOW from '../views/aow/create/index.vue'
import ViewAOW from '../views/aow/view/index.vue'
import AOWEdit from '../views/aow/edit/[id].vue'

import CreateProject from '../views/projects/create/index.vue'
import ViewProject from '../views/projects/view/index.vue'
import editProject from '../views/projects/edit/[id].vue'

import CreateCampaigns from '../views/campaigns/create/index.vue'
import ViewCampaigns from '../views/campaigns/view/index.vue'
import editCampaigns from '../views/campaigns/edit/[id].vue'

import CreateGallery from '../views/gallery/create/index.vue'
import ViewGallery from '../views/gallery/view/index.vue'
import editGallery from '../views/gallery/Edit/[id].vue'

import ViewContact from '../views/contact/index.vue'

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            login_required: true,
            hideSidebar: false
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            hideSidebar: true,
        }
    },

    // Area Of Work
    {
        path: '/area-of-work/create',
        name: 'CreateAOW',
        component: CreateAOW,
        meta: {
            login_required: true,
            hideSidebar: false
        }
    },
    {
        path: '/area-of-work/view',
        name: 'ViewAOW',
        component: ViewAOW,
        meta: {
            login_required: true,
            hideSidebar: false
        }
    },
    {
        path: '/area-of-work/edit/:id',
        name: 'AOWEdit',
        component: AOWEdit,
        meta: {
            login_required: true,
            hideSidebar: false
        }
    },

    // Projects
    {
        path: '/projects/create',
        name: 'CreateProject',
        component: CreateProject,
        meta: {
            login_required: true,
            hideSidebar: false
        }
    },
    {
        path: '/projects/view',
        name: 'ViewProject',
        component: ViewProject,
        meta: {
            login_required: true,
            hideSidebar: false
        }
    },
    {
        path: '/projects/edit/:id',
        name: 'editProject',
        component: editProject,
        meta: {
            login_required: true,
            hideSidebar: false
        }
    },

    // Campaigns
    {
        path: '/campaigns/create',
        name: 'CreateCampaigns',
        component: CreateCampaigns,
        meta: {
            login_required: true,
            hideSidebar: false
        }
    },
    {
        path: '/campaigns/view',
        name: 'ViewCampaigns',
        component: ViewCampaigns,
        meta: {
            login_required: true,
            hideSidebar: false
        }
    },
    {
        path: '/campaigns/edit/:id',
        name: 'editCampaigns',
        component: editCampaigns,
        meta: {
            login_required: true,
            hideSidebar: false
        }
    },

    // Gallery
    {
        path: '/gallery/create',
        name: 'CreateGallery',
        component: CreateGallery,
        meta: {
            login_required: true,
            hideSidebar: false
        }
    },
    {
        path: '/gallery/view',
        name: 'ViewGallery',
        component: ViewGallery,
        meta: {
            login_required: true,
            hideSidebar: false
        }
    },
    {
        path: '/editGallery/edit/:id',
        name: 'editGallery',
        component: editGallery,
        meta: {
            login_required: true,
            hideSidebar: false
        }
    },

    // Conact
    {
        path: '/contact/view',
        name: 'ViewContact',
        component: ViewContact,
        meta: {
            login_required: true,
            hideSidebar: false
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
        // return desired position
        if (savedPosition) return savedPosition
        else return { top: 0 }
    }
})

router.beforeEach(function (to, from, next) {
    console.log('from router -->', JSON.parse(localStorage.getItem('loggedIn')))
    let isLoggedIn = JSON.parse(localStorage.getItem('loggedIn'))
    if(to.meta.login_required){
        if(isLoggedIn) {
            next();
        }
        else {
            next('/login'); 
        }
    }
    else if(to.meta.redirectionNeeded) {
        if(isLoggedIn) {
            next(from.fullPath)
        }
        else {
            next();
        }
    }
    else {
        next();
    }
});

export default router