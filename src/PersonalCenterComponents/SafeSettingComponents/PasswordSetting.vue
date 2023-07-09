<template>
  <div>
    <a-modal v-model:visible="visible" title="修改账户密码" cancel-text="取消" okText="确认修改" @ok="handleOk">
      <div class="password-setting-content">
        <p>原密码</p>
        <a-input-password v-model:value="oldPwd" placeholder="请输入原密码"></a-input-password>
        <p>新密码</p>
        <a-input-password v-model:value="newPwd" placeholder="请输入新密码"></a-input-password>
        <p>二次确认</p>
        <a-input-password v-model:value="re_pwd" placeholder="请二次确认密码"></a-input-password>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {message} from "ant-design-vue";
import {request} from "@/request";

const visible = ref(false)
const oldPwd = ref("");
const newPwd = ref("");
const re_pwd = ref("");

function cleanPwd() {
  oldPwd.value = "";
  newPwd.value = "";
  re_pwd.value = "";
}

function handleOk() {
  if (oldPwd.value.trim() === "" || newPwd.value.trim() === "" || re_pwd.value.trim() === "") {
    message.info("输入不能为空");
    return
  }
  if (newPwd.value !== re_pwd.value) {
    message.info("两次输入的密码不相同");
    return;
  }
  if (newPwd.value === oldPwd.value) {
    message.info("新旧密码不能相同");
    return;
  }
  if (/^\w{6,16}$/.test(oldPwd.value) === false || /^\w{6,16}$/.test(newPwd.value) === false) {
    message.info("输入的密码不合法");
    return;
  }
  request(
      {
        url: "/userCheckPwd/",
        method: "post",
        headers: {token: window.localStorage.getItem("token")},
        data: {new_pwd: newPwd.value, old_pwd: oldPwd.value}
      }
  ).then(
      (resp) => {
        let data = resp.data;
        if (data.code === 0) {
          message.success("修改密码成功");
          cleanPwd();
          visible.value = false;
        } else {
          message.info(data.message);
          cleanPwd();
        }
      },
      () => message.error("服务器异常,修改失败")
  )


}

function handleEdit() {
  visible.value = true
}

// eslint-disable-next-line no-undef
defineExpose({handleEdit})
</script>

<style scoped>
.password-setting-content {

}

.password-setting-content p {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.85);
}
</style>