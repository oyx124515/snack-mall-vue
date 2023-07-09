<template>
  <!--  新增地址  -->
  <a-modal v-model:visible="visible" title="新增地址" @ok="handleOk" ok-text="新增" cancel-text="取消">
    <div>
      <div class="title1-div"><span>收件人</span></div>
      <a-input v-model:value="receiver" placeholder="收件人"/>
      <div class="title1-div"><span>电话号码</span></div>
      <a-input v-model:value="telephone" placeholder="电话号码"/>
      <div class="title1-div"><span>收货地址</span></div>
      <a-cascader
          v-model:value="address1"
          :options="options"
      />
      <div class="title1-div"><span>详细收货地址</span></div>
      <a-textarea v-model:value="address2" placeholder="请输入详细收货地址" allow-clear/>
    </div>
  </a-modal>
</template>

<script setup>
import {inject, ref} from "vue";
import option from '@/SignPages/AddressOptions'
import {message} from "ant-design-vue";
import {request} from "@/request";

const visible = ref(false)
const options = option

const receiver = ref("");
const telephone = ref("");
const address1 = ref([])
const address2 = ref("");


const flushAddr = inject("flushAddr")

function flushItems() {
  receiver.value = "";
  telephone.value = "";
  address1.value = [];
  address2.value = "";
}

function handleBlank(val) {
  return val.value.trim() === ""
}

function handleOk() {
  if (handleBlank(receiver) || handleBlank(telephone) || handleBlank(address2)) {
    message.info("输入信息不能为空");
    return;
  }
  if (address1.value.length !== 3) {
    message.info("大致信息不能为空");
    return;
  }
  if (address2.value.length > 128) {
    message.info("详细地址过长");
    return;
  }
  if (receiver.value.length > 63) {
    message.info("收货人姓名过长");
    return;
  }
  if (/^[1][3,4,5,7,8][0-9]{9}$/.test(telephone.value) === false) {
    message.info("电话号码不合法");
    return;
  }
  let address1_log = "";
  address1.value.forEach(e => address1_log += e)
  request(
      {
        url: "/userNewAddr/",
        method: "post",
        headers: {token: window.localStorage.getItem("token")},
        data: {
          receiver: receiver.value,
          telephone: telephone.value,
          address1: address1_log,
          address2: address2.value
        }
      }
  ).then(
      (resp) => {
        let data = resp.data;
        if (data.code === 0) {
          message.success("添加成功");
          flushAddr();
          flushItems();
          visible.value = false;
        }
      },
      () => message.error("链接服务器失败")
  )

}

function handleEdit() {
  visible.value = true
}

// eslint-disable-next-line no-undef
defineExpose({handleEdit})
</script>

<style scoped>
.title1-div {
  margin: 6px 0;
}
</style>