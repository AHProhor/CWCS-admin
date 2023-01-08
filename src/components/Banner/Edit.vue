<template>
    <div class="w-full flex flex-col screen-height bg-gray-100">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white text-left p-6 rounded-lg shadow-md 2xl:px-52">
                <div class="pb-6">
                    <p class="text-xl font font-semibold pb-1">Create Campaign</p>
                </div>

                <div>
                    <div class="w-full pb-4 flex">
                        <div class="w-1/2 pr-2">
                            <p class="pb-1 text-gray-500">Title</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="edit_campaign.title"/>
                        </div>

                        <div class="pl-2 w-1/2">
                            <p class="pb-1 text-gray-500">Project</p>
                            <vSelect 
                                class="text-gray-400"
                                :options="all_projects"
                                :reduce="(title) => title.id" 
                                label="title" 
                                v-model="edit_campaign.projects"
                                placeholder="Select"
                            >
                            </vSelect>
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Short Details</p>
                        <Textarea class="w-full" v-model="edit_campaign.details" :autoResize="true" rows="4" cols="30" />
                    </div>

                    <!-- <div class="w-full pb-4 flex gap-4">
                        <div class="flex flex-col field col-12 md:col-4 w-full">
                            <label for="icon" class="text-gray-500">Starting Date</label>
                            <Calendar class="dropdown-height" id="icon" v-model="startingDate" :showIcon="true" />
                        </div>
                        <div class="flex flex-col field col-12 md:col-4 w-full">
                            <label for="icon" class="text-gray-500">Finishing Date</label>
                            <Calendar class="dropdown-height" id="icon" v-model="finishingDate" :showIcon="true" />
                        </div>
                        <div class="felx felx-col w-full">
                            <p class="text-gray-500">Organizer</p>
                            <InputText type="text" class="w-full dropdown-height"/>
                        </div>
                    </div> -->

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Image</p>
                        <div class="flex items-center">
                            <img class="h-28 w-28" :src="show_image">
                            <input class="ml-4" type="file" accept="image/*" @change="uplaodImage">
                        </div>
                    </div>

                    <!-- <div class="pb-4">
                        <p class="pb-1 text-gray-500">Details</p>
                        <ckeditor
                            :editor="editor"
                            v-model="edit_campaign.description"
                            :config="editorConfig"
                        ></ckeditor>
                    </div> -->

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
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import Toast from 'primevue/toast';
import Calendar from 'primevue/calendar';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
    components: {
        InputText,
        Textarea,
        vSelect,
        Toast,
        Calendar,
        ClassicEditor
    },

    props:["slug"],

    data() {
        return {
            host: "https://cmsapi.smicee.com",
            startingDate: null,
            finishingDate: null,
            edit_campaign: {
                title: "",
                details: "",
                description:"",
                projects:null,
                image: null,
            },
            show_image:null,

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
            campaignData: state => state.campaigns.campaign_detail,
            all_projects: state => state.projects.projects,
        })
    },

    watch:{
        campaignData(oldValue, newValue){
            this.edit_campaign.title = this.campaignData.title
            this.edit_campaign.details = this.campaignData.details
            this.edit_campaign.description = this.campaignData.description
            this.edit_campaign.projects = this.campaignData.projects
            this.edit_campaign.image = this.campaignData.image
            this.show_image = this.host + this.campaignData.image
        }
    },

    mounted() {
        this.$store.dispatch('campaigns/get_Campaign_by_slug',this.slug)
        this.$store.dispatch('projects/get_projects')
    },

    methods: {
        submit() {
            this.$store.dispatch('campaigns/post_campaigns', this.edit_campaign).then(response => {
                console.log(response.data)    
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
        },

        uplaodImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.edit_campaign.image = e.target.result;
                this.show_image = e.target.result;
            };
        }
    },

    
}
</script>