import {createRouter, createWebHashHistory} from "vue-router"
import HomeIndex from '@/index/HomeIndex.vue'


let router = createRouter(
    {
        history: createWebHashHistory(),
        routes: [
            {
                // 主页
                name: "index",
                path: "/index",
                component: HomeIndex
            },
            {
                // 登录页
                name: "signIn",
                path: "/signIn",
                component: () => import('@/SignPages/SignIn')
            },
            {
                // 用户个人中心页
                name: "personalCenter",
                path: "/personalCenter",
                component: () => import('@/PersonalCenterComponents/PersonalCenterIndex'),
                children: [
                    {
                        // 子路由 基本设置
                        name: "personalBasicSettings",
                        path: "personalBasicSettings",
                        component: () => import("@/PersonalCenterComponents/PersonalBasicSettings.vue")
                    },
                    {
                        // 子路由 收货地址设置
                        name: "personalReceiveAddressSetting",
                        path: "personalReceiveAddressSetting",
                        component: () => import("@/PersonalCenterComponents/PersonalReceiveAddressSetting.vue")
                    },
                    {
                        // 子路由 收货地址设置
                        name: "safeSetting",
                        path: "safeSetting",
                        component: () => import("@/PersonalCenterComponents/SafeSetting.vue")
                    }

                ]

            },
            {
                // 注册页
                name: "signUp",
                path: "/signUp",
                component: () => import('@/SignPages/SignUp')
            },
            {
                // 忘记密码
                name: "forgetPassword",
                path: "/forgetPassword",
                component: () => import('@/SignPages/ForgetPassword')
            },
            {
                // 购物车页
                name: "shoppingCartIndex",
                path: "/shoppingCartIndex",
                component: () => import('@/ShoppingCart/ShoppingCartIndex.vue')
            },
            {
                // 收藏夹页
                name: "userCollectIndex",
                path: "/userCollectIndex",
                component: () => import("@/UserCollect/UserCollectIndex.vue")
            },
            {
                // 订单操作界面 src/UserOrderOperation/UserOperationIndex.vue
                name: "userOperationIndex",
                path: "/userOperationIndex",
                component: () => import("@/UserOrderOperation/UserOperationIndex.vue"),
                children: [
                    // 子路由
                    {
                        // 待支付
                        name: "waitPayItem",
                        path: "waitPayItem",
                        component: () => import("@/UserOrderOperation/UserOperationItem/WaitPayItem.vue")
                    },
                    {
                        // 待发货
                        name: "waitSend",
                        path: "waitSend",
                        component: () => import("@/UserOrderOperation/UserOperationItem/WaitSend.vue")
                    },
                    {
                        // 待收货
                        name: "waitReceive",
                        path: "waitReceive",
                        component: () => import("@/UserOrderOperation/UserOperationItem/WaitReceive.vue")
                    },
                    {
                        // 待评价
                        name: "waitComment",
                        path: "waitComment",
                        component: () => import("@/UserOrderOperation/UserOperationItem/WaitComment.vue")
                    },
                ]
            },
            {
                // 订单支付页面
                name: "payment",
                path: "/payment",
                component: () => import('@/Payment/Payment.vue'),
            },
            {
                // 商品详情页
                name: "goodsDetailPage",
                path: "/userCollectIndex/:id",
                component: () => import('@/GoodsComponents/GoodsDetailPage'),
                props: true,
                children: [
                    // 子路由 商品评价
                    {
                        path: "goodComment",
                        name: "goodComment",
                        component: () => import('@/GoodsComponents/GoodsComments.vue'),
                    },
                    // 子路由 商品详情
                    {
                        path: "goodsDescribe",
                        name: "goodsDescribe",
                        component: () => import("@/GoodsComponents/GoodsDescribe.vue"),
                    }

                ]
            },
            // 订单创建页面
            {
                path: "/orderIndex",
                name: "orderIndex",
                component: () => import("@/Order/OrderIndex.vue"),
            },
            {
                path: "/searchIndex/:keywords",
                name: "searchIndex",
                component: () => import("@/UserSearch/SearchIndex.vue"),
                props: true,
            },


        ]
    }
)
export {router};