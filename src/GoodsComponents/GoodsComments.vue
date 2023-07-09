<template>
  <a-comment v-for="i in items" :key="i.key">
    <!--  评论的组件 指的是一条评论  -->
    <template #author><a>{{ i.nickname }}</a></template>
    <template #avatar>
      <a-avatar :src="BaseImgUrl+i.avatar" alt="用户名"/>
    </template>
    <template #content>
      <p>{{ i.details }}</p>
      <br>
      <a-image
          v-if="i.has_picture"
          :width="200"
          :height="200"
          :src="BaseImgUrl+i.images"
          :fallback="fallImg"
      />
    </template>
    <template #datetime>
      <p><span>发布日期：</span><span>{{ i.create_time }}</span>
        <a-rate :value="i.stars" disabled/>
      </p>

    </template>
  </a-comment>


  <a-pagination
      v-show="total_count>10"
      @change="getComment"
      v-model:current="page" :total="total_count" :pageSize="10"/>

</template>

<script setup>
import imgData from './fallback-png'
import BaseImgUrl from "@/baseImgUrl";
import {inject, onMounted, reactive, ref} from "vue";
import {request} from "@/request";
import {message} from "ant-design-vue";


let inject_id = inject("id");
const props = {id: inject_id};
const page = ref(1);
const total_count = ref(1);
const items = reactive([])

const fallImg = imgData;


function getComment() {
  request({
    url: "/getCommentByID/",
    method: "post",
    data: {id: props.id, page: page.value}
  }).then((resp) => {
        let data = resp.data;
        total_count.value = data.total_count;
        items.length = 0;
        let is = 0;
        data.items.forEach(
            i => {
              items.push({...i, key: is++});
            }
        );
      },
      () => {
        message.error("获取评论消息失败")
      })
}


function onMountedFunc() {
  getComment();
}

onMounted(() => {
  onMountedFunc();
})
</script>

<style scoped>

</style>