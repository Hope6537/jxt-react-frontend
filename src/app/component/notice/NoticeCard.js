import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Util from '../../util'
import Service from '../../service'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const cardDetailStyle = {
    width: "300px",
    height: "500px",
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "30px",
    marginRight: "20px",
    display: 'inline-block',
};
/**
 * 通知信息列
 * Created by hope6537 on 16/5/18.
 */
export default class NoticeCard extends React.Component {

    constructor() {
        super();
    }

    renderCardHeader(date, classes, title) {
        if (classes == "all") {
            classes = "全校通知";
        }
        return <CardHeader
            title={date+":"+title}
            subtitle={classes}
            actAsExpander={true}
            showExpandableButton={true}
        />
    }

    renderCardText(des) {
        return <CardText expandable={true}>
            {des}
        </CardText>
    }

    /**
     * 渲染方式很无脑,放置一个Extendable的Card,里面再装3个Card
     * @returns {XML}
     */
    render() {

        var date = this.props.date;
        var title = this.props.title;
        var des = this.props.des;
        var classes = this.props.classes == undefined ? "all" : this.props.classes;
        var isFirst = this.props.isFirst == undefined ? false : this.props.isFirst;
        if (isFirst) {
            return (
                <Card expanded={true}>
                    {this.renderCardHeader(date, classes, title)}
                    {this.renderCardText(des)}
                </Card>
            )
        } else {
            return (
                <Card>
                    {this.renderCardHeader(date, classes, title)}
                    {this.renderCardText(des)}
                </Card>
            )
        }

    }
}
