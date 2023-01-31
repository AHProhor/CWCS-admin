<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div>
                <div class="bg-white p-5 rounded-lg">
                    <p class="text-left text-xl font font-semibold pb-6">View Home</p>
                    <DataTable ref="dt" :value="homeData" dataKey="id" :paginator="true" :rows="5" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,15]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">

                        <Column field="title" header="Title" :sortable="true" style="min-width:15rem"></Column>

                        <Column :exportable="false" header="Top Banner" :sortable="true" style="min-width:10rem">
                            <template #body="{data}">
                                <img class="rounded-md w-52 h-28" :src="host + data.top_banner_image" alt="">
                            </template>
                        </Column>

                        <Column :exportable="false" header="Mid Banner" :sortable="true" style="min-width:10rem">
                            <template #body="{data}">
                                <img class="rounded-md w-52 h-28" :src="host + data.mid_banner_image" alt="">
                            </template>
                        </Column>

                        <Column :exportable="false" header="Bottom Banner" :sortable="true" style="min-width:10rem">
                            <template #body="{data}">
                                <img class="rounded-md w-52 h-28" :src="host + data.mid_layer_image" alt="">
                            </template>
                        </Column>

                        <Column :exportable="false" header="Footer Banner" :sortable="true" style="min-width:10rem">
                            <template #body="{data}">
                                <img class="rounded-md w-52 h-28" :src="host + data.footer_image" alt="">
                            </template>
                        </Column>

                        <Column :exportable="false" header="Status" style="max-width:15rem">
                            <template #body="{data}">
                                <div @click="toggleStatus(data.id)">
                                    <i v-if="data.active == true" class="pi pi-check p-2 bg-button rounded text-white cursor-pointer"></i>
                                    <i v-else class="pi pi-times p-2 bg-red-500 rounded text-white cursor-pointer"></i>
                                </div>
                            </template>
                        </Column>

                        <Column header="Action" :exportable="false" style="min-width:8rem">
                            <template #body="slotProps">
                                <div class="flex">
                                    <div class="">
                                        <router-link :to="{path:'/home/edit/'+slotProps.data.id}">
                                            <Button icon="pi pi-pencil" class="p-button-rounded mr-2" id="background-button" />
                                        </router-link>
                                    </div>
                                    <div class="ml-2">
                                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteBanner(slotProps.data)" />
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <Dialog v-model:visible="deleteBannerDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                    <div class="confirmation-content">
                        <i class="pi pi-exclamation-triangle mr-3 text-red-700" style="font-size: 2rem" />
                        <span v-if="temp_banner">Are you sure you want to delete <b>{{ temp_banner.title }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteBannerDialog = false"/>
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteBanner(temp_banner.slug)" />
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
import moment from 'moment'
import { RouterLink } from "vue-router";

export default {
    components: {
    DataTable,
    Column,
    Button,
    InputText,
    Textarea,
    Dialog,
    vSelect,
    Toast,
    RouterLink
},

    data() {
        return {
            host: "https://cwcsapi.smicee.com",
            campaignDialog: false,
            deleteBannerDialog: false,
            submitted: false,
            temp_banner: {}
        }
    },

    computed: {
        ...mapState ({
            homeData: state => state.home.home
        })
    },

    mounted() {
        this.$store.dispatch('home/get_home')
    },

    methods: {
        toggleStatus(id){
            this.$store.dispatch('home/toggleActiveStatus', id).then(response => {   
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
        },

        image(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.temp_campaign_edit.image = e.target.result;
                this.show_image = e.target.result;
            };
        },

        confirmDeleteBanner (banner) {
            this.temp_banner = banner;
            this.deleteBannerDialog = true;
        },

        deleteBanner (bannnerSlug) {
            this.$store.dispatch("home/delete_home", bannnerSlug).then(response => {
                // console.log(response.data)
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail:response.data.response, closable: false, life: 3000})
                    this.deleteBannerDialog = false;
                    this.temp_banner = {};
                } else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: 'Something Wrong', closable: false, life: 3000})
                }
            })
        },
    }
}
</script>