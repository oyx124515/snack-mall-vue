<template>
  <!--  注册页  -->
  <div class="top-login-nav"
       @click="router.replace({name:'index'})"
  >

    <img class="img-setting" src="../../public/favicon.png" alt="logo">
    <div class="logo-tittle"
    ><span>xxx零食</span></div>
  </div>
  <!--  nav end -->
  <div class="sign-in-form">

    <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
    >
      <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true,
         pattern:'^[a-zA-Z0-9]{4,16}$',
         message: '用户名不合法（任意数字或字母 4-16位）' }]"
      >
        <a-input v-model:value="formState.username"/>
      </a-form-item>

      <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true,
        pattern:'^[a-zA-Z0-9]{4,16}$',
        message: '密码不合法（任意数字或字母 4-16位）' }]"
      >
        <a-input-password v-model:value="formState.password"/>
      </a-form-item>

      <a-form-item
          label="密码（二次验证）"
          name="passwordTwo"
          :rules="[{ required: true,validator:passwordValidator, message: '密码不一致' }]"
      >
        <a-input-password v-model:value="formState.passwordTwo"/>
      </a-form-item>


      <a-form-item
          label="昵称"
          name="nickname"
          :rules="[{ required: true, message: '昵称不可为空' }]">
        <a-input v-model:value="formState.nickname"/>
      </a-form-item>


      <a-form-item
          label="手机号"
          name="telephone"
          :rules="[{ required: true,
         pattern:'^1[3456789][0-9]{9}$',
         message: '手机号不合法' }]"
      >
        <a-input v-model:value="formState.telephone"/>
      </a-form-item>

      <a-form-item
          label="邮箱"
          name="telephone"
          :rules="[{ required: true,
         message: '邮箱不可为空' }]"
      >
        <a-input v-model:value="formState.mail"/>
      </a-form-item>

      <a-form-item
          label="收件人"
          name="receiver"
          :rules="[{ required: true,
         message: '收件人信息不可为空' }]"
      >
        <a-input v-model:value="formState.receiver"/>
      </a-form-item>


      <a-form-item
          label="收货地址"
          :rules="[{ required: true,}]"
      >
        <a-cascader
            v-model:value="address1"
            :options="options"
        />
      </a-form-item>
      <a-form-item
          label="详细收货地址"
          :rules="[{ required: true,}]"
      >
        <a-textarea v-model:value="address2" placeholder="请输入详细收货地址" allow-clear/>
      </a-form-item>
      <a-form-item
          label="密保问题"
          :rules="[{ required: true,}]"
      >
        <a-input v-model:value="formState.question" placeholder="请输入密保问题"/>
      </a-form-item>
      <a-form-item
          label="密保问题答案"
          :rules="[{ required: true,}]"
      >
        <a-textarea placeholder="请输入密保问题答案" v-model:value="formState.answer" allow-clear/>
      </a-form-item>


      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" @click="startSignUp" html-type="submit">注册</a-button>
      </a-form-item>


    </a-form>


  </div>
  {{ address1 }}
</template>

<script setup>
import {reactive, ref,} from "vue";
import option from './AddressOptions'
import {message} from "ant-design-vue";
import {request} from "@/request";
import {router} from "@/router";


const formState = reactive({
  username: '',
  password: '',
  passwordTwo: '',
  telephone: '',
  question: '',
  answer: '',
  nickname: '',
  receiver: '',
  mail: '',
});

const options = option

function passwordValidator() {
  if (formState.password !== formState.passwordTwo) {
    return Promise.reject('两次密码不一致')
  }
  return Promise.resolve()
}

const address1 = ref([]);
const address2 = ref("")

function startSignUp() {
  // 验证
  let keys = Object.keys(formState);
  let isBlank = false
  keys.forEach(e => {
    if (formState[e].trim() === "") {
      isBlank = true;
    }
  })
  if (isBlank) {
    message.error("确保所有项目全部输入")
    return;
  }

  if (/^\w{4,16}$/.test(formState.username) === false) {
    message.error("用户名不合法")
    return
  }
  if (/^\w{6,16}$/.test(formState.password) === false) {
    message.error("密码不合法");
    return;
  }
  if (formState.password !== formState.passwordTwo) {
    message.error("两次输入的密码不相同");
    return;
  }
  if (formState.nickname.length > 16) {
    message.error("昵称过长");
    return;
  }
  if (/^\w{4,16}$/.test(formState.telephone) === false) {
    message.error("电话号码不符合格式");
    return;
  }
  if (address1.value.length !== 3) {
    message.error("请输入地址");
    return;
  }
  if (/^\w+@\w+\.\w+$/.test(formState.mail) === false) {
    message.error("邮箱不合法")
    return
  }
  if (formState.receiver.length > 64) {
    message.error("收货人信息过长");
    return;
  }


  if (address2.value.length > 100) {
    message.error("详细地址过长");
    return;
  }
  if (formState.question.length > 64) {
    message.error("密保问题过长");
    return;
  }
  if (formState.answer.length > 100) {
    message.error("密保答案过长");
    return;
  }
  if (formState.answer.includes(" ") === true) {
    message.error("密保答案不可包含特别字符");
    return;
  }
// 验证end
  let showAddress = "";
  address1.value.forEach(e => showAddress += e)
  let data = {
    ...formState,
    address1: showAddress,
    address2: address2.value
  }
  console.log(data)
  request(
      {
        url: "/signUp/",
        method: "post",
        data: data
      }
  ).then(
      res => {
        let data = res.data;
        if (data.code === 0) {
          message.success("注册成功");
          router.replace({name: "signIn"});
        } else {
          message.error(data.message)
        }

      },
      () => {
        message.error("服务器开小差了，稍后重试")
      }
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

.sign-in-form {
  width: 1226px;

  margin: 20px auto 0;
}
</style>