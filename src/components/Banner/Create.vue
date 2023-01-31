<template>
    <div class="w-full flex flex-col screen-height bg-gray-100">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white text-left p-6 rounded-lg shadow-md 2xl:px-52">
                <div class="pb-6">
                    <p class="text-xl font font-semibold pb-1">Create Home</p>
                </div>

                <div>
                    <!-- Top Banner -->
                    <div>
                        <p class="text-lg pb-2">Top Banner</p>
                        <div class="w-full pb-4">
                            <p class="pb-1 text-gray-500">Title</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="banner.title"/>
                        </div>

                        <div class="pb-4">
                            <p class="pb-1 text-gray-500">Short Details</p>
                            <Textarea class="w-full" v-model="banner.details" :autoResize="true" rows="4" cols="30" />
                        </div>

                        <div class="pb-4">
                            <p class="pb-1 text-gray-500">Banner Image</p>
                            <div class="flex items-center">
                                <img v-if="banner.top_banner_image" class="h-28 w-32" :src="banner.top_banner_image">
                                <input :class="banner.top_banner_image ? 'ml-4' : 'ml-0'" type="file" accept="image/*" @change="uploadTopBannerImage">
                            </div>
                        </div>

                    </div>
                    
                    <!-- Mid Layer Banner -->
                    <div class="pt-8">
                        <p class="text-lg pb-2">Mid Layer Section</p>

                        <div class="pb-4">
                            <p class="pb-1 text-gray-500">Mid Banner Image</p>
                            <div class="flex items-center">
                                <img v-if="banner.mid_banner_image" class="h-28 w-32" :src="banner.mid_banner_image">
                                <input :class="banner.mid_banner_image ? 'ml-4' : 'ml-0'" type="file" accept="image/*" @change="uploadMidLayerImage">
                            </div>
                        </div>
                    </div>


                    <!-- Bottom Layer Banner -->
                    <div class="pt-8">
                        <p class="text-lg pb-2">Bottom Layer Section</p>
                        <div class="pb-4">
                            <p class="pb-1 text-gray-500">Bottom Banner Image</p>
                            <div class="flex items-center">
                                <img v-if="banner.mid_layer_image" class="h-28 w-32" :src="banner.mid_layer_image">
                                <input :class="banner.mid_layer_image ? 'ml-4' : 'ml-0'" type="file" accept="image/*" @change="uploadBottomLayerImage">
                            </div>
                        </div>
                        <!-- Company Experience Data -->
                        <p class="text-lg pt-4 pb-2">Company Overview</p>
                        <div class="w-full pb-4">
                            <div class="flex flex-col">
                                <div class="flex items-center gap-6">
                                    <p class="font-semibold">1</p>
                                    <div>
                                        <p>Icon: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="banner.experience_data.year.icon"/>
                                    </div>
                                    <div>
                                        <p>Value: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="banner.experience_data.year.value"/>
                                    </div>
                                    <div>
                                        <p>Title: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="banner.experience_data.year.title"/>
                                    </div>
                                </div>
                                <div class="flex items-center gap-6 pt-4">
                                    <p class="font-semibold">2</p>
                                    <div>
                                        <p>Icon: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="banner.experience_data.concern.icon"/>
                                    </div>
                                    <div>
                                        <p>Value: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="banner.experience_data.concern.value"/>
                                    </div>
                                    <div>
                                        <p>Title: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="banner.experience_data.concern.title"/>
                                    </div>
                                </div>
                                <div class="flex items-center gap-6 pt-4">
                                    <p class="font-semibold">3</p>
                                    <div>
                                        <p>Icon: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="banner.experience_data.client.icon"/>
                                    </div>
                                    <div>
                                        <p>Value: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="banner.experience_data.client.value"/>
                                    </div>
                                    <div>
                                        <p>Title: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="banner.experience_data.client.title"/>
                                    </div>
                                </div>
                                <div class="flex items-center gap-6 pt-4">
                                    <p class="font-semibold">4</p>
                                    <div>
                                        <p>Icon: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="banner.experience_data.projects.icon"/>
                                    </div>
                                    <div>
                                        <p>Value: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="banner.experience_data.projects.value"/>
                                    </div>
                                    <div>
                                        <p>Title: </p>
                                        <InputText type="text" class="w-full dropdown-height" v-model="banner.experience_data.projects.title"/>
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
                                <img v-if="banner.footer_image" class="h-28 w-32" :src="banner.footer_image">
                                <input :class="banner.footer_image ? 'ml-4' : 'ml-0'" type="file" accept="image/*" @change="uploadFooterImage">
                            </div>
                        </div>
                    </div>

                    
                    <div class="flex justify-center py-10">
                        <button @click="createHome" class="submit-button">Submit</button>
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
            host: "https://cwcsapi.smicee.com",
            banner: {
                title: "",
                details: "",
                // image: null,
                top_banner_image:null,
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

    methods: {
        createHome() {
            console.log(this.banner)
            this.$store.dispatch('home/create_home', this.banner).then(response => {
                console.log(response.data)    
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})

                    this.banner.title= ""
                    this.banner.details = ""
                    this.banner.image = null,
                    this.banner.top_banner_image = null,
                    this.banner.mid_banner_image = null,
                    this.banner.mid_layer_image = null,
                    this.banner.footer_image = null

                    this.banner.experience_data.year.icon = ""
                    this.banner.experience_data.year.title = ""
                    this.banner.experience_data.year.value = ""

                    this.banner.experience_data.concern.icon = ""
                    this.banner.experience_data.concern.title = ""
                    this.banner.experience_data.concern.value = ""

                    this.banner.experience_data.client.icon = ""
                    this.banner.experience_data.client.title = ""
                    this.banner.experience_data.client.value = ""

                    this.banner.experience_data.projects.icon = ""
                    this.banner.experience_data.projects.title = ""
                    this.banner.experience_data.projects.value = ""
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
        },

        uploadTopBannerImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.banner.top_banner_image = e.target.result;
            };
        },

        uploadMidLayerImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.banner.mid_banner_image = e.target.result;
            };
        },

        uploadBottomLayerImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.banner.mid_layer_image = e.target.result;
            };
        },

        uploadFooterImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.banner.footer_image = e.target.result;
            };
        },
    }
}
</script>