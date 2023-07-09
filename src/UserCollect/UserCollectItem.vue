<template>
  <!-- 收藏夹item 的组件   -->
  <div class="hot-sales-item">
    <img src="../static-test/hot-sales.webp" alt="食品">
    <div class="hot-sales-title">
      <span>良品铺子高蛋白肉脯150g肉干肉脯办公室休闲小吃网红肉类类类类类类类类类类类类类类类类类类类类类类类类类类</span>
    </div>
    <div class="hot-sales-price"><span class="price-unit">￥</span>
      <span class="price-int">12.88</span>
    </div>

    <div class="item-mask">
      <div class="look-for-detail">
        <EyeOutlined style="font-size: 50px"></EyeOutlined>
        <p>查看详情</p>

      </div>
      <div class="cancel-collect">
        <CloseCircleOutlined style="font-size: 50px"></CloseCircleOutlined>
        <p>取消收藏</p>
      </div>

    </div>
  </div>
  <!-- 收藏夹item 的组件end   -->
</template>

<script setup>
import {EyeOutlined, CloseCircleOutlined} from '@ant-design/icons-vue'
</script>

<style scoped>

.hot-sales-item {
  border-radius: 10px;
  padding-top: 3px;
  height: 324px;
  justify-content: center;
  display: block;
  border: 2px solid transparent;
  width: 236px;
  transition: 0.2s;
  position: relative;
}

.hot-sales-item:hover {
  border: 2px solid #ff5000;
}

.hot-sales-title {
  width: 230px;
  height: 42px;
  margin: 0 auto;
}

.hot-sales-title span {
  font-weight: 700;
  line-height: 21px;
  font-size: 15px;
  height: auto;
  display: -webkit-box;
  overflow: hidden;
  /*超出隐藏*/
  text-overflow: ellipsis;
  /*隐藏后添加省略号*/
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

}


.hot-sales-item img {
  border-radius: 12px;
  width: 230px;
  height: 230px;
  display: block;
  margin: 0 auto 10px;
}

.hot-sales-price {
  margin-top: 10px;
}

.hot-sales-price .price-unit {
  color: #ff5000;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
}

.hot-sales-price .price-int {
  color: #ff5000;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
}

.item-mask {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(51, 51, 51, 0.5);
  border-radius: 9px;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  opacity: 0;
  transition: 0.2s;
}
.item-mask:hover
{
  display: flex;
  opacity: 1;
}

.look-for-detail, .cancel-collect {
  color: #F7F9FA;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.look-for-detail p,
.cancel-collect p {
  margin-top: 12px;
  font-weight: 1000;
  font-size: 20px;
}

.look-for-detail:hover, .cancel-collect:hover {
  color: #FF4400;
  cursor: pointer;
}


</style>