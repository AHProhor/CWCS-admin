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
                            <p class="pb-1 text-gray-500">Author Name</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="research.author_name"/>
                        </div>

                        <div class="pb-4">
                            <p class="pb-1 text-gray-500">Title</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="research.paper_title"/>
                        </div>

                        <div class="pb-4">
                            <p class="pb-1 text-gray-500">Reseach PDF File</p>
                            <input type="file" accept="application/pdf" class="fileinput" @change="uploadPDF( $event )">
                        </div>

                        <div class="pb-4">
                            <p class="pb-1 text-gray-500">Book Image</p>
                            <div class="flex items-center">
                                <img v-if="research.book_banner_image" class="h-28 w-32" :src="research.book_banner_image">
                                <input :class="research.book_banner_image ? 'ml-4' : 'ml-0'" type="file" accept="image/*" @change="uploadImage">
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
export default {
    components: {
        InputText,
        Textarea,
        vSelect,
        Toast,
        Calendar,
    },

    data() {
        return {
            host: "https://cmsapi.smicee.com",
            research: {
                author_name: '',
                paper_title: '',
                pdf:'',
                book_banner_image: null,
            }
        }
    },

    computed: {
        ...mapState ({
            createResearch: state => state.research.createResearch,
        })
    },

    methods: {
        submit() {
            console.log(this.research)
            this.$store.dispatch('research/create_research', this.research).then(response => {
                console.log(response.data)    
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    this.research.author_name= ""
                    this.research.paper_title = ""
                    this.research.pdf = null
                    this.research.book_banner_image = null
                    
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
                this.research.book_banner_image = e.target.result;
            };
        },

        uploadPDF(e) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = e =>{
                this.research.pdf = e.target.result;
            };
        },
    }
}
</script>