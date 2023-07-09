<template>
  <div>
    <a-modal v-model:visible="visible" title="修改密保问题" cancel-text="取消" okText="确认修改" @ok="handleOk">
      <div class="password-setting-content">
        <p>当前密码</p>
        <a-input-password v-model:value="password" placeholder="请输入密码"></a-input-password>
        <p>新的密保问题</p>
        <a-input v-model:value="question" placeholder="请输入新的密保问题"></a-input>
        <p>新的密保问题答案</p>
        <a-input v-model:value="answer" placeholder="请输入问题答案"></a-input>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {message} from "ant-design-vue";
import {request} from "@/request";

const visible = ref(false)

const password = ref("");
const question = ref("");
const answer = ref("");

function handleOk() {

  if (/^\w{6,16}$/.test(password.value) === false) {
    message.error("输入密码不合法");
    return;
  }
  if (question.value.trim() === "" || answer.value.trim() === "") {
    message.error("输入问题不能为空");
    return;
  }
  if (question.value.length > 127 || answer.value.length > 127) {
    message.error("密保问题或答案过长");
    return;
  }
  request(
      {
        url: "/userCheckAnswer/",
        method: "post",
        headers: {token: window.localStorage.getItem("token")},
        data: {
          password: password.value,
          question: question.value,
          answer: answer.value
        }
      }
  ).then(
      (resp) => {
        let data = resp.data;
        if (data.code === 0) {
          message.success("修改密保问题成功");
          password.value = "";
          question.value = "";
          answer.value = "";
          visible.value = false;
        } else {
          message.error(data.message);
        }

      },
      () => message.error("链接服务器失败")
  )


  //userCheckAnswer
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