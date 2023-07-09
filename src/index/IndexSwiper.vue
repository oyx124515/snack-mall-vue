<template>
  <div class="index-swiper">
    <div class="index-swiper-content">

      <div class="index-swiper-nav">
        <div>休闲小吃</div>
        <div>膨化食品</div>
        <div>豆腐干</div>
        <div>糖果</div>
        <div>饼干</div>
        <div>猪肉类</div>
        <div></div>
        <div></div>

      </div>

      <!-- content 1146 * 410 -->
      <div class="index-swiper-img">
        <a-carousel autoplay>
          <div><img src="../static-test/2.jpg" alt="零食"></div>
          <div><img src="../static-test/2.jpg" alt="零食"></div>
          <div><img src="../static-test/2.jpg" alt="零食"></div>
          <div><img src="../static-test/2.jpg" alt="零食"></div>
        </a-carousel>
      </div>

    </div>

  </div>
</template>

<script setup>

</script>

<style scoped>
/* For demo */
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  width: 800px;
  height: 410px;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide img) {
  width: 800px;
  height: 410px;
}

/* For demo */

.index-swiper {
  margin: 0 auto;
  padding: 20px;
  width: 1186px;
  border-radius: 12px;
  background-color: #ffffff;
  height: 450px;
}

.index-swiper-content {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #42b983;
}

.index-swiper-img {
  width: 800px;
  height: 410px;
  overflow: hidden;
  transform: translateX(346px);
}

.index-swiper-nav {
  position: absolute;
  background-color: #F7F9FA;
  width: 346px;
  height: 410px;
  padding: 5px;
}

.index-swiper-nav div {
  line-height: 45px;
  font-size: 16px;
  box-sizing: border-box;
  height: 45px;
  width: 336px;
  background-color: transparent;
  border-radius: 4px;
  transition: 0.2s;
  border: 1px solid transparent;
}

.index-swiper-nav div:hover {
  border: 1px solid #fa7b04;
  color: #fa7b04;
}

</style>