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
          <a-input-number v-model:value.number="record.quantity" :min="0" :max="record.stock"/>
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

  <!--  展示优惠卷信息-->
  <div class="order-address-content">
    <p v-if="couponList.length === 0">
      没有可用的优惠券
    </p>

    <a-radio-group v-model:value="selectCoupon">
      <template v-for="i in couponList" :key="i.id">
        <a-radio :style="radioStyle" :value="i.id">使用满{{ i.max }}减{{ i.reduce }}优惠券</a-radio>
      </template>
    </a-radio-group>
  </div>
  <!--  展示优惠卷信息end-->


  <!--  -->
  <div class="order-address-content">
    <span style="color: #333333;font-size: 12px;font-weight: 700">实付款：</span>
    <span style="color: #999999;font-size: 26px;font-weight: 400">￥</span>
    <span style="color: #ff0036;font-size: 26px;font-weight: 400">{{ sumPrice.toFixed(2) }}</span>
    <span style="color: #333333;font-size: 12px;font-weight: 700">{{ couponMessage }}</span>
    <button class="submit-order" @click="submitOrder">提交订单</button>
  </div>
  <!--  -->
</template>

<script setup>
import {onMounted, ref, watchEffect} from "vue";
import {useStore} from 'vuex'


import {reactive,} from "vue";
import columnsArr from './OrderItemCol'
import imgData from '@/GoodsComponents/fallback-png.js'
import {request} from "@/request";
import {message, notification} from "ant-design-vue";
import BaseImgUrl from "@/baseImgUrl";
import {useRouter} from "vue-router";

const columns = columnsArr
const table_data = reactive([])
const addrOptions = reactive([])
// 总计价格
const sumPrice = ref(0);
// 已经选择的地址id
const selectAddr = ref("")
// 已选择的优惠券id
const selectCoupon = ref("")
const couponMessage = ref("")

// 优惠券的list
const couponList = reactive([])
const radioStyle = reactive({
  display: 'flex',
  height: '30px',
  lineHeight: '30px',
});


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


// 监视数据
watchEffect(() => {
  sumPrice.value = 0;
  table_data.forEach(tar => {
    sumPrice.value = sumPrice.value + (tar.quantity * tar.singlePrice)
  })
  if (selectCoupon.value !== "") {
    const findTar = couponList.find((tar) => {
      return tar.id === selectCoupon.value
    })
    if (findTar.max > sumPrice.value) {
      message.info("未达到优惠价,不可用该优惠券");
      couponMessage.value = "";
      selectCoupon.value = "";
    } else {
      couponMessage.value = "已优惠" + findTar.reduce + "￥";
      sumPrice.value = sumPrice.value - findTar.reduce;
    }
  } else {
    couponMessage.value = "";
  }
})


const store = useStore()
const router = useRouter()


// 提价订单
function submitOrder() {
  let send_data = {
    items: [],
    addrID: selectAddr.value,
  }
  table_data.forEach(tar => {
    send_data.items.push(
        {
          sku: tar.sku,
          spu: tar.spu,
          quantity: tar.quantity
        }
    )

  });

  if (selectCoupon.value !== "") {
    send_data["userCouponID"] = selectCoupon.value;
  }
  //
  console.log(send_data)
  request({
    url: "/submitOrder/",
    method: "post",
    data: send_data,
    headers: {token: window.localStorage.getItem("token")}
  }).then(
      (resp) => {
        console.log(resp.data);
        let data = resp.data;
        if (data.code === 0) {
          message.info(data.message);
          store.commit("SET_SUM_PRICE", data.body.sumPrice);
          store.commit("CLEAN_CREATE_ORDER");
          store.commit("SET_CREATE_ORDER", data.body.orderIDs);
          router.replace({name: "payment"});
        } else {
          message.error(data.body.message);
        }

      }, () => message.error("无法链接服务器,创建订单失败")
  )
}


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
  // 获取优惠券信息
  request({url: "/getCoupon/", headers: {token: window.localStorage.getItem("token")}}).then(
      (resp) => {
        let data = resp.data;
        couponList.length = 0;
        data.body.forEach(tar => couponList.push(tar))
      },
      () => message.error("无法链接服务器,获取优惠券信息失败")
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