<template>
  <div class="index-user-func-mode">

    <div class="member-img">
      <a-avatar
          size="large"
          :style="{ backgroundColor: '#f56a00', verticalAlign: 'middle' }"
      >
        {{ nickname[1] }}
      </a-avatar>
      <div class="member-name">
        <span class="show-user-name">Hi! {{ nickname }}</span>
      </div>
    </div>
    <!--    用户信息-->
    <div class="show-user-info">
      <!-- show info box -->
      <div class="show-user-info-box">
        <p class="show-user-info-box-number">{{ unpaid }}</p>
        <a href="">
          <p class="show-user-info-box-title">待付款</p>
        </a>
      </div>
      <!-- show info box end-->
      <!-- show info box  copy -->
      <div class="show-user-info-box">
        <p class="show-user-info-box-number">{{ toBeShipped }}</p>
        <a href="">
          <p class="show-user-info-box-title">待发货</p>
        </a>
      </div>
      <div class="show-user-info-box">
        <p class="show-user-info-box-number">{{ shipped }}</p>
        <a href="">
          <p class="show-user-info-box-title">待收货</p>
        </a>
      </div>
      <div class="show-user-info-box">
        <p class="show-user-info-box-number">{{ waitComment }}</p>
        <a href="">
          <p class="show-user-info-box-title">待评价</p>
        </a>
      </div>

      <!-- show info box  copy end -->

    </div>


  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {request} from "@/request";

const unpaid = ref(0);
const toBeShipped = ref(0);
const shipped = ref(0);
const waitComment = ref(0);
const nickname = ref("请登录")


function mountedFunction() {

  let token = window.localStorage.getItem("token");
  if (!token) {
    return
  }
  request(
      {
        url: "/getOrderSum",
        headers: {token: token}
      }
  ).then(
      (res) => {
        let data = res.data;
        if (data.code === 0) {
          let data_body = data.body
          unpaid.value = data_body.unpaid;
          toBeShipped.value = data_body.toBeShipped;
          shipped.value = data_body.shipped;
          waitComment.value = data_body.waitComment;
          nickname.value = localStorage.getItem("nickname");
        }
      },
      () => {
      }
  )
}

onMounted(
    () => {
      mountedFunction()
    }
)
</script>

<style scoped>
.show-user-name {

  display: block;
  margin-top: 5px;
}

.index-user-func-mode {
  text-align: center;
  border-radius: 12px;
  width: 380px;
  height: 250px;
  background-color: #F7F9FA;
  border: 2px solid transparent;
  transition: 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.index-user-func-mode:hover {
  border: 2px solid #FF4400;
}

.show-user-info {
  width: 100%;
  display: flex;
  justify-content: center;
}

.show-user-info-box {
  margin: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.show-user-info-box-number {
  font-size: 14px;
  font-weight: 800;
  color: #FF4400;
}

.show-user-info-box-title {
  color: #3C3C3C;
  font-size: 12px;
}
</style>