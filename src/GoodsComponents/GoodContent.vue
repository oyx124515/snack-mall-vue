<template>
  <!--  商品详情页 轮播图 购物车的操作等 -->
  <div class="good-content-outer">
    <!--    轮播图-->
    <a-carousel autoplay
                class="slider-s">
      <div v-for="i in swiperList" :key="i"><img class="good-swiper-img" :src="baseImgUrl+i" alt="picture"></div>
    </a-carousel>
    <!--    轮播图end-->
    <div class="good-describe">
      <div class="goods-title"><span>{{ name }}</span></div>
      <div class="sale-month"><span>销量 {{ sales_volume }}</span></div>
      <div class="goods-price">
        <span>¥</span>
        <span>{{ showPrice }}</span>
        <span v-show="isSelected">起</span>
      </div>
      <div class="good-attr">
        <span>商品属性：</span>
        <a-select
            v-model:value="selectAttribute"
            size="middle"
            style="width: 500px"
            :options="skus"
            placeholder="请选择商品类型"
        ></a-select>
      </div>
      <div class="goods-number">
        <span>数量：</span>
        <a-input-number v-model:value.number.lazy="buyNumber" :min="1" :max="stock"/>
        <span style="margin-left: 6px" v-show="selectAttribute!==''">库存:{{ stock }}</span>
      </div>

      <div class="operation-button">
        <button class="button-buy-now" @click="handleBuy">立即购买</button>
        <button class="button-add-car" @click="handleAddShoppingCart">加入购物车</button>
        <span class="div-i">|</span>

        <div @click="HandleCollect()" ref="collectDiv" class="collected">
          <star-outlined></star-outlined>
          <span>{{ collectText }}</span>
        </div>

      </div>
    </div>
  </div>


</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import {StarOutlined} from '@ant-design/icons-vue'
import {request} from "@/request";
import {message} from "ant-design-vue";
import baseImgUrl from "@/baseImgUrl";
import {router} from "@/router";
import {useStore} from 'vuex'
// eslint-disable-next-line no-undef
const props = defineProps({
  id: String
});
// 商品标题
const name = ref("");
const authed = ref(false);
//库存
const stock = ref(1);

const buyNumber = ref(1)
const selectAttribute = ref("")
const isSelected = computed(() => {
  return selectAttribute.value === ""
})
const starting_price = ref(0)
//
const sales_volume = ref(0)
//
const skus = reactive([])
// 拿到收藏的div
const collectDiv = ref()
let isFav = ref(false);
const collectText = ref("收藏")
// 轮播图列表
const swiperList = reactive([])
const showPrice = computed(() => {
  if (isSelected.value) {
    return starting_price.value
  } else {
    let i;
    let price = 0;
    for (i = 0; i < skus.length; i++) {
      if (skus[i].value === selectAttribute.value) {
        price = skus[i].price;
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        stock.value = skus[i].stock;
        break;
      }
    }
    return price;
  }
});

const store = useStore();

// 立即购买操作
function handleBuy() {
  if (!authed.value) {
    message.info("请登陆后操作");
    return;
  }
  if (selectAttribute.value === "") {
    message.info("请选择你需要购买的商品类型");
    return;
  }
  // 创建订单的操作
  let item = [{spu: props.id, sku: selectAttribute.value, quantity: buyNumber.value}];
  store.commit("CLEAN_ORDER_ITEMS");
  store.commit("ADD_ORDER_ITEMS", item);
  router.push(
      {
        name: "orderIndex",
      }
  )
}

function handleAddShoppingCart() {
  if (!authed.value) {
    message.info("请登陆后操作");
    return;
  }
  if (selectAttribute.value === "") {
    message.info("请选择你需要购买的商品类型");
    return;
  }
  let send_data = {spu: props.id, sku: selectAttribute.value, quantity: buyNumber.value}
  request({
    url: "/addShoppingCart/", method: "post", data: send_data, headers: {token: localStorage.getItem("token")}
  }).then(
      (resp) => {
        let data = resp.data;
        if (data.code === 0) {
          message.info("添加到购物车成功");
        } else {
          message.info(data.message);
        }
      },
      () => message.error("链接服务器失败,无法加入到购物车")
  )

}

