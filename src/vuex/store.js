import {createStore} from 'vuex';

const actions = {};
const mutations = {
    // 添加OrderItems
    ADD_ORDER_ITEMS(state, value/* 需要为一个list*/) {
        value.forEach(tar => {
            state.OrderItems.push(tar);
        })
    },

    // 清空OrderItems
    CLEAN_ORDER_ITEMS(state) {
        state.OrderItems.length = 0;
    }
};
const state = {
    OrderItems: []

};

export default createStore({
    actions,
    mutations,
    state
})