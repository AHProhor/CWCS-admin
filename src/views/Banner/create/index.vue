<template>
    <div class="w-full">
        <Header />
        <CreateBanner />
        <Footer />
    </div>
</template>

<script>
import CreateBanner from '../../../components/Banner/Create.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        CreateBanner,
        Header,
        Footer
    }
}
</script>