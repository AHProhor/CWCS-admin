<template>
    <div class="w-full">
        <Header />
        <CreateProjects />
        <Footer />
    </div>
</template>

<script>
import CreateProjects from '../../../components/Projects/Create.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        CreateProjects,
        Header,
        Footer
    }
}
</script>
