<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white p-5 rounded-lg">
                <p class="text-left text-xl font-semibold pb-6">View Message</p>
                <DataTable ref="dt" :value="contactData" dataKey="id" :paginator="true" :rows="10" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,15]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">

                    <Column field="email" header="Email" :sortable="true" style="min-width:10rem"></Column>

                    <Column field="name" header="Name" :sortable="true" style="min-width:10rem"></Column>

                    <Column field="sub" header="Subject" :sortable="true" style="min-width:20rem"></Column>

                    <Column field="message" header="Message" :sortable="true" style="min-width:32rem"></Column>

                    <Column header="Action" :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <div class="ml-2">
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteContact(slotProps.data)" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>

            <Dialog v-model:visible="deleteContact" :style="{width: '450px'}" header="Confirm" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3 text-red-700" style="font-size: 2rem" />
                    <span v-if="temp_contact">Are you sure you want to delete <b>{{ temp_contact.name }}</b>'s message?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteContact = false"/>
                    <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteContactMessage(temp_contact.id)" />
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
            reviewDialog: false,
            deleteContact: false,
            submitted: false,
            temp_contact: {},

            temp_review_edit: {
                id: null,
                title: "",
                reviewer_name: "",
                review: "",
            },
        }
    },

    computed: {
        ...mapState ({
            contactData: state => state.contact.contact
        })
    },

    mounted() {
        this.$store.dispatch('contact/get_contact')
    },

    methods: {
        hideDialog() {
            this.reviewDialog = false;
            this.submitted = false;
        },
        confirmDeleteContact(contact) {
            this.temp_contact = contact;
            this.deleteContact = true;
        },
        deleteContactMessage(id) {
            this.$store.dispatch("contact/delete_contact", id).then(response => {
                // console.log(response.data)
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail:response.data.response, closable: false, life: 3000})
                    this.deleteContact = false;
                    this.temp_contact = {};
                } else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: 'Something Wrong', closable: false, life: 3000})
                }
            })
        },
    }
}
</script>
