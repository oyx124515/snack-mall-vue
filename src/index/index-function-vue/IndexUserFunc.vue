<template>
  <div class="user-func-content">
    <div class="line-icon-flex">


      <div class="user-func-inner-content">
        <heart-outlined class="index-func-icon"/>
        <span class="func-title"> 收藏夹</span>
      </div>
      <!--      <div class="user-func-inner-content">-->
      <!--        <heart-outlined class="index-func-icon"/>-->
      <!--        <span class="func-title"> 收藏夹</span>-->
      <!--      </div>-->
      <!--      <a-divider type="vertical" style="height: 82px; width: 2px; background-color: #6c6c6c"/>-->
      <!--      <div class="user-func-inner-content">-->
      <!--        <shopping-cart-outlined class="index-func-icon"/>-->
      <!--        <span class="func-title">购物车</span>-->
      <!--      </div>-->
      <!--    </div>-->
      <!--    <div class="icon-divide"></div>-->
      <!--    <div class="line-icon-flex">-->
      <!--      <div class="user-func-inner-content">-->
      <!--        <smile-outlined class="index-func-icon"/>-->
      <!--        <span class="func-title">客服</span>-->
      <!--      </div>-->
      <!--      <a-divider type="vertical" style="height: 82px; width: 2px; background-color: #6c6c6c"/>-->
      <!--      <div class="user-func-inner-content">-->
      <!--        <barcode-outlined class="index-func-icon"/>-->
      <!--        <span class="func-title">优惠券</span>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script setup>
import {HeartOutlined, ShoppingCartOutlined, SmileOutlined, BarcodeOutlined} from '@ant-design/icons-vue'
</script>

<style scoped>

.user-func-content {
  text-align: center;
  border-radius: 12px;
  width: 380px;
  height: 250px;
  background-color: #F7F9FA;
  border: 2px solid transparent;
  transition: 0.2s;
}

.user-func-content:hover {
  border: 2px solid #FF4400;
}

.user-func-inner-content {
  display: flex;
  flex-direction: column;
}


.index-func-icon {
  font-size: 60px;
}

/*.line-icon-flex {*/
/*  display: flex;*/
/*  justify-content: space-evenly;*/
/*  width: 100%;*/
/*  height: 50%;*/
/*  align-items: center;*/
/*}*/

.line-icon-flex {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: center;
}

.user-func-inner-content {
  /*border: 1px solid #ff9000;*/
  height: 82px;
}

.icon-divide {
  margin: 0 auto;
  width: 342px;
  padding: 1px;
  background-color: #6c6c6c;
  position: relative;
}

.icon-divide::after {
  content: "";
  display: block;
  position: absolute;
  padding: 1px;
  width: 60px;
  background-color: #F7F9FA;
  left: 140px;
  top: 0
}

.func-title {
  display: block;
  margin-top: 5px;
}

.func-title:hover {
  color: #ff5000;
}

.user-func-inner-content:hover {

  color: #ff5000;
  transition: 0.2s;
}
</style>