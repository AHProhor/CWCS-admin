<template>
    <div class="w-full">
        <Header />
        <Dashboard />
        <Footer />
    </div>
</template>

<script>
import Dashboard from '../../components/Dashboard/Dashboard.vue'
import Header from '../../components/Header/Header.vue'
import Footer from '../../components/Footer/Footer.vue'

export default {
    components: {
        Dashboard,
        Header,
        Footer
    }
}
</script>
