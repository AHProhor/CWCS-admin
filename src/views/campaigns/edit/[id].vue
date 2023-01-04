<template>
    <div>
        <Header />
        <campaignEdit :slug="get_campaign_slug()"></campaignEdit>
        <Footer />
    </div>
</template>
<script>
import campaignEdit from '../../../components/Campaigns/Edit.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'
export default{
    components:{
        campaignEdit,
        Header,
        Footer
    },
    methods:{
        get_campaign_slug(){
            return this.$route.params.id 
        }
    }
}
</script>