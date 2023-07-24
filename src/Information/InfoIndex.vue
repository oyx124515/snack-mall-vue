<template>
  <!--  咨询主页-->
  <div class="info-index-bg">
    <GoodsHeader></GoodsHeader>
    <div class="table-data">
      <a-list size="middle" :data-source="public_coupon" bordered>
        <template #renderItem="{ item }">
          <a-list-item @click="handleOpen(item)">
            <span class="title-span">
             {{ item.title }}
            </span>
          </a-list-item>
        </template>

        <template #header>
          <h3 style="font-size: 20px;color: #FF4400">资讯</h3>
        </template>

      </a-list>
    </div>
  </div>
  <!--  打开框 -->
  <a-modal v-model:visible="open" :title="show_message.title" width="1000px" footer="">
    <div v-html="show_message.text"></div>
    <!--展示的商品信息-->
    <div class="spu-info" @click="toSkuDetail">
      <div style="display: flex">

        <div>
          <a-image :src="BaseImgUrl + sku_info.cover" width="80px"></a-image>
        </div>
        <div>
          <p style="margin-left: 20px;color: #FF4400;font-weight: 800">{{ sku_info.name }}</p>
          <p style="margin-left: 20px;">价格：<span style="color: #FF4400">{{ sku_info.starting_price }}￥</span></p>
        </div>
      </div>
    </div>
  </a-modal>
  <!--  -->

</template>

<script setup>
import GoodsHeader from '@/GoodsComponents/GoodsHeader.vue'
import {onMounted, reactive, ref} from "vue";
import {request} from "@/request";
import BaseImgUrl from "@/baseImgUrl";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";

const public_coupon = reactive([
  {title: "的时间的房价是否释放定金客户", id: "5451546646"},
  {title: "的时间的房价是否释放定金客户", id: "5451546646"},
  {title: "的时间的房价是否释放定金客户", id: "5451546646"},
  {title: "的时间的房价是否释放定金客户", id: "5451546646"},
])

const sku_info = reactive({
  name: "",
  cover: "",
  starting_price: "",
  collect_number: "",
})

const show_message = reactive({
  title: "show-title",
  text: "<p>hello hello hello hello hello</p>",
  to_spu: "203712618576216064",
})

// 跳转到详情界面
const router = useRouter()

// 去商品详情
function toSkuDetail() {
  router.push({
    name: "goodsDetailPage",
    params: {id: show_message.to_spu}
  })
}

const open = ref(false);

// 打开资讯的详情
function handleOpen(item) {
  console.log(item);
  request({
    url: "/getRecommendInfo/",
    method: "post",
    data: {id: item.id}
  }).then(
      (resp) => {
        let data = resp.data;
        show_message.title = data.body.title;
        show_message.text = data.body.text;
        show_message.to_spu = data.body.to_spu;
        getSkuInfo();

      },
      () => {

      }
  )

}


// 获取sku信息以便于点击和展示
function getSkuInfo() {
  request(
      {
        url: "/getSaleCovers/",
        method: "post",
        data: {id: show_message.to_spu},
      }
  ).then(
      (resp) => {
        let data = resp.data;
        sku_info.name = data.body.name;
        sku_info.cover = data.body.cover;
        sku_info.starting_price = data.body.starting_price;
        sku_info.collect_number = data.body.collect_number;
        open.value = true;
      },
      () => {
      }
  )
}


function getSimpleRecommendInfo() {
  public_coupon.length = 0
  request({
    url: "/getSimpleRecommendInfo/",
    method: "get"
  }).then(
      (resp) => {
        let data = resp.data;
        data.body.forEach(tar => public_coupon.push(tar))
      },
      () => message.error("获取资讯消息失败")
  )
}

function mountedFunc() {
  getSimpleRecommendInfo();
}

onMounted(() => mountedFunc());


</script>

<style scoped>
.spu-info {
  border: 1px solid transparent;
  height: 100px;
  width: 900px;
  padding: 10px;
  margin: 20px auto 0;
  background-color: #F7F9FA;
}

.spu-info:hover {
  border: 1px solid #FF4400;

}

.info-index-bg {
  min-height: 100vh;
  background-color: #DEDEDD;
}

.table-data {
  margin: 30px auto 0;
  width: 1226px;
  border-radius: 12px;
  background-color: #ffffff;
}

.title-span:hover {
  color: #FF4400;
  cursor: pointer;
}
</style>