<template>
  <div class="PBC-setting-div">
    <div class="left-setting-div">
      <span class="title">基本设置</span>
      <span class="show-select">昵称</span>
      <a-input v-model:value="nickname" placeholder="请输入昵称"/>
      <span class="show-select">邮箱</span>
      <a-input v-model:value="mail" placeholder="请输入邮箱"/>
      <span class="show-select">电话号码</span>
      <a-input v-model:value="telephone" placeholder="请输入电话号码"/>
      <a-button type="primary" style="font-size: 16px"
                @click="handleChange"
      >修改信息
      </a-button>
    </div>
    <div class="right-setting-div">


      <a-col :order="1" :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="show">
          <div class="mask">
            <plus-outlined/>
          </div>
          <img :src="BaseImgUrl+imgSrc" alt="用户头像"/>
          <div class="upload-mask">
            <cloud-upload-outlined/>
          </div>
        </div>

      </a-col>
      <upload-avatar ref="loadAvatar"></upload-avatar>

    </div>

  </div>
</template>

<script setup>
import UploadAvatar from "@/PersonalCenterComponents/BasicSettingComponets/UploadAvatar";
import {PlusOutlined, CloudUploadOutlined} from '@ant-design/icons-vue'
import {onMounted, provide, ref} from "vue";
import {request} from "@/request";
import {message} from "ant-design-vue";
import BaseImgUrl from "@/baseImgUrl";
// 拿到上传图片的对象
const loadAvatar = ref();
const nickname = ref("");
const mail = ref("");
const telephone = ref("")
const imgSrc = ref("")

function show() {
  loadAvatar.value.showEdit()
}

function handleChange() {
  if (nickname.value.trim() === "" || mail.value.trim() === "" || telephone.value.trim() === "") {
    message.info("输入信息不可为空");
    return;
  }
  if (/^[1][3,4,5,7,8][0-9]{9}$/.test(telephone.value) === false) {
    message.info("电话信息格式不正确");
    return;
  }
  if (/^\w{1,}@\w{1,}\.\w{1,}$/.test(mail.value) === false) {
    message.info("邮箱信息格式不正确");
    return;
  }
  if (nickname.value.length > 63) {
    message.info("昵称过长");
    return;
  }
  request({
    url: "/updateUserBaseInfo/",
    method: "post",
    data: {
      nickname: nickname.value,
      mail: mail.value,
      telephone: telephone.value
    },
    headers: {token: window.localStorage.getItem("token")}
  }).then(
      (resp) => {
        let data = resp.data
        if (data.code === 0) {
          message.success("修改成功");
        } else {
          message.error("修改失败");
        }

      },
      () => message.error("无法连接服务器，修改个人信息失败")
  )


}

// 传递事件
let checkImg = function (val) {
  imgSrc.value = val
}
provide("checkImg", checkImg)

function mountedFunc() {
  request(
      {
        url: "/getUserBaseInfo/",
        headers: {token: window.localStorage.getItem("token")}
      }
  ).then(
      (resp) => {
        let data = resp.data;
        nickname.value = data.nickname;
        mail.value = data.mail;
        telephone.value = data.telephone;
        imgSrc.value = data.avatar
      },
      () => message.error("获取用户信息失败")
  )
}

onMounted(() => mountedFunc())
</script>

<style scoped>
.PBC-setting-div {
  padding: 20px;

}

.title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
}

.show-select {
  line-height: 14px;
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85)
}

.PBC-setting-div {
  display: flex;
}

.left-setting-div {
  width: 435px;
}

.right-setting-div {
  margin-left: 70px;
}

/* 上传设置 */
.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 180px;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

}

.ant-upload-preview img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.mask:hover {
  opacity: 0.8;
}

.mask {
  opacity: 0;
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: opacity 0.4s;
  /* logo 居中 */
  width: 180px;
  height: 180px;
  line-height: 180px;
  text-align: center;
  font-size: 40px;
  border-radius: 50%;
}


.upload-mask {
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 20px;
  background-color: rgba(222, 221, 221, 0.7);
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
}
</style>