// 改变收藏样式的函数
function checkCollectStyle() {
  let colTarget = collectDiv.value
  if (isFav.value) {
    colTarget.classList.add("isCollected")
    collectText.value = "已收藏"
  } else {
    colTarget.classList.remove("isCollected")
    collectText.value = "收藏"
  }
}


// 改变收藏的函数
function HandleCollect() {
  if (!authed.value) {
    message.info("请登录后使用");
    return;
  }
  if (isFav.value) {
    //收藏了 取消收藏
    request(
        {
          url: "/cancelFav/",
          method: "POST",
          data: {id: props.id},
          headers: {token: window.localStorage.getItem("token")}
        }
    ).then(
        (resp) => {
          let data = resp.data;
          message.info(data.message);
          isFav.value = false;
          checkCollectStyle();
        },
        () => {
          message.error("服务器异常,取消收藏失败")
        }
    )
  } else {
    // 没有收藏，拉入收藏夹
    request(
        {
          url: "/addFav/",
          method: "POST",
          data: {id: props.id},
          headers: {token: window.localStorage.getItem("token")}
        }
    ).then(
        (resp) => {
          let data = resp.data;
          message.info(data.message);
          isFav.value = true;
          checkCollectStyle();
        },
        () => {
          message.error("服务器异常,收藏失败")
        },
    )
  }


}

// 挂载执行的函数
function onMountedFunc() {
  //
  request({
    method: "POST",
    url: "/getDetailMessage/",
    data: {id: props.id},
    headers: {token: window.localStorage.getItem("token")}
  }).then(
      (resp) => {
        let data = resp.data;
        if (data.code === 0) {
          let body = data.body;
          body.swiper.forEach(s => {
            swiperList.push(s);
          });
          name.value = body.name;
          sales_volume.value = body.sales_volume;
          body.skus.forEach(e => {
            skus.push(
                {
                  label: e.name,
                  value: e.id,
                  price: e.price,
                  stock: e.stock,
                  disabled: e.stock === 0
                }
            )
          })
          starting_price.value = body.starting_price;
          if (body.authed) {
            authed.value = true;
            isFav.value = body.fav;
            checkCollectStyle()

          }
        }
      }, () => {
        message.error("获取商品信息失败")
      })
}


onMounted(() => {
  onMountedFunc()
})

</script>

<style scoped>
.good-content-outer {
  margin: 0 auto;
  width: 1186px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  display: flex;
}

.good-swiper-img {
  width: 480px;
  height: 480px;
}

.good-describe {
  padding: 10px;
  width: 686px;
  height: 500px;

}

.goods-title {
  color: #000000;
  font-size: 20px;
  font-weight: 900;
}

.sale-month {
  margin-left: 10px;
  color: #00000066;
  font-size: 14px;
  font-weight: 400;
}

.goods-price {
  color: #ff5000;
}

.goods-price span:first-child {
  font-size: 16px;
}

.goods-price span:nth-child(2) {
  font-size: 28px;
}

.goods-price span:nth-child(3) {
  font-size: 16px;
}

.good-attr {
  margin-top: 12px;
  margin-left: 12px;
}

.good-attr span {
  display: inline-block;
  margin-right: 10px;
  color: #7f7f7f;
  font-size: 14px;
}

.goods-number {
  margin-top: 12px;
  margin-left: 12px;
}

.goods-number span {
  display: inline-block;
  margin-right: 37px;
  color: #7f7f7f;
  font-size: 14px;
}

.operation-button {
  margin-top: 60px;
  margin-left: 20px;
}

.operation-button button {
  height: 48px;
  width: 136px;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
}

.button-buy-now {
  background: linear-gradient(90deg, rgb(255, 119, 0), rgb(255, 73, 0));

}

.button-buy-now:hover,
.button-add-car:hover {
  opacity: 0.7;
}

.button-add-car {
  background: linear-gradient(90deg, rgb(255, 203, 0), rgb(255, 148, 2));
}

.div-i {
  display: inline-block;
  font-size: 14px;
  margin: 0 20px;
  color: #eeeeee;
}

.collected {
  display: inline-block;
  cursor: pointer;
}

.collected span {
  display: inline-block;
  margin-right: 5px;
}

.isCollected {
  color: #ff5000;
}

.slider-s {
  border-radius: 12px;
  overflow: hidden;
  width: 480px;
  height: 480px;
  background-color: rgba(0, 0, 0, .02)
}
</style>