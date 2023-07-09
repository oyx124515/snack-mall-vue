<template>
  <a-list bordered :data-source="table_data">


    <template #renderItem="{ item }">
      <a-list-item>
        <div class="addr-items">
          <div class="item-name">{{ item.address1 }}-{{ item.address2 }}-{{ item.receiver }}</div>
          <div class="item-operation">
            <a-button type="primary" @click="invokeEditAddr(item)">修改地址</a-button>
            <a-button type="dashed">设置为默认地址</a-button>
            <a-button type="danger">删除地址</a-button>
          </div>
        </div>
      </a-list-item>
    </template>


    <template #header>
      <div class="header-title">收货地址管理</div>
      <div class="default-re-content">
        <div class="default-re-title"><span>默认收货地址</span>
          <a-button type="primary" @click="invokeNewAddr">添加新的收获地址</a-button>
        </div>
        <div class="default-re-detail">
          <span>
            {{ defaultData.address1 }}-{{ defaultData.address2 }}-{{ defaultData.receiver }}
          </span>
          <a-button style="float: right;font-size: 12px;height: 28px" type="primary"
                    @click="invokeEditAddr(defaultData)"
          >修改地址
          </a-button>
        </div>
      </div>
    </template>


    <template #footer>
    </template>


  </a-list>


  <!--  option operate -->
  <edit-address ref="editAddr"></edit-address>
  <new-address ref="newAddr"></new-address>
  <!--  -->
</template>

<script setup>
import NewAddress from '@/PersonalCenterComponents/AddressModal/NewAddress.vue'
import EditAddress from '@/PersonalCenterComponents/AddressModal/EditAddress'
import {onMounted, provide, reactive, ref} from "vue";
import {request} from "@/request";
import {message} from "ant-design-vue";

const table_data = reactive([
  "dsa"
])
const defaultData = ref(
    {});

function flushAddr() {
  request({
    url: "/getUserReceiveList/",
    headers: {token: window.localStorage.getItem("token")}
  }).then(
      (resp) => {
        let data = resp.data;
        table_data.length = 0;
        data.forEach(item => {
          if (!item.is_default) {
            table_data.push(item)
          } else {
            defaultData.value = item;
          }
        })
      },
      () => message.error("获取收货地址失败,无法连接到服务器")
  )
}

provide("flushAddr", flushAddr)

const newAddr = ref()

function invokeNewAddr() {
  newAddr.value.handleEdit();
}

const editAddr = ref();

function invokeEditAddr(item) {
  editAddr.value.handleEdit(item);
}


function onMountedFunc() {
  flushAddr();
}

onMounted(() => onMountedFunc())
</script>

<style scoped>
.receive-addr-set-content {
  padding: 20px;
  min-width: 800px;
}

.header-title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
}

.addr-items {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.item-operation button {
  display: inline-block;
  margin: 0 6px;
}

.default-re-content {
  margin: 12px;
  border: 2px solid rgb(240, 240, 240);
  border-radius: 2px;
}

.default-re-title {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 2px solid rgb(240, 240, 240);
  font-size: 20px;
  color: #000000D9;
}

.default-re-detail {
  padding: 12px;
  color: #00000073;
}
</style>