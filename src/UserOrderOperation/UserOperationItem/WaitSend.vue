<template>
  <div class="table-set-div">
    <div class="inner-div-center" v-for="item in table_data" :key="item.key">
      <table class="item-basic-table">
        <thead class="item-thead">
        <tr>
          <td>
            <span class="item-date">{{ item.create_time.substr(0, 10) }}</span>
            <span class="order-id">订单号:</span>
            <span class="order-id">{{ item.id }}</span>
          </td>
          <td class="item-basic-width">单价</td>
          <td class="item-basic-width">数量</td>
          <td class="item-basic-width">实际付款</td>
          <td class="item-basic-width"></td>
          <td class="item-basic-width"></td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="item-detail-td">
            <div class="item-detail">
              <div class="item-detail-img">
                <img :src="BaseImgUrl+item.spu_cover" alt="">
              </div>
              <div class="item-detail-words">
                <div class="item-detail-title">
                  <span>{{ item.spu_name }}</span>
                </div>
                <div class="item-detail-class">
                  <span>{{ item.sku_name }}</span>
                </div>
                <div class="item-detail-time">

                </div>
                <div class="item-detail-time">

                </div>
              </div>
            </div>
          </td>
          <td class="item-basic-width">
            <div class="item-price">
              <span>￥</span><span>{{ item.single_price }}</span>
            </div>
          </td>
          <td class="item-basic-width">
            <div>{{ item.number }}</div>
          </td>
          <td class="item-basic-width">
            <div class="item-price">
              <span>￥</span><span>{{ item.pay_money }}</span>
            </div>
          </td>

          <td class="item-basic-width">
          </td>
        </tr>
        </tbody>

      </table>
    </div>

  </div>
</template>

<script setup>


import {onMounted, reactive} from "vue";
import {request} from "@/request";
import {message} from "ant-design-vue";
import BaseImgUrl from "@/baseImgUrl";

const table_data = reactive([])

function flushData() {
  table_data.length = 0;
  request(
      {
        url: "/getStatusOrder/",
        method: "post",
        data: {status: 1},
        headers: {token: window.localStorage.getItem("token")}
      }
  ).then((resp) => {
        let data = resp.data;
        console.log(data)
        if (data.code === 0) {
          let i = 0
          data.body.forEach(
              tar => table_data.push({...tar, key: i++})
          )
        }
      },
      () => message.info("获取信息失败"))
}


function mountFunc() {
  flushData();
}

onMounted(() => mountFunc())
</script>

<style scoped>
.table-set-div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inner-div-center {
  padding: 10px;
}


.item-basic-table {
  border-collapse: collapse;
  font-size: 12px;
  width: 1069px;
  height: 180px;
  background-color: rgb(247, 249, 250);
  border: 2px solid transparent;
  transition: 0.2s;
}

.item-basic-table:hover {
  border: 2px solid #FF4400;
}

.item-thead {
  height: 43px;
  color: #3c3c3c;
  background-color: rgb(241, 241, 241);
}

.item-detail-td {
  width: 406px;
}

.item-detail {
  display: flex;
  justify-content: space-evenly;
}

.item-date {
  display: inline-block;
  margin-left: 12px;
  margin-right: 12px;
  font-size: 12px;
  font-weight: 700;
}

.order-id {
  font-size: 12px;
  font-weight: 400;
}

.item-detail-img {
  margin-top: 20px;
  display: inline-block;
}

.item-detail-img img {
  width: 80px;
  height: 80px;
}

.item-detail-words {
  width: 293px;
}

.item-detail-title {
  margin-top: 12px;
  color: #3c3c3c;
  font-size: 12px;
}

.item-detail-class {
  margin-top: 10px;
  color: #9e9e9e;
  font-size: 12px;
}

.item-detail-time {
  margin-top: 5px;
  font-size: 12px;
  color: #3c3c3c;
}

.item-price {
  font-size: 12px;
  color: red;
}

.item-basic-width {
  width: 80px
}
</style>