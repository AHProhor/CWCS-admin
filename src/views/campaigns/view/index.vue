<template>
    <div class="w-full">
        <Header />
        <ViewCampaigns />
        <Footer />
    </div>
</template>

<script>
import ViewCampaigns from '../../../components/Campaigns/View.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        ViewCampaigns,
        Header,
        Footer
    }
}
</script>
