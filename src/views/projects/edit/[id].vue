<template>
    <div>
        <Header />
        <porjectEdit :slug="get_project()"></porjectEdit>
        <Footer />
    </div>
</template>
<script>
import porjectEdit from '../../../components/Projects/Edit.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'
export default{
    components:{
        porjectEdit,
        Header,
        Footer
    },
    methods:{
        get_project(){
            return this.$route.params.id
        }
    }
}
</script>