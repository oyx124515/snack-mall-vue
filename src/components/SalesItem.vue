<template>
  <div class="hot-sales-item">
    <img :src="BaseImgHost + imgSrc" alt="食品">
    <div class="hot-sales-title">
      <span>{{ name }}</span>
    </div>
    <div class="hot-sales-price">
      <div><span class="price-unit">￥</span>
        <span class="price-int">{{ starting_price }}</span></div>
      <div>销量：{{sales_volume}}</div>
    </div>
  </div>
</template>

<script setup>
import BaseImgHost from '@/baseImgUrl'
import {onMounted, ref} from "vue";
import {request} from "@/request";


// eslint-disable-next-line no-undef
const props = defineProps({
  id: String
})

const itemId = ref("");
const imgSrc = ref("");
const name = ref("")
const starting_price = ref("")
const sales_volume = ref(0)

function onMountedFun() {
  itemId.value = props.id
  request({
    url: "/getSaleCovers/",
    method: "post",
    data: {
      id: itemId.value
    }
  }).then(
      (resp) => {
        let data = resp.data;
        if (data.code === 0) {
          let resp_body = data.body
          imgSrc.value = resp_body.cover;
          name.value = resp_body.name;
          starting_price.value = resp_body.starting_price;
          sales_volume.value = resp_body.sales_volume
        }
      },
      () => {
      }
  )
}

onMounted(
    () => {
      onMountedFun()
    }
)
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
  margin: 0 auto;
  margin-bottom: 10px;
}

.hot-sales-price {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;

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
</style>