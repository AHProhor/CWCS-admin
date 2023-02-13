<template>
    <div class="w-full flex flex-col screen-height bg-gray-100">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white text-left p-6 rounded-lg shadow-md 2xl:px-52">
                <div class="pb-6">
                    <p class="text-xl font font-semibold pb-1">Edit Home</p>
                </div>

                <div>
                    <!-- Top Banner -->
                    <!-- <div>
                        <p class="text-lg pb-2">Top Banner</p>
                        <div class="w-full pb-4">
                            <p class="pb-1 text-gray-500">Title</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="homeDetails.title"/>
                        </div>

                        <div class="pb-4">
                            <p class="pb-1 text-gray-500">Short Details</p>
                            <Textarea class="w-full" v-model="homeDetails.details" :autoResize="true" rows="4" cols="30" />
                        </div>

                        <div class="pb-4">
                            <p class="pb-1 text-gray-500">Top Banner Image</p>
                            <div class="flex items-center">
                                <img v-if="show_top_banner_image" class="h-28 w-32" :src="show_top_banner_image">
                                <input :class="show_top_banner_image ? 'ml-4' : 'ml-0'" type="file" accept="image/*" @change="uploadTopBannerImage">
                            </div>
                        </div>

                    </div> -->
                    
                    <!-- Mid Layer Banner -->
                    <div class="">
                        <p class="text-lg pb-2">Mid Layer Section</p>

                        <div class="pb-4">
                            <p class="pb-1 text-gray-500">Mid Banner Image</p>
                            <div class="flex items-center">
                                <img v-if="show_mid_banner_image" class="h-28 w-32" :src="show_mid_banner_image">
                                <input :class="show_mid_banner_image ? 'ml-4' : 'ml-0'" type="file" accept="image/*" @change="uploadMidLayerImage">
                            </div>
                        </div>
                    </div>


                    <!-- Bottom Layer Banner -->
                    <div class="pt-8">
                        <p class="text-lg pb-2">Bottom Layer Section</p>

                        <div class="pb-4">
                            <p class="pb-1 text-gray-500">Bottom Banner Image</p>
                            <div class="flex items-center">
                                <img v-if="show_mid_layer_image" class="h-28 w-32" :src="show_mid_layer_image">
                                <input :class="show_mid_layer_image ? 'ml-4' : 'ml-0'" type="file" accept="image/*" @change="uploadBottomLayerImage">
                            </div>
                        </div>

                        <div class="w-full pb-4">
                            <p class="pb-2 text-lg pt-2">Company Overview</p>
                            <div class="flex flex-col">
                                <div class="flex items-center gap-6" v-if="homeDetails.experience_data">
                                    <p class="font-semibold">1</p>
                                    <div>
                                        <p>Icon: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="homeDetails.experience_data.year.icon"/>
                                    </div>
                                    <div>
                                        <p>Value: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="homeDetails.experience_data.year.value"/>
                                    </div>
                                    <div>
                                        <p>Title: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="homeDetails.experience_data.year.title"/>
                                    </div>
                                </div>
                                <div class="flex items-center gap-6 pt-4" v-if="homeDetails.experience_data">
                                    <p class="font-semibold">2</p>
                                    <div>
                                        <p>Icon: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="homeDetails.experience_data.concern.icon"/>
                                    </div>
                                    <div>
                                        <p>Value: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="homeDetails.experience_data.concern.value"/>
                                    </div>
                                    <div>
                                        <p>Title: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="homeDetails.experience_data.concern.title"/>
                                    </div>
                                </div>
                                <div class="flex items-center gap-6 pt-4" v-if="homeDetails.experience_data">
                                    <p class="font-semibold">3</p>
                                    <div>
                                        <p>Icon: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="homeDetails.experience_data.client.icon"/>
                                    </div>
                                    <div>
                                        <p>Value: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="homeDetails.experience_data.client.value"/>
                                    </div>
                                    <div>
                                        <p>Title: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="homeDetails.experience_data.client.title"/>
                                    </div>
                                </div>
                                <div class="flex items-center gap-6 pt-4" v-if="homeDetails.experience_data">
                                    <p class="font-semibold">4</p>
                                    <div>
                                        <p>Icon: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="homeDetails.experience_data.projects.icon"/>
                                    </div>
                                    <div>
                                        <p>Value: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="homeDetails.experience_data.projects.value"/>
                                    </div>
                                    <div>
                                        <p>Title: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="homeDetails.experience_data.projects.title"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Image  -->
                    <div class="pt-8">
                        <p class="text-lg pb-2">Footer Section</p>
                        <div class="pb-4">
                            <p class="pb-1 text-gray-500">Footer Image</p>
                            <div class="flex items-center">
                                <img v-if="show_footer_image" class="h-28 w-32" :src="show_footer_image">
                                <input :class="show_footer_image ? 'ml-4' : 'ml-0'" type="file" accept="image/*" @change="uploadFooterImage">
                            </div>
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
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import Toast from 'primevue/toast';
import Calendar from 'primevue/calendar';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapState } from 'vuex';

