import React, {Component, useState, useEffect} from 'react';
import styles from "./index.less.module";
import {Button, WingBlank, WhiteSpace} from "antd-mobile";
import http from "@/http/request.js";
import {connect} from "react-redux";
import {isNumber, isString, isUndefined} from "@/utils/type";
import {getDateDiff} from "@/utils/date/format";
import { Link } from 'react-router-dom'
import Home from "@/pages/index/home";
import {getUrlQuery} from "@/utils/url"

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        query:  getUrlQuery('code')
    }
  }
   render() {
    return (
            <WingBlank>
                <p>{this.state.query}</p>
                <Button className={styles['home']}  type="primary">授权中...</Button><WhiteSpace />
            </WingBlank>
    )
   }
}
const mapStateToProps = (state) => {
    return {
        flag: state.userReducer.flag,
        user: state.userReducer.user,
        jokerVideo: state.userReducer.jokerVideo
    };
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateData: function(){
            dispatch(LOGIN_IN());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);;