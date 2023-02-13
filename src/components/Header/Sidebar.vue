<template>
    <div class="flex w-full h-full px-5 pt-4 bg-primary">
        <div class="w-full text-white">
            <!-- Logo -->
            <div class="flex justify-center mb-4">
                <router-link to="/">
                    <img class="h-28 w-20" src="../../assets/logo.png" alt="">
                </router-link>
            </div>

            <!-- Dashboard -->
            <div class="my-3">
                <router-link to="/">
                    <p @click="showDashboard" :class="{'clicked': $route.meta.isDashboardOpen || displayDashboard}" class="bg-black px-6 py-5 rounded-md font-semibold mb-2 flex"><i class="pi pi-home pr-5" style="font-size: 1.2rem"></i>Dashboard</p>
                </router-link>
            </div>

            <!-- Slider -->
            <div class="bg-black rounded-md my-3">
                <p class="flex items-center px-6 py-5 font-semibold cursor-pointer" @click="showSlider" :class="{'clicked': $route.meta.isSliderOpen}"><i class="pi pi-calendar pr-5" style="font-size: 1.2rem"></i>Slider</p>

                <div v-if="$route.meta.isSliderOpen || displaySlider" class="text-sm">
                    <router-link to="/slider/create">
                        <div @click="selectSliderCreate" :class="$route.meta.isSliderCreate ? 'bg-orange-300 text-white font-semibold' : 'text-white'" class="flex items-center justify-start px-16 py-3 hover:bg-orange-300">
                            <i class="pi pi-file-edit pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p>Create</p>
                        </div> 
                    </router-link>

                    <router-link to="/slider/view">
                        <div @click="selectSliderView" :class="$route.meta.isSliderView ? 'bg-orange-300 text-white font-semibold' : 'text-white'" class="flex items-center justify-start px-16 py-3 hover:bg-orange-300 rounded-b-md">
                            <i class="pi pi-eye pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p>View</p>
                        </div>  
                    </router-link>
                </div>
            </div>

            <!-- Home -->
            <div class="bg-black rounded-md my-3">
                <p class="flex items-center px-6 py-5 font-semibold cursor-pointer" @click="showHome" :class="{'clicked': $route.meta.isHomeOpen}"><i class="pi pi-calendar pr-5" style="font-size: 1.2rem"></i>Home</p>

                <div v-if="$route.meta.isHomeOpen || displayHome" class="text-sm">
                    <router-link to="/home/create">
                        <div @click="selectHomeCreate" :class="$route.meta.isHomeCreate ? 'bg-orange-300 text-white font-semibold' : 'text-white'" class="flex items-center justify-start px-16 py-3 hover:bg-orange-300">
                            <i class="pi pi-file-edit pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p>Create</p>
                        </div> 
                    </router-link>

                    <router-link to="/home/view">
                        <div @click="selectHomeView" :class="$route.meta.isHomeView ? 'bg-orange-300 text-white font-semibold' : 'text-white'" class="flex items-center justify-start px-16 py-3 hover:bg-orange-300 rounded-b-md">
                            <i class="pi pi-eye pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p>View</p>
                        </div>  
                    </router-link>
                </div>
            </div>

            <!-- Area Of Work -->
            <div class="bg-black rounded-md my-3">
                <p class="flex items-center px-6 py-5 font-semibold cursor-pointer" @click="showAreaOfWork" :class="{'clicked': $route.meta.isAOWOpen}"><i class="pi pi-heart pr-5" style="font-size: 1.2rem"></i>Area of Work</p>

                <div v-if="$route.meta.isAOWOpen || displayAreaOfWork" class="text-sm">
                    <router-link to="/area-of-work/create">
                        <div @click="selectAOWCreate" :class="$route.meta.isAOWCreate ? 'bg-orange-300 text-white font-semibold' : 'text-white'" class="flex items-center justify-start px-16 py-3 hover:bg-orange-300">
                            <i class="pi pi-file-edit pr-1 sm:pr-2 flex items-center" style="font-size: 0.8rem"></i>
                            <p>Create</p>
                        </div>
                    </router-link>

                    <router-link to="/area-of-work/view">
                        <div @click="selectAOWCreate" :class="$route.meta.isAOWView ? 'bg-orange-300 text-white font-semibold' : 'text-white'" class="flex items-center justify-start px-16 py-3 hover:bg-orange-300 rounded-b-md">
                            <i class="pi pi-eye pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p>View</p>
                        </div>        
                    </router-link>
                </div>
            </div>

            <!-- Projects -->
            <div class="bg-black rounded-md my-3">
                <p class="flex items-center px-6 py-5 font-semibold cursor-pointer" @click="showProjects" :class="{'clicked': $route.meta.isProjectOpen}"><i class="pi pi-database pr-5" style="font-size: 1.2rem"></i>Projects</p>

                <div v-if="$route.meta.isProjectOpen || displayProjects" class="text-sm">
                    <router-link to="/projects/create">
                        <div @click="selectProjectCreate" :class="$route.meta.isProjectCreate ? 'bg-orange-300 text-white font-semibold' : 'text-white'" class="flex items-center justify-start px-16 py-3 hover:bg-orange-300">
                            <i class="pi pi-file-edit pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p>Create</p>
                        </div>        
                    </router-link>

                    <router-link to="/projects/view">
                        <div @click="selectProjectView" :class="$route.meta.isProjectView ? 'bg-orange-300 text-white font-semibold' : 'text-white'" class="flex items-center justify-start px-16 py-3 hover:bg-orange-300 rounded-b-md">
                            <i class="pi pi-eye pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p>View</p>
                        </div>    
                    </router-link>
                </div>
            </div>

            <!-- Research And Publications -->
            <div class="bg-black rounded-md my-3">
                <p class="flex items-center px-6 py-5 font-semibold cursor-pointer" @click="showResearch" :class="{'clicked': $route.meta.isResearchOpen}"><i class="pi pi-book pr-5" style="font-size: 1.2rem"></i>Research</p>

                <div v-if="$route.meta.isResearchOpen || displayResearch" class="text-sm">
                    <router-link to="/research/create">
                        <div @click="selectResearchCreate" :class="$route.meta.isResearchCreate ? 'bg-orange-300 text-white font-semibold' : 'text-white'" class="flex items-center justify-start px-16 py-3 hover:bg-orange-300">
                            <i class="pi pi-file-edit pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p>Create</p>
                        </div>
                    </router-link>

                    <router-link to="/research/view">
                        <div @click="selectResearchView" :class="$route.meta.isResearchView ? 'bg-orange-300 text-white font-semibold' : 'text-white'" class="flex items-center justify-start px-16 py-3 hover:bg-orange-300 rounded-b-md">
                            <i class="pi pi-eye pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p>View</p>
                        </div>  
                    </router-link>
                </div>
            </div>

            <!-- Gallery -->
            <div class="bg-black rounded-md my-3">
                <p class="flex items-center px-6 py-5 font-semibold cursor-pointer" @click="showGallery" :class="{'clicked': $route.meta.isGalleryOpen}"><i class="pi pi-images pr-5" style="font-size: 1.2rem"></i>Gallery</p>

                <div v-if="$route.meta.isGalleryOpen || displayGallery" class="text-sm">
                    <router-link to="/gallery/create">
                        <div @click="selectGalleryCreate" :class="$route.meta.isGalleryCreate ? 'bg-orange-300 text-white font-semibold' : 'text-white'" class="flex items-center justify-start px-16 py-3 hover:bg-orange-300">
                            <i class="pi pi-file-edit pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p>Create</p>
                        </div>
                    </router-link>

                    <router-link to="/gallery/view">
                        <div @click="selectGalleryView" :class="$route.meta.isGalleryView ? 'bg-orange-300 text-white font-semibold' : 'text-white'" class="flex items-center justify-start px-16 py-3 hover:bg-orange-300 rounded-b-md">
                            <i class="pi pi-eye pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p>View</p>
                        </div>  
                    </router-link>
                </div>
            </div>

            <!-- Contact -->
            <div class="bg-black rounded-md my-3">
                <router-link to="/contact/view">
                    <p @click="showContact" :class="{'clicked': $route.meta.isContactOpen || displayContact}" class="bg-black px-6 py-5 rounded-md font-semibold mb-2 flex items-center"><i class="pi pi-comment pr-5" style="font-size: 1.2rem"></i>Contact</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from 'primevue/sidebar';

