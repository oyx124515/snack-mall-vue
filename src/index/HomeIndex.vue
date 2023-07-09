<template>
  <!--  所有网站的主页-->
  <div class="home-page-bg">

    <home-index-header></home-index-header>
    <!--搜索框 -->
    <div class="outsize">
      <search-container></search-container>

    </div>
    <!--轮播图-->
    <div class="outsize">
      <index-swiper></index-swiper>
    </div>
    <!--    用户功能   -->
    <div class="outsize">
      <index-function></index-function>
    </div>
    <!--    热销商品  -->
    <div class="outsize">
      <index-hot-sale></index-hot-sale>
    </div>
  </div>
</template>

<script setup>
import HomeIndexHeader from './HomeIndexHeader'
import SearchContainer from "@/index/SearchContainer";
import IndexSwiper from '@/index/IndexSwiper'
import IndexFunction from '@/index/IndexFunction'
import IndexHotSale from '@/index/IndexHotSale'
</script>

<style scoped>
.outsize {
  width: 100%;
  margin-top: 20px;
}

.home-page-bg {
  background-color: #DEDEDD;
}
</style>