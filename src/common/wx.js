import { getUrlQuery } from "@/utils/url";
import { isInWeChat, isCompanyChat } from "@/utils/reg.js";
import { myStorage } from "@/utils/cache";
import { WECHAT_TOKEN } from "@/constants/account/index";
import { isEmpty } from "@/utils/type.js";

/**
 * 微信授权登录
 * 在路由切换过程中调用initWX()方法就可以生效了;
 */

// 跳转授权链接
export function wxLink() {
    // 公众号的APPID
    const appid = process.env.NODE_ENV === "development" ? "wx7c68c6503e1a322d" : "生产环境的";
    // 授权回调页面,current为存储跳转之前的url(路由hash模式)
    const redirect_uri = encodeURIComponent(location.origin + process.env.PUBLIC_PATH + '#/' + "auth-wechat" + `?current=${encodeURIComponent(location.href)}`);
    // const redirect_uri = encodeURIComponent(location.origin + process.env.PUBLIC_PATH  + "auth-wechat" + `?current=${encodeURIComponent(location.href)}`);
    debugger
    // 授权回调页面,current为存储跳转之前的url(路由history模式)
    // const redirect_uri = encodeURIComponent(location.origin + process.env.PUBLIC_PATH + "auth-wechat" + `?current=${encodeURIComponent(location.href)}`);
    // 返回值类型 这里是code
    const response_type = "code";
    // 授权作用域 snsapi_userinfo表示手动授权 snsapi_base：不弹出授权页面，直接跳转，只能获取用户openid
    const scope = "snsapi_userinfo";
    // 跳转授权链接 进入这个链接后，如果用户同意授权，页面将跳转至 redirect_uri?code=CODE&state=STATE。若用户禁止授权，则重定向后不会带上code参数，仅会带上state参数redirect_uri?state=STATE
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=STATE#wechat_redirect`;
}

// 初始化微信授权功能
export function initWX() {
    // 首先判断在不在微信内, 不在则跳转到提醒页面
    if (!isInWeChat() && process.env.NODE_ENV != "development") {
        const prefix = location.origin + process.env.PUBLIC_PATH + '#/' + "not-wechat";
        // const prefix = location.origin + process.env.PUBLIC_PATH + "not-wechat"; // history模式
        window.location.href = prefix;
    }
    // 如果进入的不是授权中间页且没有微信授权登录成功, 则开启授权链接
    const code = getUrlQuery("code");
    const token = myStorage.get(WECHAT_TOKEN);
    if (isEmpty(code) && location.pathname.indexOf("auth-wechat") == -1 && isEmpty(token)) {
        wxLink();
    }
}

/**
 * hash路由下，因为#字符，微信授权回调的链接会变成：如http://xxxx.com/?code=061l3IR913dakL1zqSR91bHhR91l3IRo&state=STATE#/auth-wechat
 * 该方法将回调的链接重新拼接成正确的中间页链接
 */

export function handleRedirect() {
    const code = getUrlQuery('code');
    const url = location.href;
    const splitArr = url.split("#/");
    if (code && splitArr && splitArr.length == 2) {
        const authUrl = location.origin + process.env.PUBLIC_PATH + '#/' + splitArr[1];
        const otherUrl = splitArr[0].split('?') && splitArr[0].split('?')[1];
        const newUrl = authUrl + '&' + otherUrl;
        return newUrl;
    }
}