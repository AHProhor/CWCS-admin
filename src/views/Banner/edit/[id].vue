<template>
    <div>
        <Header />
        <campaignEdit :slug="get_bannner_slug()"></campaignEdit>
        <Footer />
    </div>
</template>

<script>
import campaignEdit from '../../../components/Banner/Edit.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'
export default{
    components:{
        campaignEdit,
        Header,
        Footer
    },
    methods:{
        get_bannner_slug(){
            return this.$route.params.id 
        }
    }
}
</script>