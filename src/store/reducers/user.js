/**
 * 根据action的不同返回不同的state值给store
 * action对象 = {
 *   type: action的类别
 *   payload: 新的数据
 * }
 */

import { loginOut } from '@/common/common.js';
import { USER_INFO } from "@/constants/account/index";
// 用来持久化数据的方法
import { mySession, myStorage } from "@/utils/cache";
import * as TYPES from '../actionTypes/user';


// 初始数据
let initState = {
    // 登录信息
    userInfo: myStorage.get(USER_INFO)
};

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        // 登录
        case TYPES.LOGIN_IN:
            return { ...state, userInfo: myStorage.set(USER_INFO, action.payload) };
        // 退出账号
        case TYPES.LOGIN_OUT:
            loginOut();
            return { ...state, userInfo: null };
        // 修改账号资料
        case TYPES.CHANGE_ACCOUNT:
            return { ...state, userInfo: myStorage.set(USER_INFO, action.payload) };
        default:
            return { ...state };
    }
};