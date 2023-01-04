<template>
    <div class="w-full">
        <Header />
        <ViewAOW />
        <Footer />
    </div>
</template>

<script>
import ViewAOW from '../../../components/AOW/View.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        ViewAOW,
        Header,
        Footer
    }
}
</script>
