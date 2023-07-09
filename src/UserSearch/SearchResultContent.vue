<template>
  <div class="search-result-out">

    <a-menu v-model:selectedKeys="current" mode="horizontal">
      <a-menu-item key="mail">
        综合排序
      </a-menu-item>
      <a-menu-item key="a">
        销量
      </a-menu-item>
      <a-menu-item key="c">
        价格从低到高
      </a-menu-item>
      <a-menu-item key="w">
        价格从高到低
      </a-menu-item>
      <!--      -->

      <!--      -->
    </a-menu>
    <br>
    <div>
      <span style="display: inline-block;margin-left: 10px">价格区间：</span>
      <a-input-number v-model:value.lazy.number="priceStart" addon-before="￥" :min="1"></a-input-number>
      <span style="display: inline-block;margin: 0 12px">-</span>
      <a-input-number v-model:value.lazy.number="priceEnd" addon-before="￥" :min="priceStart"></a-input-number>
      <a-button type="primary" style="margin-left: 12px">确定</a-button>
    </div>
    <br>
    <div class="search-item-list">
      <SalesItem></SalesItem>
      <SalesItem></SalesItem>
      <SalesItem></SalesItem>
      <SalesItem></SalesItem>
      <SalesItem></SalesItem>
      <SalesItem></SalesItem>
      <SalesItem></SalesItem>

    </div>
  </div>

</template>

<script setup>

import {ref} from "vue";
import SalesItem from '@/components/SalesItem'

const current = ref(['mail'])
const priceStart = ref("")
const priceEnd = ref("")
</script>
<style scoped>
.search-result-out {
  width: 1226px;
  padding: 10px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 12px;
  box-sizing: border-box;
}

.search-item-list {
  display: flex;
  flex-wrap: wrap;
}

</style>