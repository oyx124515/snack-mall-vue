<template>
  <div class="index-swiper">
    <div class="index-swiper-content">

      <div class="index-swiper-nav">
        <div v-for="i in searchKey" :key="i" @click="toSearch(i)">{{ i }}</div>


      </div>

      <!-- content 1146 * 410 -->
      <div class="index-swiper-img">
        <a-carousel autoplay>

          <div v-for="i in swiperList" :key="i.spu" @click="toDetail(i.spu)">
            <img :src="BaseImgUrl+i.img" alt="零食">
          </div>
        </a-carousel>
      </div>

    </div>

  </div>
</template>

<script setup>
import BaseImgUrl from "@/baseImgUrl";
import {onMounted, reactive} from "vue";
import {request} from "@/request";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";

const router = useRouter();

const swiperList = reactive([
  {img: "", spu: ""}
])

const searchKey = reactive(["网红小零食", "湖南特产", "猪肉干"]);

function toSearch(keywords) {
  router.push({
    name: "searchIndex",
    params: {keywords: keywords}
  })
}


function toDetail(val) {
  router.push({
    name: "goodsDetailPage",
    params: {id: val}
  })
}

onMounted(
    () => {
      request({
        url: "/bannerView/",
        method: "get"
      }).then(
          (resp) => {

            let data = resp.data;
            swiperList.length = 0;
            data.forEach(tar => swiperList.push(tar))
          },
          () => message.error("链接服务器失败")
      )
    }
)
</script>

<style scoped>
/* For demo */
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  width: 800px;
  height: 410px;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide img) {
  width: 800px;
  height: 410px;
}

/* For demo */

.index-swiper {
  margin: 0 auto;
  padding: 20px;
  width: 1186px;
  border-radius: 12px;
  background-color: #ffffff;
  height: 450px;
}

.index-swiper-content {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #42b983;
}

.index-swiper-img {
  width: 800px;
  height: 410px;
  overflow: hidden;
  transform: translateX(346px);
}

.index-swiper-nav {
  position: absolute;
  background-color: #F7F9FA;
  width: 346px;
  height: 410px;
  padding: 5px;
}

.index-swiper-nav div {
  line-height: 45px;
  font-size: 16px;
  box-sizing: border-box;
  height: 45px;
  width: 336px;
  background-color: transparent;
  border-radius: 4px;
  transition: 0.2s;
  border: 1px solid transparent;
}

.index-swiper-nav div:hover {
  border: 1px solid #fa7b04;
  color: #fa7b04;
}

</style>