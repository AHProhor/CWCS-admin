<template>
    <div class="w-full">
        <Header />
        <ViewSlider />
        <Footer />
    </div>
</template>

<script>
import ViewSlider from '../../../components/Slider/View.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        ViewSlider,
        Header,
        Footer
    }
}
</script>
