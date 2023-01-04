<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div>
                <div class="bg-white p-5 rounded-lg">
                    <p class="text-left text-xl font-semibold pb-6">View Campaigns</p>
                    <DataTable ref="dt" :value="campaignsData" dataKey="id" :paginator="true" :rows="5" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,15]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">

                        <Column field="title" header="Title" :sortable="true" style="min-width:12rem"></Column>

                        <Column header="Satarting Date" :sortable="true" style="min-width:8rem">
                            <template #body="{data}">
                                <p>{{getDate(data.date)}}</p>
                            </template>
                        </Column>

                        <Column header="Ending Date" :sortable="true" style="min-width:8rem">
                            <template #body="{data}">
                                <p>{{getDate(data.date)}}</p>
                            </template>
                        </Column>

                        <Column header="Organized By" :sortable="true" style="min-width:12rem">
                            <template #body="{data}">
                                <p>{{ data.project }}</p>
                            </template>
                        </Column>

                        <Column header="Project" :sortable="true" style="min-width:12rem">
                            <template #body="{data}">
                                <p>{{ data.project }}</p>
                            </template>
                        </Column>

                        <Column :exportable="false" header="Image" :sortable="true" style="min-width:11rem">
                            <template #body="{data}">
                                <img class="rounded-md w-36 h-28" :src="host + data.image" alt="">
                            </template>
                        </Column>

                        <Column header="Action" :exportable="false" style="min-width:7rem">
                            <template #body="slotProps">
                                <div class="flex">
                                    <div class="">
                                        <router-link :to="{path:'/campaigns/edit/'+slotProps.data.slug}">
                                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"  />
                                        </router-link>
                                    </div>
                                    <div class="ml-2">
                                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteCampaign(slotProps.data)" />
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <Dialog v-model:visible="deleteCampaignDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                    <div class="confirmation-content">
                        <i class="pi pi-exclamation-triangle mr-3 text-red-700" style="font-size: 2rem" />
                        <span v-if="temp_campaign">Are you sure you want to delete <b>{{ temp_campaign.title }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteCampaignDialog = false"/>
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteCampaign(temp_campaign.slug)" />
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
            host: "https://cmsapi.smicee.com",
            campaignDialog: false,
            deleteCampaignDialog: false,
            submitted: false,
            temp_campaign: {},

            temp_campaign_edit: {
                id: null,
                title: "",
                date: "",
                details: "",
                image: null,
            },
            show_image: null
        }
    },

    computed: {
        ...mapState ({
            campaignsData: state => state.campaigns.campaigns,
        })
    },

    mounted() {
        this.$store.dispatch('campaigns/get_campaigns')
    },

    methods: {
        getDate(value){
            if (value) {
                return moment(String(value)).format('YYYY-MM-DD')
          }
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

        editCampaign (campaign) {
            this.temp_campaign_edit.slug = campaign.slug;
            this.temp_campaign_edit.title = campaign.title;
            this.temp_campaign_edit.date = campaign.date;
            this.temp_campaign_edit.details = campaign.details;
            this.show_image = this.host + campaign.image;
            this.campaignDialog = true;
            // this.submitted = true;
            
        },
        saveCampaign (campaign) {
            console.log('update payload -->', campaign)
            this.$store.dispatch("campaigns/edit_Campaigns", campaign).then(response => {
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
            this.campaignDialog = false;
            this.submitted = false;
        },
        confirmDeleteCampaign (campaign) {
            this.temp_campaign = campaign;
            this.deleteCampaignDialog = true;
        },
        deleteCampaign (campSlug) {
            this.$store.dispatch("campaigns/delete_Campaign", campSlug).then(response => {
                // console.log(response.data)
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail:response.data.response, closable: false, life: 3000})
                    this.deleteCampaignDialog = false;
                    this.temp_campaign = {};
                } else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: 'Something Wrong', closable: false, life: 3000})
                }
            })
        },
    }
}
</script>
