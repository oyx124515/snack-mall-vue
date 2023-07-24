<template>
  <div class="coupon-index-bg">

    <GoodsHeader></GoodsHeader>
    <div class="table-data">
      <a-list size="middle" :data-source="public_coupon" bordered>
        <template #renderItem="{ item }">
          <a-list-item>
            <span>
              满{{ item.max }}减{{ item.reduce }}优惠券( 还剩余{{ item.quantity }}张 )
            </span>
            <a-button type="primary" @click="userTryGetCoupon(item)">立刻入手</a-button>
          </a-list-item>
        </template>

        <template #header>
          <h3 style="font-size: 20px;color: #FF4400">已发行优惠券</h3>
        </template>

      </a-list>
    </div>


    <!--我的优惠券-->
    <div class="table-data">
      <a-list size="middle" :data-source="user_coupon" bordered>
        <template #renderItem="{ item }">
          <a-list-item>
            <span>
              满{{ item.max }}减{{ item.reduce }}优惠券
            </span>
          </a-list-item>
        </template>

        <template #header>
          <h3 style="font-size: 20px;color: #FF4400">我的优惠券</h3>
        </template>

      </a-list>
    </div>


  </div>


</template>

<script setup>
import GoodsHeader from '@/GoodsComponents/GoodsHeader.vue';
import {onMounted, reactive} from "vue";
import {request} from "@/request";
import {message} from "ant-design-vue";

const public_coupon = reactive([
  {id: 100, reduce: 100, max: 100, quantity: 100},
  {id: 100, reduce: 100, max: 100, quantity: 100},
  {id: 100, reduce: 100, max: 100, quantity: 100},
  {id: 100, reduce: 100, max: 100, quantity: 100},
])
const user_coupon = reactive([
  {id: 100, reduce: 100, max: 100,},
  {id: 100, reduce: 100, max: 100,},
  {id: 100, reduce: 100, max: 100,},
  {id: 100, reduce: 100, max: 100,},
])

// 抢购优惠券
function userTryGetCoupon(item) {
  console.log(item.id);
  request({
    url: "/userTryGetCoupon/",
    method: "post",
    headers: {token: localStorage.getItem("token")},
    data: {id: item.id}
  }).then(
      (resp) => {
        let data = resp.data;
        if (data.code === 0) {
          let ids = data.body;
          item.quantity = item.quantity - 1;
          let pushData = {...item, id: ids};
          user_coupon.push(pushData);
        } else {
          message.info(data.message)
        }

      },
      () => message.error("操作失败,无法连接到服务器"),
  )

}


function mountedFunc() {
  // getCoupon
  user_coupon.length = 0;
  request({
    url: "/getCoupon/",
    headers: {token: localStorage.getItem("token")},
  }).then(
      (resp) => {
        const data = resp.data;
        data.body.forEach(tar => user_coupon.push(tar));
      },
      () => message.error("获取用户优惠券信息失败")
  );
  //getAllPublicCoupon
  public_coupon.length = 0;
  request({
    url: "/getAllPublicCoupon/",
    headers: {token: localStorage.getItem("token")},
  }).then(
      (resp) => {
        const data = resp.data;
        data.body.forEach(tar => public_coupon.push(tar));
      },
      () => message.error("获取优惠券信息失败")
  );


}

onMounted(() => mountedFunc())

</script>

<style scoped>
.coupon-index-bg {
  min-height: 100vh;
  background-color: #DEDEDD;
}

.table-data {
  background-color: #ffffff;
  margin: 40px auto;
  padding: 20px;
  width: 1226px;
  border-radius: 12px;
}
</style>