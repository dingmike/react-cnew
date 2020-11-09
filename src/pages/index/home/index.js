import React, {Component, useState, useEffect} from 'react';
import styles from "./index.less.module";
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import http from "@/http/request.js";
import {connect} from "react-redux";
import {isNumber, isString, isUndefined} from "@/utils/type";
import {getDateDiff} from "@/utils/date/format";
import { Link } from 'react-router-dom'
import { requestCourseData } from '@/store/actions/home'
import {IntlProvider,FormattedMessage, FormattedDate} from 'react-intl';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
           arr: [1,2,3,4],
            firstImg:{
               src: 'https://img-blog.csdnimg.cn/20190227134034236.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpaHVpaHVpMjAxNg==,size_16,color_FFFFFF,t_70',
                width: 320,
                height: 640,
            }
        };
    }
    componentDidMount() {
        let { updateData } = this.props;
        updateData();
    }
    render() {
        const {arr} = this.state;
        let {courseList, loading} = this.props;
        return (
                <div className={styles['pageContainer']}>
                   {/* <FormattedMessage
                        id="HELLO_WORLD"
                    />
                    <FormattedDate
                        value={new Date(1459913574887)}
                        year='numeric'
                        month='long'
                        day='numeric'
                        weekday='long'
                    />
                    <Button loading={loading}>loading button</Button><WhiteSpace />
                    <WhiteSpace />
                    {courseList.map(item => {
                        return (
                            <div key={item.id}>{item.name}</div>
                        )
                    })}
                    {arr.map(item => {
                        return (
                            <div key={item}>{item}</div>
                        )
                    })}*/}
                    <WingBlank size="md">
                        <div className={styles['header-title']}>
                            <h2 className={styles}>Today Reading</h2>
                            <p>Read more, learn more.</p>
                        </div>
                        <div className={styles.pageContentMiddle}>
                            <div className={styles.contentImg}>
                                <img src={this.state.firstImg.src} alt=""/>
                            </div>
                        </div>
                    </WingBlank>
                </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        courseList: state.homeReducer.courseList,
        loading: state.homeReducer.loading,
    };
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateData: function(){
            dispatch(requestCourseData());
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);