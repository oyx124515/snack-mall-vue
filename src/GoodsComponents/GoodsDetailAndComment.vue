<template>
  <!--  商品详情 评价/的menu 引入组件 -->
  <div class="good-det-comment-content">
    <div>

      <a-menu v-model:selectedKeys="current" mode="horizontal">
        <a-menu-item key="detail" @click="toDetail">
          商品详情
        </a-menu-item>
        <a-menu-item key="comment" @click="toComment">
          商品评价
        </a-menu-item>
      </a-menu>
      <div>
        <!--      展示为评价还是详情的router view-->
        <!-- <div style="width: 100%;height: 20px;background-color: #1890ff"></div>-->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";


// eslint-disable-next-line no-undef
const props = defineProps({id: String});
const current = ref(["detail"]);
const router = useRouter();

//评价界面

function toComment() {
  router.push({
    name: "goodComment",
    params: {id: props.id}
  });
}

//详情界面
function toDetail() {
  router.push({
    name: "goodsDescribe",
    params: {id: props.id}
  });
}

function onMountedFunc() {
  toDetail();
}

onMounted(
    () => {
      onMountedFunc();
    }
)
</script>

<style scoped>
.good-det-comment-content {
  width: 1186px;
  padding: 20px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 12px;
}
</style>