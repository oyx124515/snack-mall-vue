<template>
  <div class="search-container">
    <div class="search-logo">
      <img src="../../public/favicon.png" alt="零食" class="index-img-set">
      <div class="xx-eat">xxx零食</div>
    </div>
    <div class="search-form">
      <form class="top-search-form">
        <label>
          <input v-model="keywords" type="text" placeholder="零食搜索">
          <button type="submit" @click="startSearch">搜索</button>
        </label>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {message} from "ant-design-vue";

const keywords = ref("");
const router = useRouter();

function startSearch() {
  if (keywords.value.trim() === "") {
    message.info("请输入搜索内容");
    return;
  }
  router.push({name: "searchIndex", params: {keywords: keywords.value}})
}


</script>

<style scoped>
.xx-eat {
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  line-height: 40px;
}

.search-container {
  padding: 20px;
  display: flex;
  width: 1186px;
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