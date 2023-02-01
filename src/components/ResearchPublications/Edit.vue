<template>
    <div class="w-full flex flex-col screen-height bg-gray-100">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white text-left p-6 rounded-lg shadow-md 2xl:px-52">
                <div class="pb-6">
                    <p class="text-xl font font-semibold pb-1">Edit Research</p>
                </div>

                <div>
                    <div class="w-full pb-6 flex">
                        <div class="w-full">
                            <p class="pb-1 text-gray-500">Author Name</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="edit_research.author_name"/>
                        </div>
                    </div>

                    <div class="w-full pb-6 flex">
                        <div class="w-full">
                            <p class="pb-1 text-gray-500">Title</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="edit_research.paper_title"/>
                        </div>
                    </div>

                    <div class="pb-6">
                        <p class="pb-1 text-gray-500">Reseach PDF File</p>
                        <p v-if="show_pdf" class="w-full pb-1">{{ show_pdf }}</p>
                        <input type="file" accept="application/pdf" class="fileinput" @change="uploadPDF( $event )">
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Banner Image</p>
                        <div class="flex items-center">
                            <img v-if="show_image" class="h-28 w-28" :src="show_image">
                            <input class="ml-4" type="file" accept="image/*" @change="uplaodImage">
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

    props:["slug"],

    data() {
        return {
            host: "https://cwcsapi.smicee.com",
            edit_research: {
                author_name: '',
                paper_title: '',
                pdf:null,
                book_banner_image: null,
            },
            show_image:null,
            show_pdf:null
        }
    },

    computed: {
        ...mapState ({
            researchData: state => state.research.research_detail
        })
    },

    watch:{
        researchData(oldValue, newValue){
            this.edit_research.author_name = this.researchData.author_name
            this.edit_research.paper_title = this.researchData.paper_title
            this.show_pdf = this.host + this.researchData.pdf
            this.show_image = this.host + this.researchData.book_banner_image
        }
    },

    mounted() {
        this.$store.dispatch('research/get_research_by_id', this.slug)
    },

    methods: {
        submit() {
            this.$store.dispatch('research/edit_research', {research:this.edit_research, id:this.slug}).then(response => {
                console.log(response.data)    
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    setTimeout( ()=> this.$router.push('/research/view'),3000)
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
                this.edit_research.book_banner_image = e.target.result;
                this.show_image = e.target.result;
            };
        },

        uploadPDF(e) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = e =>{
                this.research.pdf = e.target.result;
                this.show_pdf = e.target.result;
            };
        }
    },

    
}
</script>