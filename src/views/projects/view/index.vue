<template>
    <div class="w-full">
        <Header />
        <ViewProjects />
        <Footer />
    </div>
</template>

<script>
import ViewProjects from '../../../components/Projects/View.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        ViewProjects,
        Header,
        Footer
    }
}
</script>
