/**
 * Copyright (C) 2017-2099
 * All rights reserved, Designed By Zdj
 * @date 2020-11-09 15:42
 */

import React from 'react';
import classNames from 'classnames';
import './index.less';

// 上文中从iconfont中复制的css文件内容
import './icon.css';

const Icons = (props) => {
    const {type, spin, className = '', ...others} = props;

    const cls = classNames({
        'iconfont': true,
        [`${type}`]: true,
        'icon-iconfont-spin': !!spin,
    }, className);

    return (
        <i className={cls} {...others}/>
    );
};

export default Icons;