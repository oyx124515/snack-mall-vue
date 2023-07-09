<template>
  <div class="top-nav">
    <div class="top-nav-inside">
      <span>用户12345</span>
      <span>首页</span>
      <span>购物车</span>
      <span>收藏夹</span>
    </div>
  </div>
  <a-layout>
    <a-layout-header>
      <div class="logo-index"></div>
      <a-menu v-model:selectedKeys="current" mode="horizontal">
        <a-menu-item key="wait-receive">
          待收货
        </a-menu-item>
        <a-menu-item key="wait-send">
          待发货
        </a-menu-item>
        <a-menu-item key="wait-pay">
          待付款
        </a-menu-item>
        <a-menu-item key="wait-comment">
          待评价
        </a-menu-item>

        <a-menu-item key="alipay">
          <a href="" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
          </a>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content>

      <div>
        <div class="snack-items">
          <operation-item></operation-item>
        </div>
        <div class="snack-items">
          <operation-item></operation-item>
        </div>
        <div class="snack-items">
          <operation-item></operation-item>
        </div>
      </div>

    </a-layout-content>


    <!--    内容区end    -->
    <a-layout-footer></a-layout-footer>
  </a-layout>
  <div>
    {{ current }}
  </div>
</template>
<script setup>
import {ref} from 'vue'
import OperationItem from '@/UserOrderOperation/UserOperationItem/OperationItem'

const current = ref(['mail']);

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