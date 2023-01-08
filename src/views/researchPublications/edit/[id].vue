<template>
    <div>
        <Header />
        <EditResearch :slug="get_research_by_slug()"></EditResearch>
        <Footer />
    </div>
</template>
<script>
import EditResearch from '../../../components/ResearchPublications/Edit.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'
export default{
    components:{
        EditResearch,
        Header,
        Footer
    },
    methods:{
        get_research_by_slug(){
            return this.$route.params.id 
        }
    }
}
</script>