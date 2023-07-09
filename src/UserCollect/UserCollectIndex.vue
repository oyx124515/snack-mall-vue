<template>
  <!--用户收藏 -->
  <div class="user-collect-index">
    <goods-header></goods-header>


    <div style="margin-top: 20px">
      <div class="user-collect-title">
        <span style="font-size: 20px;font-weight: 400">我的收藏</span>
      </div>
    </div>
    <div style="margin-top: 20px">
      <div class="user-collect-content">
        <UserCollectItem></UserCollectItem>
        <UserCollectItem></UserCollectItem>
        <UserCollectItem></UserCollectItem>
        <UserCollectItem></UserCollectItem>
        <UserCollectItem></UserCollectItem>
        <UserCollectItem></UserCollectItem>

      </div>
    </div>

  </div>
</template>

<script setup>
import GoodsHeader from '@/GoodsComponents/GoodsHeader.vue'
import UserCollectItem from '@/UserCollect/UserCollectItem.vue'
</script>


<style scoped>
.user-collect-index {
  background-color: #DEDEDD;
}

.user-collect-title {
  background-color: #ffffff;
  border-radius: 12px;
  width: 1206px;
  padding: 10px;
  margin: 0 auto;
}

.user-collect-content {
  width: 1206px;
  padding: 10px;
  border-radius: 12px;
  background-color: #ffffff;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
</style>