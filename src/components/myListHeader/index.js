/**
 * Copyright (C) 2017-2099
 * All rights reserved, Designed By Zdj
 * @date 2020-11-09 14:55
 */

import React, { Component, useState } from 'react';
import {isEmpty} from "@/utils/type";
import { Button, WhiteSpace, WingBlank, ListView, Flex, Icon } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import "./index.less";
import Icons from '@/components/icon'

class MyListHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { imgUrl, title, text, width, height } = this.props;
        return (
            <StickyContainer style={{height: 40}}>
                <Sticky>
                    {({style}) => {
                        return <Flex className="sticky-header" style={style} justify="between">
                            <Flex.Item>
                                <span className="header-title">
                                    History
                                </span>
                                <span className="header-s-title">
                                    Update 423 pieces
                                </span>
                            </Flex.Item>
                            <Flex.Item>
                                <Flex justify="end">
                                    <Flex.Item>
                                        <Icons type="icon-paixu-sheng" style={{color: 'green'}}/>
                                        <span>Up</span>
                                    </Flex.Item>
                                    <Flex.Item>
                                        <Icons type="icon-shaixuan" style={{color: 'green'}}/>
                                        <span>Filter</span>
                                    </Flex.Item>
                                </Flex>
                            </Flex.Item>
                        </Flex>
                    }}
                </Sticky>
            </StickyContainer>
        );
    }
}


export default MyListHeader