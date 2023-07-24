<template>
  <!-- 顶部选择 -->
  <div class="fix-price-sum">
    <div>
      <a-button type="danger" @click="deleteSelected">删除所选</a-button>
    </div>
    <div>
      <span class="select-item-sum">已选择商品</span>
      <span class="select-item-sum-number">{{ rowSelection.state.length }}</span>
      <span class="select-item-sum">件</span>

      <div class="select-item-sum-number-price">
        <span class="select-item-sum">合计（不含运费）：</span>
        <span class="select-item-sum-number">{{ sumPrice.toFixed(2) }}</span>
        <a-button type="primary" ref="sumButton" @click="handleSettle">结 算</a-button>
      </div>
    </div>
  </div>
  <!--  -->
  <div class="shopping-cart-items-content">
    <a-table :columns="columns" :data-source="tableData" :pagination="false"
             :row-selection="{ selectedRowKeys: rowSelection.state,onChange: onSelectChange }"
             :row-key="i=>i"
    >
      <template #bodyCell="{ column, record }">

        <template v-if="column.key === 'imgSrc'">
          <a-image
              :width="80"
              :height="80"
              :src="baseImgUrl+record.imgSrc"
              :fallback="imgData"
          />

        </template>

        <template v-else-if="column.key === 'name'">
          <a class="item-name">
            {{ record.name }}
          </a>
        </template>

        <template v-else-if="column.key === 'number'">
          <a-input-number id="inputNumber" v-model:value.number.lazy="record.number" :min="1" :max="record.stock"/>
        </template>

        <template v-else-if="column.key === 'singlePrice'">
          <span style="color: #000000;font-weight: bold">￥</span>
          <span style="color: #000000;font-weight: bold">{{ record.singlePrice.toFixed(2) }}</span>
        </template>

        <template v-else-if="column.key === 'price'">
          <span style="color: #FF4400;font-weight: bold">￥</span>
          <span style="color: #FF4400;font-weight: bold">{{ (record.singlePrice * record.number).toFixed(2) }}</span>
        </template>

        <template v-else-if="column.key === 'operation'">
          <a-button type="danger" @click="handeDelete(record)">删除</a-button>
        </template>


      </template>

    </a-table>

  </div>
</template>
<script setup>
import baseImgUrl from "@/baseImgUrl";
import {onMounted, reactive, ref,} from "vue";
import columnsArr from './shoppingItemCartCol'
import imgData from '@/GoodsComponents/fallback-png.js'
import {request} from "@/request";
import {message} from "ant-design-vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";


const sumPrice = ref(0);
const columns = columnsArr;
const tableData = reactive([]);
const store = useStore();
const router = useRouter();

const rowSelection = reactive(
    {
      state: [],
    }
);

function handleSettle() {
  store.commit("CLEAN_ORDER_ITEMS");
  let order_list = [];
  if (rowSelection.state.length === 0) {
    message.info("请选项需要结算的项目");
    return;
  }
  rowSelection.state.forEach(
      tar => {
        order_list.push(
            {spu: tar.spu, sku: tar.sku, quantity: tar.number}
        )
      }
  );
  //
  let send_data = [];
  rowSelection.state.forEach(
      tar => send_data.push(tar.id)
  );
  request(
      {
        url: "/deleteShoppingCart/",
        headers: {token: localStorage.getItem("token")},
        data: send_data,
        method: "post",
      }
  ).then(
      (resp) => {
        let data = resp.data;
        if (data.code === 0) {
          //
          store.commit("ADD_ORDER_ITEMS", order_list);
          router.replace({name: "orderIndex"});
        } else {
          message.error("无法完成结算")
        }
      },
      () => {
        message.error("链接服务器失败,无法完成结算")
      }
  )


}

function onSelectChange(selectedRowKeys) {
  rowSelection.state = selectedRowKeys
  sumPrice.value = 0;
  rowSelection.state.forEach(tar => {
    sumPrice.value = sumPrice.value + (tar.singlePrice * tar.number)
  })
}


function onMountedFunc() {
  tableData.length = 0;
  request(
      {
        url: "/getAllShoppingCart/",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(
      (resp) => {
        const data = resp.data;
        data.body.forEach(tar => tableData.push(
            {...tar, singlePrice: Number(tar.singlePrice)}
        ))

      },
      () => message.error("无法连接服务器,获取购物车信息失败")
  )

}

function sendDeleteData(send_data_list) {
  request(
      {
        url: "/deleteShoppingCart/",
        method: "post",
        data: send_data_list,
        headers: {token: localStorage.getItem("token")}
      }
  ).then(
      (resp) => {
        const data = resp.data;
        if (data.code === 0) {
          onMountedFunc();
        }
      },
      () => message.error("无法链接到服务器,删除数据失败")
  )
}


function handeDelete(tar) {
  const send_list = [];
  send_list.push(tar.id);
  console.log(send_list)
  sendDeleteData(send_list);
}

function deleteSelected() {
  if (rowSelection.state.length === 0) {
    message.info("请选择需要删除的项目")
    return;
  }

  const send_list = [];
  rowSelection.state.forEach(tar => send_list.push(tar.id));
  sendDeleteData(send_list);
}


onMounted(() => onMountedFunc());


</script>

<style scoped>
.shopping-cart-items-content {
  padding: 20px;
  width: 1186px;
  background-color: #ffffff;
  margin: 0 auto;
  border-radius: 12px;
}

.item-name {
  color: black;
}

.item-name:hover {
  color: #ff5000;
  text-decoration: underline;
}

.fix-price-sum {
  border-radius: 12px;
  height: 72px;
  padding: 20px;
  width: 1186px;
  background-color: #ffffff;
  position: sticky;
  top: -1px;
  z-index: 1000;
  margin: 0 auto 20px;
  display: flex;
  justify-content: space-between;
}

.select-item-sum {
  font-size: 13px;
}

.select-item-sum-number {
  color: #FF4400;
  font-size: 20px;
  display: inline-block;
  margin: 0 3px;
}

.select-item-sum-number-price {
  display: inline-block;
  margin-left: 5px;
}

.sum-button {
  color: #ffffff;
  line-height: 42px;
  margin-left: 12px;
  width: 74px;
  height: 42px;
  font-weight: bold;
}

.sum-button-have {
  background-color: #ff5500;
}

.sum-button-none {
  background-color: #b0b0b0;
}

</style>