<template>
    <div class="w-full">
        <Header />
        <CreateSlider />
        <Footer />
    </div>
</template>

<script>
import CreateSlider from '../../../components/Slider/Create.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        CreateSlider,
        Header,
        Footer
    }
}
</script>