export default {
    components: {
        Sidebar,
    },

    data() {
        return {
            displayDashboard: false,
            displaySlider: false,
            displayAreaOfWork: false,
            displayProjects: false,
            displayHome: false,
            displayGallery: false,
            displayContact: false,
            displayResearch: false,

            showAOWColor: true,
            aowCreateColor: false,
            aowViewColor: false,

            showHomeColor: true,
            homeCreateColor: false,
            homeViewColor: false,

            showSliderColor: true,
            sliderCreateColor: false,
            sliderViewColor: true,

            showProjectColor: true,
            projectCreateColor: false,
            projectViewColor: false,

            showGalleryColor: true,
            galleryCreateColor: false,
            galleryViewColor: false,

            showResearchColor: true,
            researchCreateColor: false,
            researchViewColor: false,
        }
    },

    methods: {
        showDashboard() {
            if(this.displayDashboard == false) {
                this.displayDashboard = true
                this.displaySlider = false
                this.displayAreaOfWork = false
                this.displayProjects = false
                this.displayHome = false
                this.displayGallery = false
                this.displayContact = false
                this.displayResearch = false
            } else {
                this.displayDashboard = true
            }
        },

        showAreaOfWork() {
            if(this.displayAreaOfWork == false) {
                this.displayDashboard = false
                this.displayAreaOfWork = true
                this.displaySlider = false
                this.displayProjects = false
                this.displayHome = false
                this.displayGallery = false
                this.displayContact = false
                this.displayResearch = false
            } else {
                this.displayAreaOfWork = true
            }
        },

        selectAOWCreate() {
            this.$route.meta.isAOWOpen = true
            this.showAOWColor = false
            this.aowCreateColor = true
            this.aowViewColor = false
        },

        selectAOWView() {
            this.$route.meta.isAOWOpen = true
            this.showAOWColor = false
            this.aowCreateColor = false
            this.aowViewColor = true
        },

        showProjects() {
            if(this.displayProjects == false) {
                this.displayDashboard = false
                this.displaySlider = false
                this.displayAreaOfWork = false
                this.displayProjects = true
                this.displayHome = false
                this.displayGallery = false
                this.displayContact = false
                this.displayResearch = false
            } else {
                this.displayProjects = true
            }
        },

        selectProjectCreate() {
            this.$route.meta.isProjectOpen = true
            this.showProjectColor = false
            this.projectCreateColor = true
            this.projectViewColor = false
        },

        selectProjectView() {
            this.$route.meta.isProjectOpen = true
            this.showProjectColor = false
            this.projectCreateColor = false
            this.projectViewColor = true
        },

        showHome() {
            if(this.displayHome == false) {
                this.displayDashboard = false
                this.displaySlider = false
                this.displayAreaOfWork = false
                this.displayProjects = false
                this.displayHome = true
                this.displayGallery = false
                this.displayContact = false
                this.displayResearch = false
            } else {
                this.displayHome = true
            }
        },

        selectHomeCreate() {
            this.$route.meta.isHomeOpen = true
            this.showHomeColor = false
            this.homeCreateColor = true
            this.homeViewColor = false
        },

        selectHomeView() {
            this.$route.meta.isHomeOpen = true
            this.showHomeColor = false
            this.homeCreateColor = false
            this.homeViewColor = true
        },

        showSlider() {
            if(this.displaySlider == false) {
                this.displayDashboard = false
                this.displaySlider = true
                this.displayAreaOfWork = false
                this.displayProjects = false
                this.displayHome = false
                this.displayGallery = false
                this.displayContact = false
                this.displayResearch = false
            } else {
                this.displaySlider = true
            }
        },

        selectSliderCreate() {
            this.$route.meta.isSliderOpen = true
            this.showSliderColor = false
            this.sliderCreateColor = true
            this.sliderViewColor = false
        },

        selectSliderView() {
            this.$route.meta.isSliderOpen = true
            this.showSliderColor = false
            this.sliderCreateColor = false
            this.sliderViewColor = true
        },

        showGallery() {
            if(this.displayGallery == false) {
                this.displayDashboard = false
                this.displaySlider = false
                this.displayAreaOfWork = false
                this.displayProjects = false
                this.displayHome = false
                this.displayGallery = true
                this.displayContact = false
                this.displayResearch = false
            } else {
                this.displayGallery = true
            }
        },

        selectGalleryCreate() {
            this.$route.meta.isGalleryOpen = true
            this.showGalleryColor = false
            this.galleryCreateColor = true
            this.galleryViewColor = false
        },

        selectGalleryView() {
            this.$route.meta.isGalleryOpen = true
            this.showGalleryColor = false
            this.galleryCreateColor = false
            this.galleryViewColor = true
        },

        showResearch() {
            if(this.displayResearch == false) {
                this.displayDashboard = false
                this.displaySlider = false
                this.displayAreaOfWork = false
                this.displayProjects = false
                this.displayHome = false
                this.displayGallery = false
                this.displayContact = false
                this.displayResearch = true
            } else {
                this.displayResearch = true
            }
        },

        selectResearchCreate() {
            this.$route.meta.isResearchOpen = true
            this.showResearchColor = false
            this.researchCreateColor = true
            this.researchViewColor = false
        },

        selectResearchView() {
            this.$route.meta.isResearchOpen = true
            this.showResearchColor = false
            this.researchCreateColor = false
            this.researchViewColor = true
        },

        showContact() {
            if(this.displayContact == false) {
                this.displayDashboard = false
                this.displaySlider = false
                this.displayAreaOfWork = false
                this.displayProjects = false
                this.displayHome = false
                this.displayGallery = false
                this.displayContact = true
                this.displayResearch = false
            } else {
                this.displayContact = true
            }
        },

        getLogout() {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
.clicked {
    @apply text-primary;
}
</style>
