<template>
  <div class="content-div">
    <div class="center-content">
      <div class="orderId-text">
        <p>支付订单号:</p>
        <p v-for="i in orderIds" :key="i">{{ i }}</p>
      </div>

      <div style="display: flex;justify-content: center;padding: 40px">
        <img class="qr-img" src="../assets/QR-code-test.jpg" alt="付款码">
      </div>

      <div class="pay-text">
        付款: {{ pay_money }}￥
      </div>
      <div class="pay-operation">
        <div>
          <a-button type="primary" @click="handleSuccess">支付成功</a-button>
        </div>
        <div>
          <a-button type="dashed" @click="handleFault">支付失败</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {onMounted, reactive, ref} from "vue";
import {request} from "@/request";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const pay_money = ref("")
const orderIds = reactive([])
const router = useRouter()
const store = useStore()

function handleSuccess() {
  request(
      {
        url: "/handleOrderBySuccess/",
        method: "post",
        headers: {token: window.localStorage.getItem("token")},
        data: orderIds
      }
  ).then(
      (resp) => {
        if (resp.data.code === 0) {
          message.success("支付成功");
          router.replace({name: "userOperationIndex"});
        }
      },
      () => message.error("支付失败,无法连接到服务器")
  )
}

function handleFault() {
  message.error("支付失败");
  router.replace({name: "userOperationIndex"});
}

function onMountedFunc() {
  pay_money.value = store.state.sumPrice
  store.state.CreateOrderIDs.forEach(tar => orderIds.push(tar))
}

onMounted(() => onMountedFunc())

</script>

<style scoped>
.content-div {
  width: 100vw;
  height: 100vh;
  background: url("../assets/pay-back-ground.svg");
}


.center-content {
  width: 700px;
  margin: 0 auto;
}

.qr-img {
  height: 200px;
  width: 200px;
  margin: 0 auto;
}

.orderId-text {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000000;
  font-size: 18px;
}

.pay-text {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  color: #FF4400;
  font-size: 18px;
}

.pay-operation {
  justify-content: center;
}

.pay-operation div {
  padding: 20px;
  display: flex;
  justify-content: center;
  width: 700px;
}

.pay-operation button {
  width: 200px;
}
</style>