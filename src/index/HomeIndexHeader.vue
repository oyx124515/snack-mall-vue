<template>
  <!-- 导航头条 -->
  <div class="top">
    <div class="top-inside">
      <div class="top-title">

        <span>xxx零食</span>
      </div>

      <div class="login-bar">
        <a style="color: #f22e00;" @click="toUserInfoOrSignIn">{{ authUsername }}</a>


        <template v-if="!isAuth">
          <span>|</span>
          <a @click="toSignUp">免费注册</a>
        </template>
        <span>|</span>
<!--        <a @click="toShoppingCartIndex">购物车</a>-->
<!--        <span>|</span>-->
        <a @click="toUserCollectIndex">收藏夹</a>

        <template v-if="isAuth">
          <span>|</span>
          <a @click="signOut">注销登录</a>
        </template>


      </div>

    </div>
  </div>
  <!-- 导航头条END -->
</template>

<script setup>
import {onMounted, ref} from "vue";
import {request} from "@/request";
import {useRouter} from "vue-router";
import {message} from 'ant-design-vue';

const router = useRouter()
const authUsername = ref("你好，请登录")
const isAuth = ref(false)

function toUserInfoOrSignIn() {
  if (isAuth.value) {
    // 登录成功 去用户页
    router.replace({name: "personalCenter"});
  } else {
    // 没有授权 去登录页面
    router.replace({name: "signIn"});
  }
}

function toShoppingCartIndex() {
  if (isAuth.value) {
    router.replace({name: "shoppingCartIndex"});
  } else {
    message.info("请登录后使用");
    toUserInfoOrSignIn();
  }
}

function toUserCollectIndex() {
  if (isAuth.value) {
    router.push({name: "userCollectIndex"});
  } else {
    message.info("请登录后使用");
    toUserInfoOrSignIn();
  }
}

function signOut() {
  request({
    url: "/signOut",
    headers: {token: window.localStorage.getItem("token")}
  }).then(
      res => {
        let data = res.data;
        console.log(data)
        if (data.code === 0) {
          message.success("登出成功");
          authUsername.value = "你好，请登录";
          cleanStorage();
          isAuth.value = false;
        } else {
          message.error("登出失败")
        }
      },
      () => {
        message.error("服务器繁忙，登出失败");
      }
  )
}

function cleanStorage() {
  window.localStorage.clear();
}

function toSignUp() {
  router.replace({name: "signUp"});
}

function onMountedFunc() {
  let token = window.localStorage.getItem("token");
  if (token == null) {
    return
  }
  request(
      {
        url: "/getAuth/",
        headers: {
          "token": token
        }
      }
  ).then(
      (resolve) => {
        let data = resolve.data;
        if (data.isAuthed) {
          isAuth.value = true;
          window.localStorage.setItem("username", data.username);
          window.localStorage.setItem("nickname", data.nickname);
          window.localStorage.setItem("user_type", data.user_type);
          authUsername.value = data.nickname;
        } else {
          message.error("身份信息已过期,请重新登陆")
          cleanStorage()
        }


      },
      () => {
        message.error("链接验证服务器失败");
      }
  )
}


onMounted(() => {
  onMountedFunc();
})
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
}

a {
  color: #6c6c6c;
  text-decoration: none;
}

/* 导航头条 */
.top {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  height: 48px;
}

.top-inside {
  padding: 0 8px;
  font-size: 17px;
  line-height: 48px;
  width: 1226px;
  background-color: transparent
}

.top-title {
  float: left;
  width: 200px;
}

.login-bar {
  float: right;
}

.login-bar span {
  display: inline-block;
  padding: 0 5px;
}

.login-bar a:hover {
  color: #FF4400;
}

/* 导航头条end */
</style>