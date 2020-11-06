/**
 * Copyright (C) 2017-2099
 * All rights reserved, Designed By Zdj
 * @date 2020-11-06 10:33
 */
import * as TYPES from '../actionTypes/home';
import http from "@/http/request.js";


export function updateCourseData(data){
    return {
        type: TYPES.GET_COURSE_LIST,
        courseList: data,
        loading: false,
    };
}
export function loadingCourseData(data){
    return {
        type: TYPES.COURSE_LOADING,
        loading: data,
    };
}

export function loadedCourseData(data){
    return {
        type: TYPES.COURSE_LOADING,
        loading: data,
    };
}

export function requestCourseData(){
    return dispatch => {
        dispatch(loadingCourseData(true));
        http.get({
            url: '/list'
        }).then(response => {
            console.log(response);
            console.log("response:" + response);
            return response;
        }).then(response => {
            dispatch(updateCourseData(response.data));
            dispatch(loadedCourseData(false));
        }).catch((error) => {
            console.log("error:" + error);
        });

    };

}