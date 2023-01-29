<template>
    <div class="w-full">
        <Header />
        <ViewResearch />
        <Footer />
    </div>
</template>

<script>
import ViewResearch from '../../../components/ResearchPublications/View.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        ViewResearch,
        Header,
        Footer
    }
}
</script>