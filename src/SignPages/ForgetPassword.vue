<template>
  <div class="top-login-nav">
    <img class="img-setting" src="../../public/favicon.png" alt="logo">
    <div class="logo-tittle"><span>xxx零食</span></div>
  </div>
  <!--  banner -->
  <div class="login-page-content">
    <p class="content-title-1">XXX零食</p>
    <p class="content-title-2">随时随地,购物轻松</p>
    <!--    内部内容   -->
    <div class="content-findPwd">
      <p class="login-box-title">找回密码</p>
      <div class="input-words">
        <user-outlined class="input-words-logo"/>
        <a-input placeholder="请输入你的账户名" v-model:value="username" style="height: 42px;" autocapitalize="none"/>
      </div>
      <div class="search-div">
        <a-button @click="getSecurityQuestion" type="primary" style="width: 100%;">查询账户</a-button>
      </div>


    </div>

  </div>


  <!--  通知框架 -->
  <div>

    <a-modal v-model:visible="visible" title="Basic Modal" ok-text="确认"
             cancel-text="取消" @ok="handleOk">
      <p><span>用户名:</span><span>{{ username }}</span></p>
      <p><span>{{ question }}</span>
      </p>
      <hr>
      <div class="text-class-forget-pwd">
        <a-input v-model:value="answer" placeholder="请输入密保问题的答案"/>
      </div>
      <div class="text-class-forget-pwd">
        <a-input-password v-model:value="new_pwd" placeholder="请输入新的密码"/>
      </div>
      <div class="text-class-forget-pwd">
        <a-input-password v-model:value="re_pwd" placeholder="请再次输入密码"/>
      </div>


    </a-modal>
  </div>
  <a-button type="primary" @click="visible=true">打开</a-button>
</template>

<script setup>
import {UserOutlined,} from '@ant-design/icons-vue'
import {ref} from "vue";
import {request} from "@/request";
import {message} from "ant-design-vue";
import {router} from "@/router";

const visible = ref(false);
const question = ref("");
const username = ref("");
const answer = ref("");
const new_pwd = ref("");
const re_pwd = ref("");

function getSecurityQuestion() {
  if (username.value.trim() === "") {
    message.error("请输入用户名");
    return;
  }
  if (/^\w{4,16}$/.test(username.value) === false) {
    message.error("用户名不合法")
    return;
  }


  request({
    url: "/getSecurityQuestion",
    method: "post",
    data: {
      username: username.value
    }
  }).then(
      res => {
        let data = res.data;
        if (data.code === 0) {
          question.value = data.message;
          visible.value = true;
        } else {
          message.error("不存在的用户");
        }

      },
      () => {
      }
  )
}


function handleOk() {
  if (answer.value.trim() === "" || new_pwd.value.trim() === "" || re_pwd.value.trim() === "") {
    message.error("输入为空");
    answer.value = "";
    new_pwd.value = "";
    re_pwd.value = "";
    username.value = "";
    visible.value = false;
    return;
  }
  if (/^\w{6,16}$/.test(new_pwd.value) === false) {
    message.error("密码不合法");
    return;
  }
  if (new_pwd.value !== re_pwd.value) {
    message.error("两次输入的密码不相同");
    return;
  }
  request(
      {
        url: "/resetPwdByQuestion/",
        method: "post",
        data: {
          username: username.value,
          answer: answer.value,
          new_pwd: new_pwd.value
        }
      }
  ).then(
      res => {
        let data = res.data;
        if (data.code === 0) {
          message.success("更改密码成功");
          router.push({name: "signIn"})
        } else {
          message.error("修改密码失败");
          answer.value = "";
          new_pwd.value = "";
          re_pwd.value = "";
          username.value = "";
          visible.value = false;
        }

      },
      () => {
      },
  )
}
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

/* top end */

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

.content-findPwd {
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

.search-div {

  line-height: 32px;
  font-size: 18px;
  margin-top: 20px;
}

.text-class-forget-pwd {
  margin-top: 12px;
  margin-bottom: 12px;
}

/* back end */
</style>