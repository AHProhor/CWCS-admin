<template>
    <div class="flex w-full h-full px-5 pt-4 bg-primary">
        <div class="w-full text-white">
            <!-- Logo -->
            <div class="flex justify-center mb-4">
                <router-link to="/">
                    <img @click="visibleSidebar = false" class="h-28 w-20" src="../../assets/logo.png" alt="">
                </router-link>
            </div>

            <!-- Dashboard -->
            <div class="my-3">
                <router-link to="/">
                    <p @click="visibleSidebar = false" class="bg-black px-6 py-5 rounded-md font-semibold mb-2 flex"><i class="pi pi-home pr-5" style="font-size: 1.2rem"></i>Dashboard</p>
                </router-link>
            </div>

            <!-- Area Of Work -->
            <div class="bg-black rounded-md my-3">
                <p class="flex items-center px-6 py-5 font-semibold cursor-pointer" @click="showAreaOfWork"><i class="pi pi-heart pr-5" style="font-size: 1.2rem"></i>Area Of Work</p>

                <div v-if="displayAreaOfWork" class="text-sm">
                    <router-link to="/area-of-work/create">
                        <div class="flex items-center justify-start px-16 py-3 hover:bg-orange-300">
                            <i class="pi pi-file-edit pr-1 sm:pr-2 flex items-center" style="font-size: 0.8rem"></i>
                            <p @click="visibleSidebar = false" >Create</p>
                        </div>
                    </router-link>

                    <router-link to="/area-of-work/view">
                        <div class="flex items-center justify-start px-16 py-3 hover:bg-orange-300">
                            <i class="pi pi-eye pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p @click="visibleSidebar = false">View</p>
                        </div>        
                    </router-link>
                </div>
            </div>

            <!-- Projects -->
            <div class="bg-black rounded-md my-3">
                <p class="flex items-center px-6 py-5 font-semibold cursor-pointer" @click="showProjects"><i class="pi pi-database pr-5" style="font-size: 1.2rem"></i>Projects</p>

                <div v-if="displayProjects" class="text-sm">
                    <router-link to="/projects/create">
                        <div class="flex items-center justify-start px-16 py-3 hover:bg-orange-300">
                            <i class="pi pi-file-edit pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p @click="visibleSidebar = false">Create</p>
                        </div>        
                    </router-link>

                    <router-link to="/projects/view">
                        <div class="flex items-center justify-start px-16 py-3 hover:bg-orange-300">
                            <i class="pi pi-eye pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p @click="visibleSidebar = false">View</p>
                        </div>    
                    </router-link>
                </div>
            </div>

            <!-- Campaigns -->
            <!-- <div class="bg-black rounded-md my-3">
                <p class="flex items-center px-6 py-5 font-semibold cursor-pointer" @click="showCampaigns"><i class="pi pi-calendar pr-5" style="font-size: 1.2rem"></i>Campaigns</p>

                <div v-if="displayCampaigns" class="text-sm">
                    <router-link to="/campaigns/create">
                        <div class="flex items-center justify-start px-16 py-3 hover:bg-orange-300">
                            <i class="pi pi-file-edit pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p @click="visibleSidebar = false">Create</p>
                        </div> 
                    </router-link>

                    <router-link to="/campaigns/view">
                        <div class="flex items-center justify-start px-16 py-3 hover:bg-orange-300">
                            <i class="pi pi-eye pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p @click="visibleSidebar = false">View</p>
                        </div>  
                    </router-link>
                </div>
            </div> -->

            <!-- Gallery -->
            <div class="bg-black rounded-md my-3">
                <p class="flex items-center px-6 py-5 font-semibold cursor-pointer" @click="showGallery"><i class="pi pi-images pr-5" style="font-size: 1.2rem"></i>Gallery</p>

                <div v-if="displayGallery" class="text-sm">
                    <router-link to="/gallery/create">
                        <div class="flex items-center justify-start px-16 py-3 hover:bg-orange-300">
                            <i class="pi pi-file-edit pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p @click="visibleSidebar = false">Create</p>
                        </div>
                    </router-link>

                    <router-link to="/gallery/view">
                        <div class="flex items-center justify-start px-16 py-3 hover:bg-orange-300">
                            <i class="pi pi-eye pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p @click="visibleSidebar = false">View</p>
                        </div>  
                    </router-link>
                </div>
            </div>

            <!-- Contact -->
            <div class="bg-black rounded-md my-3">
                <router-link to="/contact/view">
                    <p @click="visibleSidebar = false" class="bg-black px-6 py-5 rounded-md font-semibold mb-2 flex items-center"><i class="pi pi-comment pr-5" style="font-size: 1.2rem"></i>Contact</p>
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
            visibleSidebar: true,
            displayAreaOfWork: false,
            displayProjects: false,
            displayCampaigns: false,
            displayGallery: false,
            displayContact: false,
        }
    },

    methods: {
        showAreaOfWork() {
            this.displayAreaOfWork = !this.displayAreaOfWork
        },
        showProjects() {
            this.displayProjects = !this.displayProjects
        },
        showCampaigns() {
            this.displayCampaigns = !this.displayCampaigns
        },
        showGallery() {
            this.displayGallery = !this.displayGallery
        },
        showContact() {
            this.displayContact = !this.displayContact
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
    @apply text-orange-400
}
</style>
