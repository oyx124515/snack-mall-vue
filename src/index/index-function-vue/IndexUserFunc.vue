<template>
  <div class="user-func-content">
    <div class="line-icon-flex">
      <!--收藏夹-->
      <div class="user-func-inner-content" @click="toUserCollectIndex">
        <heart-outlined class="index-func-icon"/>
        <span class="func-title"> 收藏夹</span>
      </div>

      <a-divider type="vertical" style="height: 82px; width: 2px; background-color: #6c6c6c"/>
      <!--购物车-->
      <div class="user-func-inner-content" @click="toShoppingCartIndex">
        <shopping-cart-outlined class="index-func-icon"/>
        <span class="func-title">购物车</span>
      </div>


    </div>

    <div class="icon-divide"></div>
    <div class="line-icon-flex">

      <!--客服-->
      <div class="user-func-inner-content" @click="toInfoIndex">
        <profile-outlined class="index-func-icon"/>
        <span class="func-title">资讯</span>
      </div>
      <a-divider type="vertical" style="height: 82px; width: 2px; background-color: #6c6c6c"/>


      <!--优惠券-->
      <div class="user-func-inner-content" @click="toCouponIndex">
        <barcode-outlined class="index-func-icon"/>
        <span class="func-title">优惠券</span>
      </div>


    </div>
  </div>
</template>

<script setup>
import {HeartOutlined, ShoppingCartOutlined, BarcodeOutlined, ProfileOutlined} from '@ant-design/icons-vue';
import {onMounted, ref} from "vue";
import {request} from "@/request";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";

const router = useRouter();
const authed = ref(false);


// 资讯页
function toInfoIndex() {
  router.push({name: "infoIndex"});

}


// 优惠券页
function toCouponIndex() {
  if (authed.value) {
    router.push({name: "couponIndex"});
  } else {
    message.info("请登录后使用");
  }
}


// 去购物车页
function toShoppingCartIndex() {
  if (authed.value) {
    router.push({name: "shoppingCartIndex"});
  } else {
    message.info("请登录后使用");
  }
}

// 去收藏页
function toUserCollectIndex() {
  if (authed.value) {
    router.push({name: "userCollectIndex"});
  } else {
    message.info("请登录后使用");
  }
}

function authFunc() {
  request(
      {
        url: "/getAuth/",
        headers: {token: window.localStorage.getItem("token")}
      }
  ).then(
      (resp) => {
        let data = resp.data;
        if (data.isAuthed) {
          authed.value = true;
        }
      },
      () => {
      }
  )
}


function MountedFunc() {
  authFunc()

}

onMounted(() => MountedFunc())


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

.line-icon-flex {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 50%;
  align-items: center;
  /*border: 1px solid #ff5000;*/
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