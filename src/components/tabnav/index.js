import React, { Component, useState } from 'react';
import { TabBar } from 'antd-mobile';

/**
 * 导航栏容器组件
 * @param {*} props 外界传过来的props
 */
function TabNav(props) {
    // 底部导航栏
    const navList = [{
        title: "阅读",
        path: "/",
        icon: "https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg",
        selectIcon: "https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg",
        badge: 1,
        dot: false
    }, {
        title: "单词",
        path: "/word",
        icon: "https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg",
        selectIcon: "https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg",
        badge: "new",
        dot: false
    }, {
        title: "课程",
        path: "/course",
        icon: "https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg",
        selectIcon: "https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg",
        badge: 1,
        dot: false
    }, {
        title: "我的",
        path: "/personal",
        icon: "https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg",
        selectIcon: "https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg",
        badge: "",
        dot: true
    }];

    let [tabList] = useState(navList);
    debugger
    return (
        <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
        >
            {
                tabList.map((item, index) => {
                    return (
                        /*<TabBar.Item
                            title={item.title}
                            key={index}
                            icon={<i className={item.icon}></i>}
                            selectedIcon={<i className={item.selectIcon} style={{ color: '#33A3F4' }}></i>}
                            selected={props.location.pathname === item.path}
                            onPress={() => { props.history.push(item.path); }}
                        >
                            {/!* 利用props.children接收 *!/}
                            {props.children}
                        </TabBar.Item>*/
                    <TabBar.Item
                            title={item.title}
                            key={index}
                            icon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url('+ item.icon +') center center /  21px 21px no-repeat' }}
                            />}
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url('+ item.selectIcon +') center center /  21px 21px no-repeat' }}
                                />
                            }
                            selected={props.location.pathname === item.path}
                            onPress={() => { props.history.push(item.path); }}
                            dot={item.dot}
                            badge={item.badge}
                        >
                            {/* 利用props.children接收 */}
                            {props.children}
                        </TabBar.Item>
                    );
                })
            }
        </TabBar>
    );
}

/**
 * 接受一个组件返回另一个组件的高阶组件
 * @param {*} ParentComponent 容器父组件
 * @param {*} SubComponent 被包裹子组件
 * 使用： TabNav(目标组件)
 */
function TabNavHigh(SubComponent) {
    return (props) => (
        <TabNav {...props}>
            <SubComponent {...props}></SubComponent>
        </TabNav>
    );
}

export default TabNavHigh;
