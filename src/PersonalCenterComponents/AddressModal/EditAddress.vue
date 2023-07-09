<template>
  <!--  修改地址  -->
  <a-modal v-model:visible="visible" title="修改地址" @ok="handleOk" ok-text="修改" cancel-text="取消">
    <div>
      <div class="title1-div"><span>收件人</span></div>
      <a-input v-model:value="formData.receiver" placeholder="收件人"/>
      <div class="title1-div"><span>电话号码</span></div>
      <a-input v-model:value="formData.telephone" placeholder="电话号码"/>
      <div class="title1-div"><span>收货地址</span></div>
      <a-cascader
          v-model:value="formData.address1"
          :options="options"
      />
      <div class="title1-div"><span>详细收货地址</span></div>
      <a-textarea placeholder="请输入详细收货地址"
                  v-model:value="formData.address2"
                  allow-clear/>
    </div>
  </a-modal>
</template>

<script setup>
import {inject, reactive, ref} from "vue";
import option from '@/SignPages/AddressOptions'
import {message} from "ant-design-vue";
import {request} from "@/request";

const visible = ref(false)
const options = option
const formData = reactive({
  id: "",
  receiver: "",
  telephone: "",
  address1: "",
  address2: ""
})

function flushItems() {
  formData.id = "";
  formData.receiver = "";
  formData.telephone = "";
  formData.address1 = [];
  formData.address2 = "";
}

function handleBlank(val) {
  return val.trim() === ""
}

const flushAddr = inject("flushAddr")

function handleOk() {
  if (handleBlank(formData.receiver) || handleBlank(formData.telephone) || handleBlank(formData.address2)) {
    message.info("输入信息不能为空");
    return;
  }
  if (Array.isArray(formData.address1)) {
    if (formData.address1.length !== 3) {
      message.info("大致信息不能为空");
      return;
    }
  }

  if (formData.address2.length > 128) {
    message.info("详细地址过长");
    return;
  }
  if (formData.receiver.length > 63) {
    message.info("收货人姓名过长");
    return;
  }
  if (/^[1][3,4,5,7,8][0-9]{9}$/.test(formData.telephone) === false) {
    message.info("电话号码不合法");
    return;
  }
  let format_add1 = "";
  if (Array.isArray(formData.address1)) {
    formData.address1.forEach(e => format_add1 += e)
  } else {
    format_add1 = formData.address1;
  }
  request(
      {
        url: "/userEditAddr/",
        method: "post",
        headers: {token: window.localStorage.getItem("token")},
        data: {...formData, address1: format_add1}
      }
  ).then(
      (resp) => {
        let data = resp.data;
        if (data.code === 0) {
          message.success("修改地址成功");
          flushAddr();
          visible.value = false;
        }
      },
      () => message.error("修改失败,无法连接到服务器")
  )
}


function handleEdit(item) {
  flushItems();
  visible.value = true;
  console.log(item);
  let keys = Object.keys(item);
  keys.forEach(
      tar => formData[tar] = item[tar]
  )
}

// eslint-disable-next-line no-undef
defineExpose({handleEdit})
</script>

<style scoped>
.title1-div {
  margin: 6px 0;
}
</style>