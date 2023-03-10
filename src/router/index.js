import { createRouter, createWebHistory } from "vue-router";
import Dashboard from '../views/dashboard/index.vue'
import Login from '../views/login/index.vue'

import CreateAOW from '../views/aow/create/index.vue'
import ViewAOW from '../views/aow/view/index.vue'
import AOWEdit from '../views/aow/edit/[id].vue'

import CreateProject from '../views/projects/create/index.vue'
import ViewProject from '../views/projects/view/index.vue'
import editProject from '../views/projects/edit/[id].vue'

import CreateGallery from '../views/gallery/create/index.vue'
import ViewGallery from '../views/gallery/view/index.vue'
import editGallery from '../views/gallery/Edit/[id].vue'

import CreateResearch from '../views/researchPublications/create/index.vue'
import ViewResearch from '../views/researchPublications/view/index.vue'
import EditResearch from '../views/researchPublications/Edit/[id].vue'

import CreateBanner from '../views/Banner/create/index.vue'
import ViewBanner from '../views/Banner/view/index.vue'
import EditBanner from '../views/Banner/Edit/[id].vue'

import CreateSlider from '../views/slider/create/index.vue'
import ViewSlider from '../views/slider/view/index.vue'

import ViewContact from '../views/contact/index.vue'

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            login_required: true,
            hideSidebar: false,
            isDashboardOpen: true
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

     // Slider
     {
        path: '/slider/create',
        name: 'CreateSlider',
        component: CreateSlider,
        meta: {
            login_required: true,
            hideSidebar: false,
            isSliderOpen: true,
            isSliderCreate: true
        }
    },
    {
        path: '/slider/view',
        name: 'ViewSlider',
        component: ViewSlider,
        meta: {
            login_required: true,
            hideSidebar: false,
            isSliderOpen: true,
            isSliderView: true
        }
    },

    // Home
    {
        path: '/home/create',
        name: 'CreateBanner',
        component: CreateBanner,
        meta: {
            login_required: true,
            hideSidebar: false,
            isHomeOpen: true,
            isHomeCreate: true
        }
    },
    {
        path: '/home/view',
        name: 'ViewBanner',
        component: ViewBanner,
        meta: {
            login_required: true,
            hideSidebar: false,
            isHomeOpen: true,
            isHomeView: true
        }
    },
    {
        path: '/home/edit/:id',
        name: 'EditBanner',
        component: EditBanner,
        meta: {
            login_required: true,
            hideSidebar: false,
            isHomeOpen: true
        }
    },

    // Area Of Work
    {
        path: '/area-of-work/create',
        name: 'CreateAOW',
        component: CreateAOW,
        meta: {
            login_required: true,
            hideSidebar: false,
            isAOWOpen: true,
            isAOWCreate: true
        }
    },
    {
        path: '/area-of-work/view',
        name: 'ViewAOW',
        component: ViewAOW,
        meta: {
            login_required: true,
            hideSidebar: false,
            isAOWOpen: true,
            isAOWView: true
        }
    },
    {
        path: '/area-of-work/edit/:id',
        name: 'AOWEdit',
        component: AOWEdit,
        meta: {
            login_required: true,
            hideSidebar: false,
            isAOWOpen: true
        }
    },

    // Projects
    {
        path: '/projects/create',
        name: 'CreateProject',
        component: CreateProject,
        meta: {
            login_required: true,
            hideSidebar: false,
            isProjectOpen: true,
            isProjectCreate: true
        }
    },
    {
        path: '/projects/view',
        name: 'ViewProject',
        component: ViewProject,
        meta: {
            login_required: true,
            hideSidebar: false,
            isProjectOpen: true,
            isProjectView: true
        }
    },
    {
        path: '/projects/edit/:id',
        name: 'editProject',
        component: editProject,
        meta: {
            login_required: true,
            hideSidebar: false,
            isProjectOpen: true
        }
    },

    // Gallery
    {
        path: '/gallery/create',
        name: 'CreateGallery',
        component: CreateGallery,
        meta: {
            login_required: true,
            hideSidebar: false,
            isGalleryOpen: true,
            isGalleryCreate: true
        }
    },
    {
        path: '/gallery/view',
        name: 'ViewGallery',
        component: ViewGallery,
        meta: {
            login_required: true,
            hideSidebar: false,
            isGalleryOpen: true,
            isGalleryView: true
        }
    },
    {
        path: '/editGallery/edit/:id',
        name: 'editGallery',
        component: editGallery,
        meta: {
            login_required: true,
            hideSidebar: false,
            isGalleryOpen: true
        }
    },

    // Research & Publications
    {
        path: '/research/create',
        name: 'CreateResearch',
        component: CreateResearch,
        meta: {
            login_required: true,
            hideSidebar: false,
            isResearchOpen: true,
            isResearchCreate: true
        }
    },
    {
        path: '/research/view',
        name: 'ViewResearch',
        component: ViewResearch,
        meta: {
            login_required: true,
            hideSidebar: false,
            isResearchOpen: true,
            isResearchView: true
        }
    },
    {
        path: '/research/edit/:id',
        name: 'EditResearch',
        component: EditResearch,
        meta: {
            login_required: true,
            hideSidebar: false,
            isResearchOpen: true
        }
    },

    // Contact 
    {
        path: '/contact/view',
        name: 'ViewContact',
        component: ViewContact,
        meta: {
            login_required: true,
            hideSidebar: false,
            isContactOpen: true
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