<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white text-left p-6 rounded-lg shadow-md 2xl:px-52">
                <div class="pb-6">
                    <p class="text-xl font font-semibold pb-1">Create Slider</p>
                </div>

                <div>
                    <div class="pb-4 flex">
                        <div class="pr-2 w-full">
                            <p class="pb-1 text-gray-500">Title</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="slider.title" />
                        </div>
                    </div>

                    <div class="pb-4 flex">
                        <div class="pr-2 w-1/2">
                            <p class="pb-1 text-gray-500">Priority</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="slider.priority" />
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Image</p>
                        <div class="flex items-center">
                            <img v-if="slider.image" class="h-28" :src="slider.image">
                            <input :class="slider.image ? 'ml-4' : 'ml-0'" type="file" accept="image/*" @change="uplaodImage">
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
// import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import Toast from 'primevue/toast';

export default {
    components: {
        InputText,
        Textarea,
        // vSelect,
        Toast
    },

    data() {
        return {
            host: "https://cwcsapi.smicee.com",
            slider: {
                title: "",
                priority: null,
                description: "",
                image: null
            }
        }
    },

    methods: {
        submit() {
            this.$store.dispatch('slider/create_slider', this.slider).then(response => {   
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    this.slider.title= ""
                    this.slider.priority= null
                    this.slider.description = ""
                    this.slider.image = null
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
                this.slider.image = e.target.result;
            };
        },
    }
}
</script>
