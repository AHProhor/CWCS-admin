<template>
    <div class="w-full flex flex-col items-center bg-gray-100 screen-height">
        <div class="w-full">
            <div class="text-left p-6 w-full">
                <div class="pb-6">
                    <p class="text-xl font font-semibold pb-1">Dashboard</p>
                </div>
                <div class="w-full grid grid-cols-4 flex items-center gap-4">
                    <!-- Total Area of Work -->
                    <router-link to="/area-of-work/view">
                        <div class="bg-white rounded-lg shadow-lg p-6 flex items-center">
                            <div class="bg-primary rounded-full w-12 h-12">
                                <p class="flex justify-center items-center h-full text-white"><i class="pi pi-images" style="font-size: 1.6rem"></i></p>
                            </div>
                            <div class="pl-6 flex items-center">
                                <div class="text-primary">
                                    <p class="font-semibold text-2xl">{{ items.Areaofwork }}</p>
                                    <p>Area Of Work</p>
                                </div>
                            </div>
                        </div>
                    </router-link>

                    <!-- Total Projects -->
                    <router-link to="/projects/view">
                        <div class="bg-white rounded-lg shadow-lg p-6 flex items-center">
                            <div class="bg-sky rounded-full w-12 h-12">
                                <p class="flex justify-center items-center h-full text-white"><i class="pi pi-building" style="font-size: 1.6rem"></i></p>
                            </div>
                            <div class="pl-6 flex items-center">
                                <div class="text-sky">
                                    <p class="font-semibold text-2xl">{{ items.projects }}</p>
                                    <p>Projects</p>
                                </div>
                            </div>
                        </div>
                    </router-link>

                    <!-- Total Research -->
                    <router-link to="/research/view">
                        <div class="bg-white rounded-lg shadow-lg p-6 flex items-center">
                            <div class="bg-red-500 rounded-full w-12 h-12">
                                <p class="flex justify-center items-center h-full text-white"><i class="pi pi-book" style="font-size: 1.4rem"></i></p>
                            </div>
                            <div class="pl-6 flex items-center">
                                <div class="text-red-500">
                                    <p class="font-semibold text-2xl">{{ items.research }}</p>
                                    <p>Research</p>
                                </div>
                            </div>
                        </div>
                    </router-link>

                    <!-- Gallery Image -->
                    <router-link to="/gallery/view">
                        <div class="bg-white rounded-lg shadow-lg p-6 flex items-center">
                            <div class="bg-black rounded-full w-12 h-12">
                                <p class="flex justify-center items-center h-full text-white"><i class="pi pi-copy" style="font-size: 1.6rem"></i></p>
                            </div>
                            <div class="pl-6 flex items-center">
                                <div class="text-black">
                                    <p class="font-semibold text-2xl">{{ items.gallery }}</p>
                                    <p>Gallery Image</p>
                                </div>
                            </div>
                        </div>
                    </router-link>

                    <!-- Banner -->
                    <router-link to="/gallery/view">
                        <div class="bg-white rounded-lg shadow-lg p-6 flex items-center">
                            <div class="bg-black rounded-full w-12 h-12">
                                <p class="flex justify-center items-center h-full text-white"><i class="pi pi-copy" style="font-size: 1.6rem"></i></p>
                            </div>
                            <div class="pl-6 flex items-center">
                                <div class="text-black">
                                    <p class="font-semibold text-2xl">{{ items.home }}</p>
                                    <p>Banners</p>
                                </div>
                            </div>
                        </div>
                    </router-link>

                    <!-- Message -->
                    <router-link to="/contact/view">
                        <div class="bg-white rounded-lg shadow-lg p-6 flex items-center">
                            <div class="bg-gray-500 rounded-full w-12 h-12">
                                <p class="flex justify-center items-center h-full text-white"><i class="pi pi-copy" style="font-size: 1.6rem"></i></p>
                            </div>
                            <div class="pl-6 flex items-center">
                                <div class="text-gray-500">
                                    <p class="font-semibold text-2xl">{{ items.contact }}</p>
                                    <p>Messages</p>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    components: {},

    data() {
        return {}
    },

    computed: {
        ...mapState({
            items: state => state.dashboard.items
        })
    },

    mounted() {
        this.$store.dispatch('dashboard/get_Items_Count')
    },
}
</script>
