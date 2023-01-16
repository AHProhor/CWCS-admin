<template>
    <div class="w-full flex flex-col screen-height bg-gray-100">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white text-left p-6 rounded-lg shadow-md 2xl:px-52">
                <div class="pb-6">
                    <p class="text-xl font font-semibold pb-1">Create Gallery</p>
                </div>

                <div>
                    <div class="pb-4 flex">
                        <div class="w-1/2">
                            <p class="pb-1 text-gray-500">Projects</p>
                            <vSelect 
                                class="text-gray-400"
                                :options="projects"
                                :reduce="(title) => title.id" 
                                label="title" 
                                v-model="gallery.project"
                                placeholder="Select"
                            >
                            </vSelect>
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Image</p>
                        <div class="flex items-center">
                            <img v-if="gallery.image" class="h-28 w-32" :src="gallery.image">
                            <input :class="gallery.image ? 'ml-4' : 'ml-0'" type="file" accept="image/*" @change="uploadImage">
                        </div>
                    </div>
                    
                    <div class="flex items-start py-10 ">
                        <button @click="submit" class="submit-button">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import { mapState } from 'vuex';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
    components: {
        InputText,
        Textarea,
        Toast,
        vSelect
    },

    data() {
        return {
            host: "https://cmsapi.smicee.com",
            gallery: {
                title: "no data",
                project: null,
                image: null,
            },
        }
    },

    computed: {
        ...mapState ({
            projects: state => state.projects.projects
        })
    },

    mounted() {
        this.$store.dispatch('projects/get_projects')
    },

    methods: {
        submit() {
            console.log(this.gallery)
            this.$store.dispatch('gallery/post_gallery', this.gallery).then(response => {
                console.log(response.data)    
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    this.gallery.image = null
                    this.gallery.project = null
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
        },

        uploadImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.gallery.image = e.target.result; 
            };
        }
    }
}
</script>
