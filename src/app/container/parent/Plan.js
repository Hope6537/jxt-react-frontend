/**
 * 作息组件
 * Created by hope6537 on 16/5/18.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PlanCard from '../../component/plan/PlanCard'
import Parent from '../Parent'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class PlanDataComponent extends React.Component {

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
                <PlanCard date="2016年05月18日" isFirst={true}/>
                <PlanCard date="2016年05月17日"/>
                <PlanCard date="2016年05月16日"/>
                <PlanCard date="2016年05月15日"/>
                <PlanCard date="2016年05月14日"/>
                <PlanCard date="2016年05月13日"/>
                <PlanCard date="2016年05月12日"/>
                <PlanCard date="2016年05月11日"/>
            </div>

        )
    }
}

const Plan = () => (
    <Parent dataComponent={<PlanDataComponent/>}/>
);

export default Plan;
