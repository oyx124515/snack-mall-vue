<template>
  <GoodsHeader></GoodsHeader>
  <a-layout>
    <a-layout-header>
      <div class="logo-index"></div>
      <a-menu v-model:selectedKeys="current" mode="horizontal">
        <a-menu-item @click="waitPayItem" key="wait-pay">
          待付款
        </a-menu-item>
        <a-menu-item @click="waitSend" key="wait-send">
          待发货
        </a-menu-item>
        <a-menu-item @click="waitReceive" key="wait-receive">
          待收货
        </a-menu-item>
        <a-menu-item @click="waitComment" key="wait-comment">
          待评价
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content>

      <div>
        <router-view></router-view>
      </div>

    </a-layout-content>


    <!--    内容区end    -->
    <a-layout-footer></a-layout-footer>
  </a-layout>
  <div>
  </div>
</template>
<script setup>
import {onMounted, ref} from 'vue'
import GoodsHeader from '@/GoodsComponents/GoodsHeader'
import {useRouter} from "vue-router";

const current = ref(['wait-pay']);
const router = useRouter();

function waitPayItem() {
  router.push({name: "waitPayItem"});
}

function waitSend() {
  router.push({name: "waitSend"});
}

function waitReceive() {
  router.push({name: "waitReceive"});
}

function waitComment() {
  router.push({name: "waitComment"});
}

onMounted(() => {
  waitPayItem();
})
</script>
<style scoped>
.top-nav-inside {
  width: 1226px;
}

.top-nav {
  height: 35px;
  width: 100%;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
}

.top-nav-inside span {
  display: inline-block;
  line-height: 35px;
  font-size: 12px;
  margin: 0 12px;
}

.top-nav-inside span:hover {
  cursor: pointer;
  color: #ff5000;
}


.logo-index {
  background: url("../../public/favicon.png") no-repeat center;
  background-size: 48px 48px;
  height: 64px;
  width: 64px;
  float: left;
}

.ant-layout-header {
  background: #ffffff;
}

.ant-layout-content {
  background: #ffffff;
}

.snack-items {
  margin: 20px auto 0;
  width: 1069px;
}
</style>