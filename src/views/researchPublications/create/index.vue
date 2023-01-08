<template>
    <div class="w-full">
        <Header />
        <CreateResearch />
        <Footer />
    </div>
</template>

<script>
import CreateResearch from '../../../components/ResearchPublications/Create.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        CreateResearch,
        Header,
        Footer
    }
}
</script>