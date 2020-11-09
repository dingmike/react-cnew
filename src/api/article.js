/**
 * Copyright (C) 2017-2099
 * All rights reserved, Designed By Zdj
 * @date 2020-11-09 17:02
 */
import http from "@/http/request.js";



export function fetchList(query) {
    return http.get({
        url: '/test/article/allList',
        params: query
    })
}

export function deploy(id) {
    return request({
        url: '/act/model/deploy/' + id,
        method: 'post'
    })
}

export function addObj(obj) {
    return request({
        url: '/act/model/insert',
        method: 'post',
        data: obj
    })
}

export function getObj(id) {
    return request({
        url: '/admin/log/' + id,
        method: 'get'
    })
}

export function putObj(obj) {
    return request({
        url: '/admin/log/',
        method: 'put',
        data: obj
    })
}
