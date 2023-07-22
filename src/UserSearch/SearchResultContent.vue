<template>
  <div style="margin-top: 20px">
    <div class="search-container">
      <div class="search-logo">
        <img src="../../public/favicon.png" alt="零食" class="index-img-set">
        <div class="xx-eat">xxx零食</div>
      </div>
      <div class="search-form">
        <form class="top-search-form">
          <label>
            <input v-model="keywords" type="text" placeholder="零食搜索">
            <button type="submit" @click="flushData">搜索</button>
          </label>
        </form>
      </div>
    </div>
  </div>
  <div class="search-result-out">

    <a-menu v-model:selectedKeys="current" mode="horizontal">
      <a-menu-item key="mail">
        综合排序
      </a-menu-item>
      <a-menu-item key="a">
        销量
      </a-menu-item>
      <a-menu-item key="c">
        价格从低到高
      </a-menu-item>
      <a-menu-item key="w">
        价格从高到低
      </a-menu-item>
      <!--      -->

      <!--      -->
    </a-menu>
    <br>
    <div>
      <span style="display: inline-block;margin-left: 10px">价格区间：</span>
      <a-input-number v-model:value.lazy.number="priceStart" addon-before="￥" :min="1"></a-input-number>
      <span style="display: inline-block;margin: 0 12px">-</span>
      <a-input-number v-model:value.lazy.number="priceEnd" addon-before="￥" :min="priceStart"></a-input-number>
      <a-button type="primary" style="margin-left: 12px">确定</a-button>
    </div>
    <br>
    <div class="search-item-list">
      <SalesItem v-for="i in showData" :key="i" :id="i" @click="toDetail(i)"></SalesItem>


    </div>
  </div>

</template>

<script setup>

import {onMounted, reactive, ref} from "vue";
import SalesItem from '@/components/SalesItem'
import {request} from "@/request";
import {message} from "ant-design-vue";
import {router} from "@/router";

const current = ref(['mail'])

// eslint-disable-next-line no-undef
const props = defineProps({keywords: String})
const keywords = ref("")

const showData = reactive([])


function toDetail(id) {
  router.push({name: "goodsDetailPage", params: {id: id}})
}

function flushData() {

  request({
    url: "/searchView/",
    method: "post",
    data: {keywords: keywords.value},
    headers: {token: window.localStorage.getItem("token")}
  }).then(
      (resp) => {
        showData.length = 0;
        let data = resp.data;
        console.log("搜索信息", data)
        data.forEach(tar => showData.push(tar));
      },
      () => message.error("获取消息失败")
  )
}

onMounted(
    () => {
      if (props.keywords === "no-def") {
        keywords.value = "";
      } else {
        keywords.value = props.keywords;
      }

      flushData();
    }
)
</script>
<style scoped>
.search-result-out {
  width: 1226px;
  padding: 10px;
  margin: 20px auto 0;
  background-color: #ffffff;
  border-radius: 12px;
  box-sizing: border-box;
}

.search-item-list {
  display: flex;
  flex-wrap: wrap;
}

.xx-eat {
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  line-height: 40px;
}

.search-container {
  width: 1226px;
  padding: 20px;
  display: flex;
  box-sizing: border-box;
  margin: 0 auto;
  align-items: center;
  justify-content: space-evenly;
  background-color: #ffffff;
  border-radius: 12px;
}

.top-search-form input {
  height: 38px;
  width: 384px;
  border: 0;
  outline: 0;
}

.top-search-form {
  padding: 4px;
  border: 2px solid #FF4400;
  border-radius: 12px;
}

.top-search-form button {
  background-image: linear-gradient(145deg, #ff9000, #ff5000 77%);
  width: 72px;
  height: 38px;
  border-radius: 12px;
  border: 0;
  color: #ffffff;
}

.top-search-form button:hover {
  opacity: 0.9;
}

.top-search-form button:active {
  opacity: 0.7;
}

.search-logo {
  height: 40px;
  align-items: center;
  display: flex;
}

.index-img-set {
  width: 40px;
}
</style>