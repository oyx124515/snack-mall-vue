<template>
  <!-- 商品详情说明的html界面 -->
  <div class="data-show">
    <div v-html="des_data">
    </div>
  </div>

</template>
<script setup>


import {inject, onMounted, ref} from "vue";
import {request} from "@/request";
import {message} from "ant-design-vue";

// eslint-disable-next-line no-undef


let inject_id = inject("id");
const props = {id: inject_id}
const des_data = ref("")

function onMountedFunc() {
  request({
    method: "POST",
    url: "/getSpuDescribe/",
    data: {id: props.id},
  }).then(
      (resp) => {
        let data = resp.data;
        des_data.value = data;

      },
      () => {
        message.error("获取商品详情失败")
      },
  )

}

onMounted(() => {

  onMountedFunc()
})
</script>
<style scoped>
.data-show {
  padding: 20px;
  width: 100%;
}

.data-show img {
  width: 100% !important;
}
</style>