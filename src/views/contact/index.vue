<template>
    <div class="w-full">
        <Header />
        <ViewContact />
        <Footer />
    </div>
</template>

<script>
import ViewContact from '../../components/Contact/View.vue'
import Header from '../../components/Header/Header.vue'
import Footer from '../../components/Footer/Footer.vue'

export default {
    components: {
        ViewContact,
        Header,
        Footer
    }
}
</script>
