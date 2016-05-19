/**
 * 通知组件
 * Created by hope6537 on 16/5/18.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Parent from '../Parent'
import NoticeCard from '../../component/notice/NoticeCard'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class NoticeDataComponent extends React.Component {

    constructor() {
        super();
    }

    /**
     * 渲染方式很简单,每个PlanCard包含当天的数据,按照ListView方式放置
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <NoticeCard date="2016年05月18日" isFirst={true}/>
                <NoticeCard date="2016年05月17日"/>
                <NoticeCard date="2016年05月16日"/>
                <NoticeCard date="2016年05月15日"/>
                <NoticeCard date="2016年05月14日"/>
                <NoticeCard date="2016年05月13日"/>
                <NoticeCard date="2016年05月12日"/>
                <NoticeCard date="2016年05月11日"/>
            </div>

        )
    }
}