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
           arr: [1,2,3,4]
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
                <div>
                    <FormattedMessage
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
                    })}
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