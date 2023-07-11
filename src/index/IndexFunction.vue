<template>

  <!-- 功能模块 -->
  <div class="index-function-model">
    <!--    用户信息展示-->
    <index-user-info @click="toUserOperationIndex"></index-user-info>
    <index-user-func></index-user-func>
    <look-for-all @click="startSearch"></look-for-all>
  </div>

</template>

<script setup>
import IndexUserInfo from '@/index/index-function-vue/IndexUserInfo'
import IndexUserFunc from '@/index/index-function-vue/IndexUserFunc'
import LookForAll from '@/index/index-function-vue/LookForAll'
import {useRouter} from "vue-router";

const router = useRouter();

function startSearch() {
  router.push({name: "searchIndex", params: {keywords: "no-def"}})
}

function toUserOperationIndex() {
  router.push({name: "userOperationIndex"});
}
</script>

<style scoped>
.show-back {
  width: 100%;
  height: 100%;
  background-color: #42b983;
  display: flex;
  justify-content: space-evenly;
}

.index-function-model {
  background-color: #ffffff;
  margin: 0 auto;
  padding: 20px;
  width: 1186px;
  border-radius: 12px;
  display: flex;
  justify-content: space-evenly;
}
</style>