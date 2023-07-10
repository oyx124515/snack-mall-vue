<template>
  <router-view></router-view>
  <!--  <Payment></Payment>-->
</template>

<script setup>
import {onMounted} from "vue"
import {useRouter} from 'vue-router'

const route = useRouter();
onMounted(
    () => {
      route.push({name: "index"})
    }
)
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #6c6c6c;
}
</style>
