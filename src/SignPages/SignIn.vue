<template>
  <!--  登录页  -->
  <div class="top-login-nav"
       @click="router.replace({name:'index'})">

    <img class="img-setting" src="../../public/favicon.png" alt="logo">
    <div class="logo-tittle"><span>xxx零食</span></div>
  </div>
  <!--  banner -->
  <div class="login-page-content">
    <p class="content-title-1">XXX零食</p>
    <p class="content-title-2">随时随地,购物轻松</p>
    <div class="login-box">
      <p class="login-box-title">账户登录</p>
      <div class="input-words">
        <user-outlined class="input-words-logo"/>
        <a-input v-model:value="username" placeholder="账户名" style="height: 42px;" autocapitalize="none"/>
      </div>
      <div class="input-words">
        <key-outlined class="input-words-logo"/>
        <a-input-password v-model:value="password" placeholder="请输入登录密码" style="height: 42px"/>
      </div>
      <!--      验证码    -->
      <div class="input-valid">
        <img alt="验证码" @click="updateCode" :src="Base64Str" style="height: 42px;width: 150px;text-align: center">
        <a-input placeholder="请输入验证码" v-model:value="identifyCode" style="height: 42px"/>
      </div>
      <div class="input-valid">
        <a-button @click="trySignIn" type="primary" style="width: 100%">登录</a-button>
      </div>

      <div class="input-another">
        <a @click="router.push({name:'forgetPassword'})">忘记密码?</a>
        <a @click="router.push({name:'signUp'})">免费注册</a>
      </div>
    </div>

  </div>
</template>

<script setup>
import {UserOutlined, KeyOutlined} from '@ant-design/icons-vue';
import {onMounted, ref} from "vue";
import {request} from "@/request";
import {message} from 'ant-design-vue';
import {useRouter} from "vue-router";

const router = useRouter()
const Base64Str = ref("");
// eslint-disable-next-line no-unused-vars
let codeStr = ""
const identifyCode = ref("");
const password = ref("");
const username = ref("");
let isLegal = false;
let unLegalMessage = ""

function frontCheck() {
  // 前端数据验证
  if (username.value.trim() === "" || password.value.trim() === "" || identifyCode.value.trim() === "") {
    unLegalMessage = "用户名/密码/账号/ 输入为空";
    return;
  }
  if (/^\w{4,16}$/.test(username.value) === false) {
    unLegalMessage = "用户名不合法";
    return;
  }
  if (/^\w{6,16}$/.test(password.value) === false) {
    unLegalMessage = "密码不合法";
    return;
  }
  isLegal = true;
}

function trySignIn() {
  frontCheck();
  if (!isLegal) {
    message.error(unLegalMessage);
  } else {
    request(
        {
          method: "POST",
          url: "/signIn/",
          data: {
            username: username.value,
            password: password.value,
            identifyCode: identifyCode.value,
            codeStr: codeStr
          }
        }
    ).then(
        resolve => {
          let data = resolve.data
          if (data.code === 0) {
            window.localStorage.setItem("token", data.token);
            window.localStorage.setItem("auth", data.auth);
            window.localStorage.setItem("username", data.username)
            message.success("登录成功");
            router.replace({name: "index"});
          } else {
            message.error(data.message);
            updateCode();

          }
        },
        () => {
          message.error("服务器开小差了，请稍后重试")
        },
    )
  }

}


function updateCode() {
  request(
      {
        url: "/getGenCode",
      }
  ).then(
      (resolve) => {
        let data = resolve.data;
        codeStr = data.imgString
        Base64Str.value = data.imgBase64
      },
      () => {

      }
  )
}


onMounted(
    () => {
      updateCode();
    }
)
</script>

<style scoped>
.top-login-nav {
  background: #f5f5f5;
  width: 100%;
  height: 88px;
  display: flex;
  align-items: center;
}

.img-setting {
  margin-left: 100px;
  height: 45px;
  width: 45px;
}

.logo-tittle {
  margin: 10px;
  font-size: 20px;
  font-weight: 1000;
}

.login-page-content {

  width: 100%;
  height: 600px;
  overflow: hidden;
  background-image: url("../../public/login-page-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.content-title-1 {
  font-size: 28px;
  color: #ffffff;
  transform: translate(200px, 200px);
  margin: 0;
}

.content-title-2 {
  position: absolute;
  font-size: 20px;
  color: #ffffff;
  transform: translate(200px, 210px);
}

.login-box {
  width: 350px;
  height: 350px;
  padding: 25px;
  background-color: #ffffffe6;
  transform: translate(950px, 60px);
}

.login-box-title {
  font-size: 18px;
  font-weight: 700;
  color: #3C3C3C;
}

.input-words {
  display: flex;
  margin-top: 5px;
}

.input-words-logo {
  width: 42px;
  height: 42px;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}

.input-valid {
  align-content: center;
  display: flex;
  margin-top: 12px;
  vertical-align: middle;
}

.input-another {
  transform: translate(155px, 50px);
}

.input-another a {
  display: inline-block;
  margin-left: 10px;
  font-size: 14px;
}

.input-another a {
  opacity: 0.9;
}
</style>