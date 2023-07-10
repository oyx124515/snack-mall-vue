<template>
  <!--  提交订单界面-->
  <div class="order-index-bg">
    <goods-header></goods-header>
    <div style="margin-top: 20px">
      <order-address></order-address>
    </div>
  </div>
</template>

<script setup>
import GoodsHeader from '@/GoodsComponents/GoodsHeader.vue'
import OrderAddress from '@/Order/OrderAddress.vue'
</script>

<style scoped>
.order-index-bg {
  height: 100vh;
  background-color: #DEDEDD;
}

</style>