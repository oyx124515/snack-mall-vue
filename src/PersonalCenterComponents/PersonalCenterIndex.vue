<template>

  <a-layout>
    <a-layout-header style="background-color: #f5f5f5;height: 64px">
      <!--  header start -->

      <div class="top-nav">
        <div class="top-nav-inside">
          <span>{{ authNickname }}</span>
          <span @click="toIndex">首页</span>
          <span @click="toShoppingCart">购物车</span>
          <span @click="toUserCollect">收藏夹</span>
        </div>
      </div>
      <div class="personal-center-show-margin-div"></div>
      <!--       header end-->
      <a-layout>
        <a-layout-sider style="background: #ffffff">
          <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
            <a-menu-item key="1" @click="toBasicSetting">
              <span>基本设置</span>
            </a-menu-item>
            <a-menu-item key="2" @click="toSafeSetting">
              <span>安全设置</span>
            </a-menu-item>
            <a-menu-item key="3" @click="toReceiveSetting">
              <span>收货地址设置</span>
            </a-menu-item>
          </a-menu>

        </a-layout-sider>
        <a-layout-content style="background: #ffffff">
          <!--          要显示的内容-->
          <router-view></router-view>
          <!--          要显示的内容end-->
        </a-layout-content>
      </a-layout>

    </a-layout-header>
  </a-layout>


</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {request} from "@/request";
import {message} from "ant-design-vue";

const selectedKeys = ref(['1']);
const router = useRouter();
const authNickname = ref("")

function toBasicSetting() {
  router.replace({name: "personalBasicSettings"});
}

function toSafeSetting() {
  router.replace({name: "safeSetting"});
}

function toReceiveSetting() {
  router.replace({name: "personalReceiveAddressSetting"});
}

function toIndex() {
  router.push({name: "index"});
}

function toShoppingCart() {
  router.push({name: "shoppingCartIndex"});
}

function toUserCollect() {
  router.push({name: "userCollectIndex"});
}


function onMountedFunc() {
  const token = window.localStorage.getItem("token");
  if (!token) {
    return;
  }
  request(
      {
        url: "/getAuth/",
        headers: {token: token}
      }
  ).then(
      (resp) => {
        let data = resp.data;
        if (data.isAuthed) {
          authNickname.value = data.nickname;
          toBasicSetting();
        } else {
          toIndex();
        }
      },
      () => {
        message.error("链接验证服务器失败");

      }
  )

}

onMounted(() => onMountedFunc())
</script>

<style scoped>
.top-nav {
  height: 35px;
  width: 100%;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
}

.top-nav-inside {
  width: 1226px;
}

.top-nav-inside span {
  display: inline-block;
  line-height: 35px;
  font-size: 12px;
  margin: 0 12px;
}

.top-nav-inside span:hover {
  cursor: pointer;
  color: #ff5000;
}

.personal-center-show-margin-div {
  width: 100%;
  height: 50px;
}

.ant-layout-sider-children {
  background: transparent;
}

/*top nav end*/
</style>