<template>
    <div class="w-full">
        <Header />
        <CreateCampaigns />
        <Footer />
    </div>
</template>

<script>
import CreateCampaigns from '../../../components/Campaigns/Create.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        CreateCampaigns,
        Header,
        Footer
    }
}
</script>
