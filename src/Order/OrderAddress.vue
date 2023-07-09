<template>
  <div class="order-address-content">
    <span class="select-title">选择收货地址</span>
    <a-select
        ref="select"
        v-model:value="selectAddr"
        style="width: 1000px"
    >
      <template v-for="item in addrOptions" :key="item.key">
        <a-select-option :value="item.id">
          {{ item.address1 }}-{{ item.address2 }}-{{ item.receiver }}-{{ item.telephone }}
        </a-select-option>
      </template>
    </a-select>
  </div>

  <!--  items -->

  <div class="order-address-content">
    <a-table :columns="columns" :data-source="table_data" :pagination="false">
      <template #bodyCell="{ column, record }">

        <template v-if="column.key === 'imgSrc'">
          <a-image
              :width="80"
              :height="80"
              :src="BaseImgUrl+record.imgSrc"
              :fallback="imgData"
          />

        </template>

        <template v-else-if="column.key === 'name'">
          <a class="item-name">
            {{ record.name }}
          </a>
        </template>

        <template v-else-if="column.key === 'quantity'">
          <span>{{ record.quantity }}</span>
        </template>

        <template v-else-if="column.key === 'singlePrice'">
          <span style="color: #000000;font-weight: bold">￥</span>
          <span style="color: #000000;font-weight: bold">{{ record.singlePrice.toFixed(2) }}</span>
        </template>

        <template v-else-if="column.key === 'price'">
          <span style="color: #FF4400;font-weight: bold">￥</span>
          <span style="color: #FF4400;font-weight: bold">{{ (record.singlePrice * record.quantity).toFixed(2) }}</span>
        </template>
      </template>

    </a-table>
  </div>
  <!--  -->
  <div class="order-address-content">
    <span style="color: #333333;font-size: 12px;font-weight: 700">实付款：</span>
    <span style="color: #999999;font-size: 26px;font-weight: 400">￥</span>
    <span style="color: #ff0036;font-size: 26px;font-weight: 400">{{ sumPrice.toFixed(2) }}</span>
    <button class="submit-order">提交订单</button>
  </div>
  <!--  -->
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useStore} from 'vuex'

const selectAddr = ref("")


import {reactive,} from "vue";
import columnsArr from './OrderItemCol'
import imgData from '@/GoodsComponents/fallback-png.js'
import {request} from "@/request";
import {message, notification} from "ant-design-vue";
import BaseImgUrl from "@/baseImgUrl";

const columns = columnsArr
const table_data = reactive([])
const addrOptions = reactive([])
const sumPrice = ref(0);

function table_format(data) {
  data.forEach(
      item => {
        table_data.push(
            {
              ...item, singlePrice: Number(item.singlePrice)
            }
        )
      }
  )
  table_data.forEach(d => {
    sumPrice.value += d.singlePrice * d.quantity;
  })
}

const store = useStore()

function onMountedFunc() {
  // 获取收货地址
  request(
      {
        method: "get",
        url: "/getUserReceiveList/",
        headers: {token: window.localStorage.getItem("token")}
      }
  ).then(
      (resp) => {
        let data = resp.data;
        let i = 0;
        data.forEach(d => addrOptions.push({...d, key: i++}))
        selectAddr.value = addrOptions[0].id
      },
      () => message.error("获取收货地址失败")
  )
  // 获取订单信息


  const send = [];
  console.log(store.state.OrderItems)
  store.state.OrderItems.forEach(e => send.push(e))
  request({
    url: "/getOrderListInfo/",
    method: "post",
    data: send
  }).then(
      (resp) => {
        let data = resp.data;
        table_format(data.body);

        if (data.code === 1) {
          notification.open({
            message: '注意',
            description: data.message,
            duration: 0,
          });
        }
      },
      () => message.error("获取订单信息失败")
  )
}

onMounted(() => onMountedFunc())


</script>

<style scoped>
.order-address-content {
  padding: 20px;
  width: 1186px;
  background-color: #ffffff;
  margin: 12px auto 0;
  border-radius: 12px;
}

.select-title {
  display: block;
  margin-bottom: 12px;
  color: #333333;
  font-weight: 700;
  font-size: 14px;
}

.submit-order {
  color: #ffffff;
  background-color: #ff0036;
  font-size: 14px;
  font-weight: 700;
  width: 182px;
  height: 39px;
  line-height: 39px;
  margin-left: 20px;
}

.submit-order:hover {
  opacity: 0.8;
}

.submit-order:active {
  opacity: 0.5
}
</style>