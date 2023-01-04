<template>
    <div class="w-full flex items-center bg-gray-100 px-6">
        <div class="w-full flex justify-between items-center px-6 py-3 mt-6 bg-primary rounded-lg">
            <div class="flex justify-center">
                <p class="text-white">{{ getDateTime() }}</p>
            </div>

            <div class="bg-white w-20 h-8 rounded-sm flex justify-center items-center cursor-pointer">
                <p @click="getLogout" class="text-sm font-semibold">Logout</p>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    methods: {
        getDateTime(){
            return moment().format('dddd, MMMM Do YYYY')
        },
        getLogout() {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('loggedIn')
            this.$router.push('/login')
        }
    }
}
</script>