export default {
    components: {
        InputText,
        Textarea,
        vSelect,
        Toast,
        Calendar,
        ClassicEditor
    },

    props:['slug'],

    data() {
        return {
            host: "https://cwcsapi.smicee.com",
            homeDetails: {
                id:null,
                // title: "",
                // details: "",
                // top_banner_image:null,
                mid_banner_image:null,
                mid_layer_image:null,
                footer_image:null,
                experience_data: {
                    year: {
                        icon: "",
                        value: "",
                        title: ""
                    },
                    concern: {
                        icon: "",
                        value: "",
                        title: ""
                    }, 
                    client: {
                        icon: "",
                        value: "",
                        title: ""
                    }, 
                    projects:{
                        icon: "",
                        value: "",
                        title: ""
                    }
                },
            },

            // show_top_banner_image:null,
            show_mid_banner_image:null,
            show_mid_layer_image:null,
            show_footer_image:null,

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
            details: state => state.home.home_details,
        })
    },

    mounted() {
        this.$store.dispatch('home/get_home_by_slug',this.slug)
    },

    watch:{
        details(oldValue, newValue){
            this.homeDetails.id = this.details.id,

            // this.homeDetails.title = this.details.title,
            // this.homeDetails.details = this.details.details,
            // this.show_top_banner_image = this.host+this.details.top_banner_image,
            this.show_mid_banner_image = this.host+this.details.mid_banner_image,
            this.show_mid_layer_image = this.host+this.details.mid_layer_image,
            this.show_footer_image = this.host+this.details.footer_image,
            this.homeDetails.experience_data.year.icon = this.details.experience_data.year.icon
            this.homeDetails.experience_data.year.value = this.details.experience_data.year.value
            this.homeDetails.experience_data.year.title = this.details.experience_data.year.title
            this.homeDetails.experience_data.concern.icon = this.details.experience_data.concern.icon
            this.homeDetails.experience_data.concern.value = this.details.experience_data.concern.value
            this.homeDetails.experience_data.concern.title = this.details.experience_data.concern.title
            this.homeDetails.experience_data.client.icon = this.details.experience_data.client.icon
            this.homeDetails.experience_data.client.value = this.details.experience_data.client.value
            this.homeDetails.experience_data.client.title = this.details.experience_data.client.title
            this.homeDetails.experience_data.projects.icon = this.details.experience_data.projects.icon
            this.homeDetails.experience_data.projects.value = this.details.experience_data.projects.value
            this.homeDetails.experience_data.projects.title = this.details.experience_data.projects.title
        }
    },

    methods: {
        submit() {
            console.log(this.homeDetails)
            this.$store.dispatch('home/update_home', this.homeDetails).then(response => {
                console.log(response.data)    
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    setTimeout( ()=> this.$router.push('/home/view'),3000)
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
        },

        // uploadTopBannerImage(e){
        //     const image = e.target.files[0];
        //     const reader = new FileReader();
        //     reader.readAsDataURL(image);
        //     reader.onload = e =>{
        //         this.homeDetails.top_banner_image = e.target.result;
        //         this.show_top_banner_image = e.target.result;
        //     };
        // },

        uploadMidLayerImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.homeDetails.mid_banner_image = e.target.result;
                this.show_mid_banner_image = e.target.result;
            };
        },

        uploadBottomLayerImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.homeDetails.mid_layer_image = e.target.result;
                this.show_mid_layer_image = e.target.result;
            };
        },

        uploadFooterImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.homeDetails.footer_image = e.target.result;
                this.show_footer_image = e.target.result;
            };
        },
    }
}
</script>