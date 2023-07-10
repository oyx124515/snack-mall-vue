<template>
  <table class="item-basic-table">
    <thead class="item-thead">
    <tr>
      <td>
        <span class="item-date">2023-06-06</span>
        <span class="order-id">订单号:</span>
        <span class="order-id">3382408657759452523</span>
      </td>
      <td class="item-basic-width">单价</td>
      <td class="item-basic-width">数量</td>
      <td class="item-basic-width">实际付款</td>
      <td class="item-basic-width"></td>
      <td class="item-basic-width"></td>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td class="item-detail-td">
        <div class="item-detail">
          <div class="item-detail-img">
            <img src="../../static-test/hot-sales.webp" alt="">
          </div>
          <div class="item-detail-words">
            <div class="item-detail-title">
              <span>idea正版激活码2022/2023pycharm专业版永久激活clion webstorm[交易快照]</span>
            </div>
            <div class="item-detail-class">
              <span>选择激活：一键激活【永久】</span>
            </div>
            <div class="item-detail-time">

            </div>
            <div class="item-detail-time">

            </div>
          </div>
        </div>
      </td>
      <td class="item-basic-width">
        <div class="item-price">
          <span>￥</span><span>2.69</span>
        </div>
      </td>
      <td class="item-basic-width">
        <div>1</div>
      </td>
      <td class="item-basic-width">
        <div class="item-price">
          <span>￥</span><span>2.69</span>
        </div>
      </td>

      <td class="item-basic-width">
        <button>operation</button>
      </td>
    </tr>
    </tbody>

  </table>
</template>

<script setup>


</script>

<style scoped>
.item-basic-table {
  border-collapse: collapse;
  font-size: 12px;
  width: 1069px;
  height: 180px;
  background-color: rgb(247, 249, 250);
  border: 2px solid transparent;
  transition: 0.2s;
}

.item-basic-table:hover {
  border: 2px solid #1890ff;
}

.item-thead {
  height: 43px;
  color: #3c3c3c;
  background-color: rgb(241, 241, 241);
}

.item-detail-td {
  width: 406px;
}

.item-detail {
  display: flex;
  justify-content: space-evenly;
}

.item-date {
  display: inline-block;
  margin-left: 12px;
  margin-right: 12px;
  font-size: 12px;
  font-weight: 700;
}

.order-id {
  font-size: 12px;
  font-weight: 400;
}

.item-detail-img {
  margin-top: 20px;
  display: inline-block;
}

.item-detail-img img {
  width: 80px;
  height: 80px;
}

.item-detail-words {
  width: 293px;
}

.item-detail-title {
  margin-top: 12px;
  color: #3c3c3c;
  font-size: 12px;
}

.item-detail-class {
  margin-top: 10px;
  color: #9e9e9e;
  font-size: 12px;
}

.item-detail-time {
  margin-top: 5px;
  font-size: 12px;
  color: #3c3c3c;
}

.item-price {
  font-size: 12px;
  color: red;
}

.item-basic-width {
  width: 80px
}
</style>