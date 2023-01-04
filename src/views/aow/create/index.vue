<template>
    <div class="w-full">
        <Header />
        <CreateAOW />
        <Footer />
    </div>
</template>

<script>
import CreateAOW from '../../../components/AOW/Create.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        CreateAOW,
        Header,
        Footer
    }
}
</script>
