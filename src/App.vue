<template>
    <div class="flex">
        <div :class="!$route.meta.hideSidebar ? 'w-1/6' : 'w-0'">
            <Sidebar v-if="!$route.meta.hideSidebar" />
        </div>
        <div :class="!$route.meta.hideSidebar ? 'w-5/6' : 'w-full'">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Sidebar from './components/Header/Sidebar.vue'

export default {
    components: {
        Sidebar
    }
}

</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    font-family: 'DM Sans', sans-serif;
}

.submit-button {
    @apply bg-primary rounded py-2 px-6 text-white
}
.dropdown-height {
    height: 34px;
}

.screen-height {
    min-height: calc(100vh - 136px);
}

.ck-editor__editable {
    min-height: 200px;
}

@media screen and (min-width: 1536px) {
    .container {
        max-width: 1320px !important;
    }
}
</style>
