<template>
    <div class="w-full">
        <Header />
        <ViewGallery />
        <Footer />
    </div>
</template>

<script>
import ViewGallery from '../../../components/Gallery/View.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        ViewGallery,
        Header,
        Footer
    }
}
</script>
