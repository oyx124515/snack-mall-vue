<template>
  <!--  用户搜索页 -->
  <div style="background-color: #DEDEDD;min-height: 100vh">

    <GoodsHeader></GoodsHeader>

    <div style="margin-top: 20px">
      <SearchResultContent :keywords="props.keywords"></SearchResultContent>
    </div>
  </div>

</template>
<script setup>
import GoodsHeader from '@/GoodsComponents/GoodsHeader.vue'
import SearchResultContent from '@/UserSearch/SearchResultContent.vue'

// eslint-disable-next-line no-undef
const props = defineProps({keywords: String});


</script>
<style></style>