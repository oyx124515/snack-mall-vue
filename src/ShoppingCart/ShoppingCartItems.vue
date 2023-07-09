<template>
  <!--  -->
  <div class="fix-price-sum">
    <div>
      <a-button type="danger">删除所选</a-button>
    </div>
    <div>
      <span class="select-item-sum">已选择商品</span>
      <span class="select-item-sum-number">{{ rowSelection.state.length }}</span>
      <span class="select-item-sum">件</span>

      <div class="select-item-sum-number-price">
        <span class="select-item-sum">合计（不含运费）：</span>
        <span class="select-item-sum-number">{{ sumPrice }}</span>
        <button class="sum-button sum-button-have" ref="sumButton ">结 算</button>
      </div>
    </div>
  </div>
  <!--  -->
  <div class="shopping-cart-items-content">
    <a-table :columns="columns" :data-source="data" :pagination="false"
             :row-selection="{ selectedRowKeys: rowSelection.state, onChange: onSelectChange }"

    >
      <template #bodyCell="{ column, record }">

        <template v-if="column.key === 'imgSrc'">
          <a-image
              :width="80"
              :height="80"
              src=""
              :fallback="imgData"
          />

        </template>

        <template v-else-if="column.key === 'name'">
          <a class="item-name">
            {{ record.name }}
          </a>
        </template>

        <template v-else-if="column.key === 'number'">
          <a-input-number id="inputNumber" v-model:value.number.lazy="record.number" :min="1" :max="999"/>
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
          <a-button type="danger" @click="handeDelete(record.uuid)">删除</a-button>
        </template>


      </template>

    </a-table>

  </div>
</template>
<script setup>
import {computed, reactive,} from "vue";
import columnsArr from './shoppingItemCartCol'
import imgData from '@/GoodsComponents/fallback-png.js'

const rowSelection = reactive(
    {
      state: []
    }
)


function onSelectChange(selectedRowKeys) {
  rowSelection.state = selectedRowKeys
  console.log(rowSelection.state)
}

function handeDelete(ids) {
  alert("删掉的" + ids)
}


const columns = columnsArr
const data = reactive([])
let sin = {
  imgSrc: "127.0.0.1",
  name: "【狂欢价】凉席学生宿舍单人夏季两用草席子家用可水洗夏天婴儿藤席儿童竹席",
  type: "颜色分类：罗马格【凉而不冰 清凉透气】适用床尺寸：100cm*195cm（赠枕套1个）",
  singlePrice: 25.80,

  operation: "删除"
}
let func = function () {
  for (let i = 0; i < 10; i++) {
    data.push({
      ...sin, key: i, number: i + 1,
      uuid: i + 100,
    })
  }
}
func()
//计算总价
const sumPrice = computed(
    () => {
      let sum = 0;
      rowSelection.state.forEach((obj) => {
        sum += data[obj].singlePrice * data[obj].number
      })
      return sum.toFixed(2);
    }
)


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