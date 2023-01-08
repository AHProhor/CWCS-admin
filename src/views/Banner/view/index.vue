<template>
    <div class="w-full">
        <Header />
        <ViewBanner />
        <Footer />
    </div>
</template>

<script>
import ViewBanner from '../../../components/Banner/View.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        ViewBanner,
        Header,
        Footer
    }
}
</script>