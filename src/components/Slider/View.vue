<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div>
                <div class="bg-white p-5 rounded-lg">
                    <p class="text-left text-xl font-semibold pb-6">View Slider</p>
                    <DataTable ref="dt" :value="sliderData" dataKey="id" :paginator="true" :rows="5" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,15]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">

                        <Column field="title" header="Title" :sortable="true" style="max-width:20rem"></Column>

                        <Column :exportable="false" header="Image" :sortable="true" style="max-width:40rem">
                            <template #body="{data}">
                                <img class="rounded-md w-36 h-28" :src="host + data.image" alt="">
                            </template>
                        </Column>

                        <Column field="priority" header="Priority" :sortable="true" style="max-width:10rem"/>

                        <Column header="Action" :exportable="false" style="max-width:8rem">
                            <template #body="slotProps">
                                <div class="flex">
                                    <div class="ml-2">
                                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteSlider(slotProps.data)" />
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <Dialog v-model:visible="deleteSliderDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                    <div class="confirmation-content">
                        <i class="pi pi-exclamation-triangle mr-3 text-red-700" style="font-size: 2rem" />
                        <span v-if="temp_slider">Are you sure you want to delete <b>{{ temp_slider.title }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteSliderDialog = false"/>
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSlider(temp_slider.id)" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';
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
        Toast
    },

    data() {
        return {
            host: "https://cwcsapi.smicee.com",
            temp_slider:{},
            deleteSliderDialog:false
        }
    },

    computed: {
        ...mapState ({
            sliderData: state => state.slider.sliderData
        })
    },

    mounted() {
        this.$store.dispatch('slider/get_slider')
    },

    methods: {
        confirmDeleteSlider (slider) {
            this.temp_slider = slider;
            this.deleteSliderDialog = true;
        },
        deleteSlider (id) {
            // console.log(slug)
            this.$store.dispatch("slider/delete_slider", id).then(response => {
                // console.log(response.data)
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail:response.data.response, closable: false, life: 3000})
                    this.deleteSliderDialog = false;
                    this.temp_slider = {};
                } else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: 'Something Wrong', closable: false, life: 3000})
                }
            })
        },
    }
}
</script>
