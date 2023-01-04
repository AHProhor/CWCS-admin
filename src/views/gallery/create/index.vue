<template>
    <div class="w-full">
        <Header />
        <CreateGallery />
        <Footer />
    </div>
</template>

<script>
import CreateGallery from '../../../components/Gallery/Create.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        CreateGallery,
        Header,
        Footer
    }
}
</script>
