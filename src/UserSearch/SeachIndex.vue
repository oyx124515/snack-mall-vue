<template>
  <!--  用户搜索页 -->
  <div style="background-color: #DEDEDD">

    <GoodsHeader></GoodsHeader>
    <div style="margin-top: 20px">
      <SearchInputContainer></SearchInputContainer>

    </div>
    <div style="margin-top: 20px">
      <SearchResultContent></SearchResultContent>
    </div>
  </div>

</template>
<script setup>
import GoodsHeader from '@/GoodsComponents/GoodsHeader.vue'
import SearchInputContainer from '@/UserSearch/SearchInputContainer.vue'
import SearchResultContent from '@/UserSearch/SearchResultContent.vue'
</script>
<style></style>