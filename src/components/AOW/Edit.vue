<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white text-left p-6 rounded-lg shadow-md 2xl:px-52">
                <div class="pb-6">
                    <p class="text-xl font font-semibold pb-1">Edit Area Of Work</p>
                </div>

                <div>
                    <div class="pb-4 flex">
                        <div class="pr-2 w-full">
                            <p class="pb-1 text-gray-500">Title</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="edit_aow.title" />
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Details</p>
                        <Textarea class="w-full" v-model="edit_aow.details" :autoResize="true" rows="4" cols="30" />
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Image</p>
                        <div class="flex items-center">
                            <img class="h-28 w-28" :src="show_image">
                            <input :class="aow.image ? 'ml-4' : 'ml-0'" type="file" accept="image/*" @change="uplaodImage">
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
import { mapState } from 'vuex';

export default {

    components: {
        InputText,
        Textarea,
        vSelect,
        Toast
    },

    props:["slug"],
    data() {
        return {
            host: "https://cmsapi.smicee.com",
            edit_aow: {
                title: "",
                details: "",
                image: null
            },
            show_image:null
        }
    },

    methods: {
        submit() {
            console.log(this.edit_aow)
            this.$store.dispatch('areaOfWork/edit_AOW', {aow:this.edit_aow, slug:this.slug}).then(response => {
                console.log(response)    
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    setTimeout( ()=> this.$router.push('/area-of-work/view'),3000)
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
                this.edit_aow.image = e.target.result;
                this.show_image = e.target.result;
            };
        },
    },

    computed: {
        ...mapState({
            aow: (state) => state.areaOfWork.get_Detail,
        }),
    },
    mounted() {
        this.$store.dispatch("areaOfWork/get_AOW_By_Slug", this.slug);
        
    },
    watch:{
        aow(oldValue, newValue){
            this.edit_aow.title = this.aow.title
            this.edit_aow.details = this.aow.details
            this.edit_aow.image = this.aow.image
            this.show_image = this.host + this.aow.image
        }
    }

}
</script>

<style>
</style>