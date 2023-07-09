<template>
  <div class="hot-sale-content">
    <div class="hot-sale-title">
      <span>热 销 零 食</span>
    </div>
    <sales-item
        v-for="id in hotSalesId" :key="id" :id="id"
        @click="toDetailPage(id)"
    ></sales-item>

  </div>
</template>

<script setup>
import SalesItem from '@/components/SalesItem'
import {onMounted, ref} from "vue";
import {request} from "@/request";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";

const hotSalesId = ref([])
const router = useRouter()


function toDetailPage(targetID) {
  router.push({
    name: "goodsDetailPage",
    params: {id: targetID},
  })
}

function onMountedFun() {
  request(
      {
        url: "/getHotSale"
      }
  ).then(
      (resp) => {
        let data = resp.data;
        if (data.code === 0) {
          data.body.forEach((tar) => {
            // eslint-disable-next-line no-undef
            hotSalesId.value.push(tar);
          })
        }

      },
      () => {
        message.error("获取热销产品失败")
      },
  )
}


onMounted(
    () => {
      onMountedFun()
    }
)


</script>

<style scoped>
.hot-sale-content {
  margin: 0 auto;
  padding: 0;
  width: 1186px;
  border-radius: 12px;
  background-color: #ffffff;
  display: flex;
  flex-wrap: wrap;
}

.hot-sale-title {
  width: 1206px;
  height: 60px;
  margin-bottom: 20px;
  background-color: #F7F9FA;
  border-radius: 12px;
}

.hot-sale-title span {
  color: #111111;
  display: block;
  padding-left: 20px;
  line-height: 60px;
  font-size: 20px;
  font-weight: 1000;
  width: 150px;
}

</style>