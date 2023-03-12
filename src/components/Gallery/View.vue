<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white p-5 rounded-lg">
                    <p class="text-left text-xl font-semibold pb-6">View Gallery</p>
                    <DataTable ref="dt" :value="galleryData" dataKey="id" :paginator="true" :rows="5" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,15]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">

                        <Column field="serial" header="#" style="width: 10%">
                            <template #body="{data}">
                                {{ galleryData.indexOf(data) + 1 }}
                            </template>
                        </Column>

                        <Column header="Project" :sortable="true" style="min-width:8rem">
                            <template #body="{data}">
                                <p>{{ data.project.title }}</p>
                            </template>
                        </Column>

                        <Column :exportable="false" header="Image" :sortable="true" style="min-width:25rem">
                            <template #body="{data}">
                                <img class="rounded-md w-36 h-28" :src="host + data.image" alt="">
                            </template>
                        </Column>

                        <Column header="Action" :exportable="false" style="min-width:8rem">
                            <template #body="slotProps">
                                <div class="flex">
                                    <div class="">
                                        <router-link :to="{path:'/editGallery/edit/'+slotProps.data.id}">
                                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"/>
                                        </router-link>
                                    </div>
                                    <div class="ml-2">
                                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteGallery(slotProps.data)" />
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <Dialog v-model:visible="deleteGallery" :style="{width: '450px'}" header="Confirm" :modal="true">
                    <div class="confirmation-content">
                        <i class="pi pi-exclamation-triangle mr-3 text-red-700" style="font-size: 2rem" />
                        <span v-if="temp_gallery">Are you sure you want to delete <b>{{ temp_gallery.title }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteGallery = false"/>
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="delete_Gallery(temp_gallery.id)" />
                    </template>
                </Dialog>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Toast from "primevue/toast";

export default {
    components: {
        DataTable,
        Column,
        Dialog,
        Button,
        InputText,
        Textarea,
        Toast
    },

    data() {
        return {
            host: "https://cwcsapi.smicee.com",
            galleryDialog: false,
            deleteGallery: false,
            submitted: false,
            temp_gallery: {},

            temp_gallery_edit: {
                id: null,
                title: "",
                details: "",
                image: null,
            },
            show_image: null,
        }
    },

    computed: {
        ...mapState ({
            galleryData: state => state.gallery.gallery
        })
    },

    mounted() {
        this.$store.dispatch('gallery/get_gallery')
    },

    methods: {
        image(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.temp_gallery_edit.image = e.target.result;
                this.show_image = e.target.result;
            };
        },

        editGallery (gallery) {
            this.temp_gallery_edit.slug = gallery.slug;
            this.temp_gallery_edit.title = gallery.title;
            this.temp_gallery_edit.details = gallery.details;
            this.show_image = this.host + gallery.image;
            this.galleryDialog = true;
            // this.submitted = true;
        },
        saveGallery (gallery) {
            console.log('update payload -->', gallery)
            this.$store.dispatch("gallery/edit_Gallery", gallery).then(response => {
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
            this.galleryDialog = false;
            this.submitted = false;
        },
        confirmDeleteGallery (gallery) {
            this.temp_gallery = gallery;
            this.deleteGallery = true;
        },
        delete_Gallery (id) {
            console.log(id)
            this.$store.dispatch("gallery/deleteGallery", id).then(response => {
                console.log(response.data)
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail:response.data.response, closable: false, life: 3000})
                    this.deleteGallery = false;
                    this.temp_gallery = {};
                } else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: 'Something Wrong', closable: false, life: 3000})
                }
            })
        },
    }
}
</script>
