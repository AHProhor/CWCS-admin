import { createApp } from 'vue'
import App from './App.vue'

import './index.css'

import router from './router/index'
import store from './store/index'

import PrimeVue from 'primevue/config';                 //PrimeVue
import 'primevue/resources/themes/saga-blue/theme.css'  //theme
import 'primevue/resources/primevue.min.css'            //core css
import 'primeicons/primeicons.css'                      //icons
import ToastService from 'primevue/toastservice';
import ckeditor from "@ckeditor/ckeditor5-vue";

createApp(App).use(router).use(store).use(PrimeVue).use(ToastService).use(ckeditor).mount('#app')
