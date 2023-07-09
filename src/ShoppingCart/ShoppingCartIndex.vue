<template>
  <!--购物车主页-->
  <div class="shopping-cart-content">

    <goods-header></goods-header>
    <div style="margin-top: 20px">
      <shopping-cart-search></shopping-cart-search>
    </div>
    <div style="margin-top: 20px">
      <shopping-cart-items></shopping-cart-items>
    </div>

  </div>

</template>

<script setup>

import GoodsHeader from '@/GoodsComponents/GoodsHeader.vue'
import ShoppingCartSearch from '@/ShoppingCart/ShoppingCartSearch.vue'
import ShoppingCartItems from '@/ShoppingCart/ShoppingCartItems.vue'
</script>

<style scoped>
.shopping-cart-content {
  background-color: #DEDEDD;
}


</style>