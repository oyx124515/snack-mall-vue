import {createApp} from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/dist/antd.variable.min.css'
import {router} from './router/index'

import {ConfigProvider} from 'ant-design-vue';

import Store from "@/vuex/store.js"
// 设置主题颜色
ConfigProvider.config({
    theme: {
        primaryColor: '#FF4400',
    },
});

createApp(App).use(router).use(Antd).use(Store).mount('#app');