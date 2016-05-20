import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import PlanCardDetail from './PlanCardDetail'

const cardTextStyle = {
    paddingBottom: "150px",
};

/**
 * 作息信息列
 * Created by hope6537 on 16/5/18.
 */
export default class PlanCard extends React.Component {

    renderCardHeader(className, date) {
        return <CardHeader
            title={className+" 作息时间"}
            subtitle={date}
            actAsExpander={true}
            showExpandableButton={true}
        />
    }

    renderCardText(planData) {
        return <CardText expandable={true}>
            <PlanCardDetail data={planData}/>
        </CardText>
    }

    /**
     * 渲染方式很无脑,放置一个Extendable的Card,里面再装1个Table
     * @returns {XML}
     */
    render() {
        var classesName = this.props.className;
        var date = this.props.date;
        var planData = this.props.data;
        var isFirst = this.props.isFirst == undefined ? false : this.props.isFirst;
        if (isFirst) {
            return (
                <Card expanded={true}>
                    {this.renderCardHeader(classesName, date)}
                    {this.renderCardText(planData)}
                </Card>
            )
        } else {
            return (
                <Card>
                    {this.renderCardHeader(classesName, date)}
                    {this.renderCardText(planData)}
                </Card>
            )
        }
    }
}
