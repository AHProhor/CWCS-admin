<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white text-left p-6 rounded-lg shadow-md 2xl:px-52">
                <div class="pb-6">
                    <p class="text-xl font font-semibold pb-1">Edit Project</p>
                </div>

                <div>
                    <div class="pb-4 flex w-full">
                        <div class="w-full">
                            <p class="pb-1 text-gray-500 ">Title</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="edit_project.title"/>
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Short Description</p>
                        <Textarea class="w-full" v-model="aow.short_description" :autoResize="true" rows="4" cols="30" />
                    </div>

                    <div class="pb-4 flex w-full">
                        <div class="w-1/2 pr-2">
                            <p class="pb-1 text-gray-500">Ongoing Project</p>
                            <vSelect 
                                class="text-gray-400"
                                :options="featured_options"
                                :reduce="(name) => name.value" 
                                label="name" 
                                v-model="edit_project.featured"
                                placeholder="Select"
                            >
                            </vSelect>
                        </div>
                        <div class="pl-2 w-1/2">
                            <p class="pb-1 text-gray-500">Area of Work</p>
                            <vSelect 
                                class="text-gray-400"
                                :options="aow"
                                :reduce="(title) => title.id" 
                                label="title" 
                                v-model="edit_project.areaofwork"
                                placeholder="Select"
                            >
                            </vSelect>
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Description</p>
                        <ckeditor
                            :editor="editor"
                            v-model="edit_project.details"
                            :config="editorConfig"
                        ></ckeditor>
                    </div>

                    <div class="pb-4 flex w-1/2">
                        <div class="w-full">
                            <p class="pb-1 text-gray-500 ">Priority</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="edit_project.priority"/>
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Image</p>
                        <div class="flex items-center">
                            <img class="h-28 w-32" :src="show_image">
                            <input class="ml-4" type="file" accept="image/*" @change="uploadImage">
                        </div>
                    </div>
                    
                    <div class="flex justify-center py-10">
                        <button @click="submit" class="submit-button">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import ToggleButton from 'primevue/togglebutton';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
    components: {
        InputText,
        Textarea,
        Toast,
        vSelect,
        ToggleButton,
    },

    props:["slug"],

    data() {
        return {
            host: "https://cwcsapi.smicee.com",
            edit_project: {
                title: "",
                short_description: "",
                details: "",
                featured: null,
                priority: null,
                areaofwork: null,
                image: null,
            },
            show_image: null,
            featured_options: [
                {
                    value: 1,
                    name: 'Yes'
                },
                {
                    value: 0,
                    name: 'No'
                }
            ],
            editor: ClassicEditor,
            editorData: "<p>What's on your mind ?</p>",
            editorConfig: {
                fillEmptyBlocks: false,
                basicEntities: false,
                entities: false,
                entities_greek: false,
                entities_latin: false,
                entities_additional: "",
                language: "fr",
                wordCount: {
                container: document.getElementById("wordcount")
                },
                ckfinder: {
                // Upload the images to the server using the CKFinder QuickUpload command.
                uploadUrl:
                    "https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json",

                // Define the CKFinder configuration (if necessary).
                options: {
                    resourceType: "Images"
                }
                },
                mediaEmbed: {
                previewsInData: true
                }
            }
        }
    },

    computed: {
        ...mapState ({
            aow: state => state.areaOfWork.areaOfWork,
            projectsData: state => state.projects.project_detail
        })
    },

    mounted() {
        this.$store.dispatch('projects/get_project_by_slug',this.slug),
        this.$store.dispatch('areaOfWork/get_AOW')
        console.log(this.slug)
    },

    methods: {
        submit() {
            // console.log(this.edit_project)  
            this.$store.dispatch('projects/edit_Projects', {project:this.edit_project, slug:this.slug}).then(response => {
                console.log(response.data)    
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    setTimeout( ()=> this.$router.push('/projects/view'),3000)
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
                this.edit_project.image = e.target.result; 
                this.show_image = e.target.result; 
            };
        },
    },

    watch:{
        projectsData(oldValue, newValue){
            this.edit_project.title = this.projectsData.title
            this.edit_project.short_description = this.projectsData.short_description
            this.edit_project.details = this.projectsData.details
            this.edit_project.priority = this.projectsData.priority
            this.edit_project.areaofwork = this.projectsData.areaofwork[0]
            if(this.projectsData.featured == false){
                this.edit_project.featured = 'No'
            }
            else{
                this.edit_project.featured = 'Yes'
            }
            this.show_image = this.host + this.projectsData.image
        }
    }
}
</script>
