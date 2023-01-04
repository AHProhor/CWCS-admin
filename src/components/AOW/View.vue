<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div>
                <div class="bg-white p-5 rounded-lg">
                    <p class="text-left text-xl font-semibold pb-6">View Area Of Work</p>
                    <DataTable ref="dt" :value="areaOfWorkData" dataKey="id" :paginator="true" :rows="5" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,15]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">

                        <Column field="title" header="Title" :sortable="true" style="max-width:20rem"></Column>

                        <Column header="Details" :sortable="true" style="max-width:35rem">
                            <template #body="{data}">
                                <p v-if="data.details.length < 350" class="text-justify pr-8">{{data.details}}</p>
                                <p v-else class="text-justify pr-8">{{ data.details.substring(0, 350) + "..." }}</p>
                            </template>
                        </Column>

                        <Column :exportable="false" header="Image" :sortable="true" style="max-width:22rem">
                            <template #body="{data}">
                                <img class="rounded-md w-36 h-28" :src="host + data.image" alt="">
                            </template>
                        </Column>

                        <Column header="Action" :exportable="false" style="max-width:8rem">
                            <template #body="slotProps">
                                <div class="flex">
                                    <div class="">
                                        <router-link :to="{path:'/area-of-work/edit/'+slotProps.data.slug}">
                                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editAOW(slotProps.data)" />
                                        </router-link>
                                    </div>
                                    <div class="ml-2">
                                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteAOW(slotProps.data)" />
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <Dialog v-model:visible="deleteAOWDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                    <div class="confirmation-content">
                        <i class="pi pi-exclamation-triangle mr-3 text-red-700" style="font-size: 2rem" />
                        <span v-if="temp_AOW">Are you sure you want to delete <b>{{ temp_AOW.title }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteAOWDialog = false"/>
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteAOW(temp_AOW.slug)" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import Toast from "primevue/toast";

export default {
    components: {
        DataTable,
        Column,
        Button,
        InputText,
        Textarea,
        Dialog,
        vSelect,
        Toast
    },

    data() {
        return {
            host: "https://cmsapi.smicee.com",
            AOW: {},
            AOWDialog: false,
            deleteAOWDialog: false,
            submitted: false,
            temp_AOW: {},

            temp_AOW_edit: {
                id: null,
                title: "",
                details: "",
                image: null,
            },
            show_image: null
        }
    },

    computed: {
        ...mapState ({
            areaOfWorkData: state => state.areaOfWork.areaOfWork
        })
    },

    mounted() {
        this.$store.dispatch('areaOfWork/get_AOW')
    },

    methods: {
        image(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.temp_AOW_edit.image = e.target.result;  
                this.show_image = e.target.result; 
            };
        },

        editAOW (AOW) {
            // this.temp_AOW_edit.slug = AOW.slug;
            // this.temp_AOW_edit.title = AOW.title;
            // this.temp_AOW_edit.details = AOW.details;
            // this.show_image = this.host + AOW.image;
            // this.AOWDialog = true;
            // this.submitted = true;
            // this.$router.push({name:'AOWEdit', params:AOW.slug})
        },
        saveAOW (AOW) {
            console.log('update payload -->', AOW)
            this.$store.dispatch("areaOfWork/edit_AOW", AOW).then(response => {
                console.log(response.data.response)    
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    this.hideDialog();
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
        },
        hideDialog() {
            this.AOWDialog = false;
            this.submitted = false;
        },
        confirmDeleteAOW (AOW) {
            this.temp_AOW = AOW;
            this.deleteAOWDialog = true;
        },
        deleteAOW (slug) {
            this.$store.dispatch("areaOfWork/delete_AOW", slug).then(response => {
                // console.log(response.data)
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail:response.data.response, closable: false, life: 3000})
                    this.deleteAOWDialog = false;
                    this.temp_AOW = {};
                } else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: 'Something Wrong', closable: false, life: 3000})
                }
            })
        },
    }
}
</script>
