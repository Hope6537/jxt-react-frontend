import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import MealCardDetail from './MealCardDetail'

/**
 * 餐谱信息列
 * Created by hope6537 on 16/5/18.
 */
export default class MealCard extends React.Component {


    renderCardHeader(date) {
        return <CardHeader
            title="餐谱信息"
            subtitle={date}
            actAsExpander={true}
            showExpandableButton={true}
        />
    }

    renderCardText() {
        return (<CardText expandable={true}>
            <MealCardDetail type="早餐"/>
            <MealCardDetail type="午餐"/>
            <MealCardDetail type="晚餐"/>
        </CardText>);
    }

    /**
     * 渲染方式很无脑,放置一个Extendable的Card,里面再装3个Card
     * @returns {XML}
     */
    render() {

        var date = this.props.date;
        var isFirst = this.props.isFirst == undefined ? false : this.props.isFirst;
        if (isFirst) {
            return (
                <Card expanded={true}>
                    {this.renderCardHeader(date)}
                    {this.renderCardText()}
                </Card>
            )
        } else {
            return (
                <Card>
                    {this.renderCardHeader(date)}
                    {this.renderCardText()}
                </Card>
            )
        }

    }
}
