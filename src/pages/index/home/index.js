import React, {Component, useState, useEffect} from 'react';
import styles from "./index.less.module";
import { Button, WhiteSpace, WingBlank, ListView, Flex } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import http from "@/http/request.js";
import {connect} from "react-redux";
import {isNumber, isString, isUndefined} from "@/utils/type";
import {getDateDiff} from "@/utils/date/format";
import { Link } from 'react-router-dom'
import { requestCourseData } from '@/store/actions/home'
import {IntlProvider,FormattedMessage, FormattedDate} from 'react-intl';
import MyListHeader from '@/components/myListHeader'
import Icons from '@/components/icon'

function MyBody(props) {
    return (
        <div className="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}

const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {
    for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        sectionIDs.push(sectionName);
        dataBlobs[sectionName] = sectionName;
        rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
            const rowName = `S${ii}, R${jj}`;
            rowIDs[ii].push(rowName);
            dataBlobs[rowName] = rowName;
        }
    }
    sectionIDs = [...sectionIDs];
    rowIDs = [...rowIDs];
}

class Home extends Component {
    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
        this.state = {
           arr: [1,2,3,4],
            firstImg:{
               src: 'https://img-blog.csdnimg.cn/20190227134034236.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpaHVpaHVpMjAxNg==,size_16,color_FFFFFF,t_70',
                width: 320,
                height: 640,
            },
            dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight * 3 / 4,
        };
    }
    componentDidMount() {
        let { updateData } = this.props;
        updateData();
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);

        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        debugger
        // simulate initial Ajax
        setTimeout(() => {
            genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
                height: hei,
            });
        }, 600);
    }
    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    componentWillReceiveProps(nextProps) {
      if (nextProps.dataSource !== this.props.dataSource) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
        });
      }
    }
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            genData(++pageIndex);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
            });
        }, 2000);
    }

    render() {

        const {arr} = this.state;
        let {courseList, loading} = this.props;

        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (
                <div key={rowID} style={{ padding: '0 15px' }}>
                    <div
                        style={{
                            lineHeight: '50px',
                            color: '#888',
                            fontSize: 18,
                            borderBottom: '1px solid #F6F6F6',
                        }}
                    >{obj.title}</div>
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
                        <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
                        <div style={{ lineHeight: 1 }}>
                            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
                            <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥ {rowID}</div>
                        </div>
                    </div>
                </div>
            );
        };

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
                        <div className={styles.pageContentList}>
                            <MyListHeader/>
                            <ListView
                                ref={el => this.lv = el}
                                dataSource={this.state.dataSource}
                                renderHeader={() => <div>List</div>}
                                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                                </div>)}
                                renderBodyComponent={() => <MyBody />}
                                renderRow={row}
                                renderSeparator={separator}
                                style={{
                                    height: this.state.height,
                                    overflow: 'auto',
                                }}
                                pageSize={4}
                                onScroll={() => { console.log('scroll'); }}
                                scrollRenderAheadDistance={500}
                                onEndReached={this.onEndReached}
                                onEndReachedThreshold={10}
                            />
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