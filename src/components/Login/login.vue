<template>
    <div class="h-screen bg-background flex items-center">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="w-full flex justify-center">
            <div class="container flex justify-center">

                <div class="bg-white text-left p-6 xl:p-10 text-sm flex flex-col justify-center rounded-lg shadow-md">
                    <div class="w-full flex justify-center">
                        <img class="h-28 w-20" src="../../assets/logo.png" alt="logo">
                    </div>
                    <div class="py-6">
                        <p class="text-xl font-semibold">Welcome to CWCS Admin</p>
                        <p class="text-sm text-gray-500">Sign in your account</p>
                    </div>

                    <Form class="w-full flex flex-col items-center" @submit="login" :validation-schema="schema">

                        <div class="pb-4 w-full">
                            <p class="pb-1 text-gray-600">Username</p>
                            <Field 
                                class="w-full outline-none text-gray-700 border border-gray-300 rounded p-2 w-72 sm:w-96" 
                                type="text" 
                                placeholder="Enter phone number" 
                                v-model="user.username"
                                name="Username"
                            />
                            <ErrorMessage class="text-red-500 text-left text-sm mt-1 ml-1" name="Username" />
                        </div> 

                        <div class="pb-4 w-full">
                            <p class="pb-1 text-gray-600">Password</p>
                            <div class="relative w-full">
                                <div class="absolute inset-y-0 right-0 pr-6 flex items-center">
                                    <i class="absolute text-slate-400 flex justify-center cursor-pointer" :class="passwordToggleIcon" @click="togglePasswordVisibility" />
                                </div>
                                <Field 
                                    class="w-full outline-none text-gray-700 border border-gray-300 rounded p-2 w-72 sm:w-96" 
                                    :type="passwordFieldType"
                                    placeholder="Enter password" 
                                    v-model="user.password"
                                    name="Password"
                                />
                            </div>
                            <ErrorMessage class="text-red-500 text-left text-sm mt-1 ml-1" name="Password" />
                        </div>

                       <button class="bg-primary text-white rounded-md w-full py-2">LOGIN</button>
                   </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import Toast from 'primevue/toast';

export default {
    data(){
        return {
            passwordFieldType: 'password',
            user: {
                username: "",
                password: "",
            }
        }
    },

    components: {
        Field, 
        Form, 
        ErrorMessage,
        Toast
    },

    computed: {
        schema() {
            return Yup.object({
                'Username': Yup.string().required("Username is required"),
                'Password': Yup.string().required("Password is required")
            });
        },

        passwordToggleIcon() {
            return this.passwordFieldType === 'password' ? 'pi pi-eye' : 'pi pi-eye-slash'
        },
    },

    methods: {
        togglePasswordVisibility() {
            this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
        },

        login() {
            console.log('payload -->', this.user)
            this.$store.dispatch('login/get_Login', this.user)
            .then(response => {
                console.log('response -->', response)    
                if(response == undefined) { 
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: 'Something Wrong. Please try again.', closable: false, life: 3000})
                } else {
                    this.$router.push('/')
                }
            })
        }
    }
}
</script>


