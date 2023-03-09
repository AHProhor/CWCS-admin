<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white p-5 rounded-lg">
                <p class="text-left text-xl font-semibold pb-6">View Projects</p>
                <DataTable ref="dt" :value="projectsData" dataKey="id" :paginator="true" :rows="5" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,15]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">

                    <Column field="title" header="Title" :sortable="true" style="min-width:10rem"></Column>

                    <Column header="Details" :sortable="true" style="max-width:30rem">
                        <template #body="{data}">
                            <p v-if="data.details.length < 180" class="text-left pr-8" v-html="data.details"></p>
                            <p v-else class="text-left pr-8" v-html="data.details.substring(0, 180)"></p>
                        </template>
                    </Column>

                    <Column header="Area Of Work" :sortable="true" style="min-width:10rem">
                        <template #body="{data}">
                            <div v-if="data.areaofwork[0]">
                                <p>{{ data.areaofwork[0].title }}</p>
                            </div>
                        </template>
                    </Column>

                    <Column :exportable="false" header="Ongoing" style="max-width:10rem">
                        <template #body="{data}">
                            <div class="">
                                <i v-if="data.featured == true" class="pi pi-check p-2 bg-blue-500 rounded text-white"></i>
                                <i v-else class="pi pi-times p-2 bg-red-500 rounded text-white"></i>
                            </div>
                        </template>
                    </Column>

                    <Column :exportable="false" header="Banner Image" :sortable="true" style="min-width:10rem">
                        <template #body="slotProps">
                            <img class="rounded-md w-36 h-28" :src="host + slotProps.data.image" alt="">
                        </template>
                    </Column>

                    <Column field="priority" header="Priority" :sortable="true" style="min-width:10rem"></Column>

                    <Column header="Actionss" :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <div class="flex">
                                <div class="">
                                    <router-link :to="{path:'/projects/edit/'+slotProps.data.slug}">
                                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editAOW(slotProps.data)" />
                                        </router-link>
                                </div>
                                <div class="ml-2">
                                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteProject(slotProps.data)" />
                                </div>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>

            <Dialog v-model:visible="deleteProjectDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3 text-red-700" style="font-size: 2rem" />
                    <span v-if="temp_project">Are you sure you want to delete <b>{{ temp_project.title }}</b>?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProjectDialog = false"/>
                    <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProject(temp_project.slug)" />
                </template>
            </Dialog>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';
import ToggleButton from 'primevue/togglebutton';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import Toast from "primevue/toast";

export default {
    components: {
        DataTable,
        Column,
        Button,
        Textarea,
        Dialog,
        ToggleButton,
        vSelect,
        Toast
    },

    data() {
        return {
            host: "https://cwcsapi.smicee.com",
            projectDialog: false,
            deleteProjectDialog: false,
            submitted: false,
            temp_project: {},

            temp_project_edit: {
                id: null,
                title: "",
                details: null,
                featured: 0,
                areaOfWork:'',
                image: null,
            },
            show_image: null,
        }
    },

    computed: {
        ...mapState ({
            projectsData: state => state.projects.projects
        })
    },

    mounted() {
        this.$store.dispatch('projects/get_projects')
    },

    methods: {
        image(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.temp_project_edit.image = e.target.result;
                this.show_image = e.target.result;
            };
        },
        
        editProject (project) {
            this.temp_project_edit.slug = project.slug;
            this.temp_project_edit.title = project.title;
            this.temp_project_edit.details = project.details;
            this.temp_project_edit.featured = project.featured;
            this.show_image = this.host + project.image;
            this.projectDialog = true;
            console.log(project)
            // this.submitted = true;
        },

        saveProject (project) {
            console.log('update payload -->', project)
            this.$store.dispatch("projects/edit_Projects", project).then(response => {
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
            this.projectDialog = false;
            this.submitted = false;
        },

        confirmDeleteProject (project) {
            this.temp_project = project;
            console.log(this.temp_project)
            this.deleteProjectDialog = true;
        },

        deleteProject (projectSlug) { 
            // console.log('project slug -->', projectSlug)
            this.$store.dispatch("projects/delete_projects", projectSlug).then(response => {
                // console.log(response.data)
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail:response.data.response, closable: false, life: 3000})
                    this.deleteProjectDialog = false;
                    this.temp_project = {};
                } else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: 'Something Wrong', closable: false, life: 3000})
                }
            })
        },
    }
}
</script>
