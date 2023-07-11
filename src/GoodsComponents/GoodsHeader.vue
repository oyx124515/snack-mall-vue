<template>
  <div class="header-content">
    <div class="header-inner-content">
      <div>
        <home-outlined class="home-logo-set"></home-outlined>
        <span class="header-operation" @click="toUserIndex">回到首页</span>
        <span class="header-operation"
              @click="toUserInfoOrSignIn"
        >{{ authNickname }}</span>
      </div>
      <div>
<!--        <span class="header-operation" @click="toShoppingCartIndex">购物车</span>-->
        <span class="header-operation" @click="toUserCollectIndex">收藏夹</span>
      </div>
    </div>
  </div>

</template>

<script setup>
import {HomeOutlined} from '@ant-design/icons-vue'
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {request} from "@/request";
import {message} from "ant-design-vue";

const router = useRouter()

const isAuthed = ref(false);
const authNickname = ref("你好，请登录");

function toUserIndex() {
  router.push({
    name: "index"
  });
}

function toUserInfoOrSignIn() {
  if (isAuthed.value) {
    // 登录成功 去用户页
    router.push({name: "personalCenter"});
  } else {
    // 没有授权 去登录页面
    router.replace({name: "signIn"});
  }
}

function toShoppingCartIndex() {
  if (isAuthed.value) {
    router.push({name: "shoppingCartIndex"});
  } else {
    message.info("请登录后使用");
    toUserInfoOrSignIn();
  }
}

function toUserCollectIndex() {
  if (isAuthed.value) {
    router.push({name: "userCollectIndex"});
  } else {
    message.info("请登录后使用");
    toUserInfoOrSignIn();
  }
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
          window.localStorage.setItem("username", data.username);
          window.localStorage.setItem("nickname", data.nickname);
          window.localStorage.setItem("user_type", data.user_type);
          authNickname.value = data.nickname;
          isAuthed.value = true;
        }
      },
      () => {
        message.error("链接验证服务器失败")
      }
  )


}

onMounted(() => {
  onMountedFunc();
})

</script>

<style scoped>
.header-content {
  width: 100%;
  background-color: #f2f2f2;
}

.header-inner-content {
  margin: 0 auto;
  width: 1226px;
  display: flex;
  justify-content: space-between;
  height: 35px;
}

.home-logo-set {
  color: #ff0036;
  font-size: 14px;
  line-height: 35px;
}

.header-operation {
  display: inline-block;
  font-size: 12px;
  color: #6c6c6c;
  line-height: 35px;
  margin: 2px;
}

.header-operation:hover {
  color: #FF4400;
  cursor: pointer;
}

</style>