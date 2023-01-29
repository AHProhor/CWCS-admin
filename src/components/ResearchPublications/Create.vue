<template>
    <div class="w-full flex flex-col screen-height bg-gray-100">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white text-left p-6 rounded-lg shadow-md 2xl:px-52">
                <div class="pb-6">
                    <p class="text-xl font font-semibold pb-1">Create Research</p>
                </div>

                <div class="">
                    <div class="w-full pb-4 flex flex-col">
                        <div class="pb-4">
                            <p class="pb-1 text-gray-500">Title</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="campaign.title"/>
                        </div>

                        <div class="pb-4">
                            <p class="pb-1 text-gray-500">Short Details</p>
                            <Textarea class="w-full" v-model="campaign.details" :autoResize="true" rows="4" cols="30" />
                        </div>

                        <div class="pb-4">
                            <p class="pb-1 text-gray-500">Reseach PDF File</p>
                            <input type="file" accept="application/pdf,application/vnd.ms-excel" class="fileinput" @change="onChange">
                        </div>

                        <div class="pb-4">
                            <p class="pb-1 text-gray-500">Banner Image</p>
                            <div class="flex items-center">
                                <img v-if="campaign.image" class="h-28 w-32" :src="campaign.image">
                                <input :class="campaign.image ? 'ml-4' : 'ml-0'" type="file" accept="image/*" @change="uploadImage">
                            </div>
                        </div>
                    
                        <div class="flex justify-center py-10">
                            <button @click="submit" class="submit-button">Submit</button>
                        </div>
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

    data() {
        return {
            host: "https://cmsapi.smicee.com",
            satrtingDate: null,
            finishingDate: null,
            campaign: {
                title: "",
                details: "",
                description:"",
                projects:null,
                image: null,
            },
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
            projects: state => state.projects.projects,
        })
    },

    mounted() {
        this.$store.dispatch('projects/get_projects')
    },

    methods: {
        submit() {
            console.log(this.campaign)
            this.$store.dispatch('campaigns/post_campaigns', this.campaign).then(response => {
                console.log(response.data)    
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    this.campaign.title= ""
                    this.campaign.details = ""
                    this.campaign.projects = null
                    this.campaign.image = null
                    this.campaign.description=""
                    
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
                this.campaign.image = e.target.result;
            };
        },
        async onChange(e) {
            let file = e.target.files[0];
            let formData = new FormData();
            formData.append('pdf', file);

            await axios.post(`/materials/upload/${this.material.SKU}`, formData)
                .then( res => console.log(res.data) )
        },
    }
}
</script>