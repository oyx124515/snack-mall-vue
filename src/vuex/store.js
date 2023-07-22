import {createStore} from 'vuex';

const actions = {};
const mutations = {
    // 添加OrderItems
    ADD_ORDER_ITEMS(state, value/* 需要为一个list*/) {
        state.OrderItems.length = 0;
        value.forEach(tar => {
            state.OrderItems.push(tar);
        })
    },


    CLEAN_CREATE_ORDER(state,) {
        state.CreateOrderIDs.length = 0;
    },

    SET_CREATE_ORDER(state, value/* 需要为一个list*/) {
        value.forEach(tar => state.CreateOrderIDs.push(tar))
    }
    ,
    // 清空OrderItems
    CLEAN_ORDER_ITEMS(state) {
        state.OrderItems.length = 0;
    },
    SET_SUM_PRICE(state, val) {
        state.sumPrice = val;
    }
};
const state = {
    OrderItems: [],
    CreateOrderIDs: [],
    sumPrice: 0.00,

};

export default createStore({
    actions, mutations, state
})