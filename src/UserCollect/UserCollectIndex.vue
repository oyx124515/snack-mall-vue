<template>
  <!--用户收藏 -->
  <div class="user-collect-index">
    <goods-header></goods-header>


    <div style="margin-top: 20px">
      <div class="user-collect-title">
        <span style="font-size: 20px;font-weight: 400">我的收藏</span>
      </div>
    </div>
    <div style="margin-top: 20px">
      <div class="user-collect-content">
        <template v-for="i in favList" :key=i>
          <UserCollectItem :id="i"></UserCollectItem>
        </template>
      </div>
    </div>

  </div>
</template>

<script setup>
import GoodsHeader from '@/GoodsComponents/GoodsHeader.vue'
import UserCollectItem from '@/UserCollect/UserCollectItem.vue'
import {inject, onMounted, provide, reactive} from "vue";
import {request} from "@/request";
import {message} from "ant-design-vue";

const favList = reactive([])

function loadList() {
  favList.length = 0;
  request({
    url: "/getFavList/",
    method: "post",
    headers: {token: window.localStorage.getItem("token")}
  }).then((resp) => {
        let data = resp.data;
        console.log(data);
        data.body.forEach(tar => favList.push(tar))
      }, () => message.error("获取信息失败")
  )
}

provide("reload", loadList)

function mounted() {
  loadList();
}

onMounted(
    () => mounted()
)
</script>


<style scoped>
.user-collect-index {
  background-color: #DEDEDD;
  min-height: 100vh;
}

.user-collect-title {
  background-color: #ffffff;
  border-radius: 12px;
  width: 1206px;
  padding: 10px;
  margin: 0 auto;
}

.user-collect-content {
  width: 1206px;
  padding: 10px;
  border-radius: 12px;
  background-color: #ffffff;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
</style>