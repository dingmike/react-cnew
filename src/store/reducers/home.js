/**
 * Copyright (C) 2017-2099
 * All rights reserved, Designed By Zdj
 * @date 2020-11-06 10:33
 */


import * as TYPES from '../actionTypes/home'





const courseInitState = {
    courseList: [],
    loading: true,
};


export const homeReducer = (state = courseInitState, action) => {
    switch (action.type) {
        case TYPES.GET_COURSE_LIST:
            return {...state, courseList: action.courseList};

        case TYPES.COURSE_LOADING:
            return {...state, loading: action.loading}
        default:
            return state;
    }
}