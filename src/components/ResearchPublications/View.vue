<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div>
                <div class="bg-white p-5 rounded-lg">
                    <p class="text-left text-xl font-semibold pb-6">View Research & Publications</p>
                    <DataTable ref="dt" :value="researchData" dataKey="id" :paginator="true" :rows="5" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,15]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">

                        <Column field="title" header="Title" :sortable="true" style="min-width:12rem">
                            <template #body="{data}">
                                <p>{{ data.paper_title }}</p>
                            </template>
                        </Column>

                        <Column header="Author" :sortable="true" style="max-width:20rem">
                            <template #body="{data}">
                                <p class="text-justify pr-8">{{ data.author_name}}</p>
                            </template>
                        </Column>

                        <Column header="PDF file" :sortable="true" style="min-width:12rem">
                            <template #body="{data}">
                                <p>{{host + data.pdf }}</p>
                            </template>
                        </Column>

                        <Column :exportable="false" header="Book Image" :sortable="true" style="min-width:11rem">
                            <template #body="{data}">
                                <img class="rounded-md w-36 h-28" :src="host + data.book_banner_image" alt="">
                            </template>
                        </Column>

                        <Column header="Action" :exportable="false" style="min-width:7rem">
                            <template #body="slotProps">
                                <div class="flex">
                                    <div class="">
                                        <router-link :to="{path:'/research/edit/'+slotProps.data.id}">
                                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"  />
                                        </router-link>
                                    </div>
                                    <div class="ml-2">
                                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteResearch(slotProps.data)" />
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <Dialog v-model:visible="deleteResearchDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                    <div class="confirmation-content">
                        <i class="pi pi-exclamation-triangle mr-3 text-red-700" style="font-size: 2rem" />
                        <span v-if="temp_research">Are you sure you want to delete <b>{{ temp_research.title }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteResearchDialog = false"/>
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteResearch(temp_research.id)"/>
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
            deleteResearchDialog: false,
            temp_research: {},
        }
    },

    computed: {
        ...mapState ({
            researchData: state => state.research.research,
        })
    },

    mounted() {
        this.$store.dispatch('research/get_research')
    },

    methods: {
        confirmDeleteResearch (research) {
            this.temp_research = research;
            this.deleteResearchDialog = true;
        },

        deleteResearch (campId) {
            this.$store.dispatch("research/delete_research", campId).then(response => {
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail:response.data.response, closable: false, life: 3000})
                    this.deleteResearchDialog = false;
                    this.temp_research = {};
                } else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: 'Something Wrong', closable: false, life: 3000})
                }
            })
        },
    }
}
</script>