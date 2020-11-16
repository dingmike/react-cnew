import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app.js";
import store from "@/store/index.js";
import {IntlProvider,FormattedMessage} from 'react-intl';
import {persistore} from "@/store/index.js";
import {PersistGate} from 'redux-persist/lib/integration/react';

//导入语言包，路径为你语言包所在的路径
import enUS from '@/lang/en-US.json';
import zhCN from '@/lang/zh-CN.json';

// 引入全局样式
import "less/index.less";
// 处理点击移动端事件
import FastClick from "fastclick";
FastClick.attach(document.body);
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistore}>
            <IntlProvider locale={navigator.language} messages={navigator.language === 'en-US' ? enUS : zhCN}>
                <App />
            </IntlProvider>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);
