/**
 * 活动详情和需求详情组件
 * Created by hope6537 on 16/5/18.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Parent from '../Parent'

export default class InfoDataComponent extends React.Component {

    constructor() {
        super();
    }

    renderCardHeader(title, date) {
        return <CardHeader
            title={title}
            subtitle={date}
            actAsExpander={true}
            showExpandableButton={true}
        />
    }

    renderCardText() {
        return <CardText expandable={true}>
            正文
        </CardText>
    }

    render() {
        console.log(this.props.params);

        var eventId = this.props.params.eventId;
        var required = this.props.params.requireId;
        var date = "2016年05月19日";

        if (eventId != undefined) {
            return (
                <Card expanded={true}>
                    {this.renderCardHeader("活动详情", date)}
                    {this.renderCardText()}
                    <CardActions>
                        <FlatButton label="同意参加"/>
                        <FlatButton label="拒绝参加"/>
                    </CardActions>
                </Card>
            )
        } else if (required != undefined) {
            return (
                <Card expanded={true}>
                    {this.renderCardHeader("需求详情", date)}
                    {this.renderCardText()}
                    <CardActions>
                        <Link label="修改需求"/>
                        <Link label="完成需求"/>
                    </CardActions>
                </Card>
            )
        } else {
            return (<Card expanded={true}>
                <CardHeader
                    title={"错误跳转"}
                >
                </CardHeader>
            </Card>);
        }
    }
}