import { Toast } from "antd-mobile";
import { getUrlQuery } from "@/utils/url";
import { WECHAT_TOKEN } from "@/constants/account/index";
import { myStorage } from "@/utils/cache.js";
import { handleRedirect } from "@/common/wx";

/**
 * 微信授权回调页面（中转页）
 * 只处理授权逻辑，不做渲染
 */

const AuthWechat = (props) => {
    debugger
    document.title = '';
    // hash路由下先把回调完的url转换成正常的
    let normalUrl = handleRedirect();
    // 获取code
    const code = getUrlQuery('code', normalUrl);
    // 返回的路径
    const backPath = decodeURIComponent(getUrlQuery('current', normalUrl));
    // 先清除token
    myStorage.remove(WECHAT_TOKEN);

    // 请求token
    if (code) {
        // 通过code请求后台获取token
        const token = "后台请求";
        myStorage.set(WECHAT_TOKEN, token);
        window.location.replace(backPath);
    } else {
        Toast.fail("微信授权失败, 请稍后再试");
    }

    return null;
};

export default AuthWechat;
