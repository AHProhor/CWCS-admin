<template>
    <div>
        <Header />
        <galleryEdit :slug="get_gallery_by_slug()"></galleryEdit>
        <Footer />
    </div>
</template>
<script>
import galleryEdit from '../../../components/Gallery/Edit.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'
export default{
    components:{
        galleryEdit,
        Header,
        Footer
    },
    methods:{
        get_gallery_by_slug(){
            return this.$route.params.id 
        }
    }
}
</script>