<template>
  <!--  主页-->
  <div style="background-color: #DEDEDD">

    <goods-header></goods-header>
    <div style="margin-top: 20px">
      <good-content :id="props.id"></good-content>
    </div>
    <div style="margin-top: 20px">
      <goods-detail-and-comment :id="props.id"></goods-detail-and-comment>
    </div>
  </div>
</template>

<script setup>
import GoodsHeader from '@/GoodsComponents/GoodsHeader.vue'
import GoodContent from '@/GoodsComponents/GoodContent.vue'
import GoodsDetailAndComment from '@/GoodsComponents/GoodsDetailAndComment.vue'
import {onMounted, provide} from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  id: String
})
provide("id", props.id)

function oonMountedFunc() {
}

onMounted(
    () => {
      oonMountedFunc();
    }
)


</script>

<style scoped>


</style>