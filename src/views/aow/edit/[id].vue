<template>
    <div>
        <Header />
        <AOWEdit :slug="get_aow_slug()"></AOWEdit>
        <Footer />
    </div>
</template>
<script>
import AOWEdit from '../../../components/AOW/Edit.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'
export default{
    components:{
        AOWEdit,
        Header,
        Footer
    },
    methods:{
        get_aow_slug(){
            return this.$route.params.id 
        }
    }
}
</script>