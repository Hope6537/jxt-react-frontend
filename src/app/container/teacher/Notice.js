/**
 * Created by hope6537 on 16/5/19.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Parent from '../Parent'
import NoticeCard from '../../component/notice/NoticeCard'
import NoticeCardEditor from '../../component/notice/NoticeCardEditor'
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
                <NoticeCardEditor/>
                <br/>
                <NoticeCard date="2016年05月18日" classes={"all"} isFirst={true}/>
                <NoticeCard date="2016年05月17日" classes={"A班"}/>
                <NoticeCard date="2016年05月16日" classes={"A班"}/>
                <NoticeCard date="2016年05月15日" classes={"all"}/>
                <NoticeCard date="2016年05月14日" classes={"all"}/>
                <NoticeCard date="2016年05月13日" classes={"all"}/>
                <NoticeCard date="2016年05月12日" classes={"all"}/>
                <NoticeCard date="2016年05月11日" classes={"all"}/>
            </div>

        )
    }
}