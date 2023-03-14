<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white text-left p-6 rounded-lg shadow-md 2xl:px-52">
                <div class="pb-6">
                    <p class="text-xl font font-semibold pb-1">Create Area Of Work</p>
                </div>

                <div>
                    <div class="pb-4 flex">
                        <div class="pr-2 w-full">
                            <p class="pb-1 text-gray-500">Title</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="aow.title" />
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Details</p>
                        <Textarea class="w-full" v-model="aow.details" :autoResize="true" rows="4" cols="30" />
                    </div>

                    <div class="pb-4 flex">
                        <div class="pr-2 w-1/2">
                            <p class="pb-1 text-gray-500">Priority</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="aow.priority" />
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Image</p>
                        <div class="flex items-center">
                            <img v-if="aow.image" class="h-28" :src="aow.image">
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

export default {
    components: {
        InputText,
        Textarea,
        vSelect,
        Toast
    },

    data() {
        return {
            host: "https://cwcsapi.smicee.com",
            aow: {
                title: "",
                details: "",
                priority:null,
                image: null
            }
        }
    },

    methods: {
        submit() {
            console.log(this.aow)
            this.$store.dispatch('areaOfWork/create_aow', this.aow).then(response => {
                console.log(response)    
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    this.aow.title= ""
                    this.aow.details = ""
                    this.aow.priority = null
                    this.aow.image = null
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
                this.aow.image = e.target.result;
            };
        },
    }
}
</script>
