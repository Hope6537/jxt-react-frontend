/**
 * 活动详情和需求详情组件
 * Created by hope6537 on 16/5/18.
 */
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
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Util from '../../util'
import Service from '../../service'

import Parent from '../Parent'

export default class InfoDataComponent extends React.Component {

    constructor() {
        super();
    }


    componentWillMount() {
        var eventId = this.props.params.eventId;
        var studentId = this.props.params.studentId;
        var required = this.props.params.requireId;
        this.setState({
            eventId: eventId,
            studentId: studentId,
            required: required,
            fetchSuccess: 0,
            open: false
        })
    }

    componentDidMount() {
        this.fetchEvent();
    }

    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };

    fetchEvent() {
        var query = {
            event: {
                "id": this.state.eventId
            }
        };
        Util.getJSON(Service.host + Service.getEvent, query, undefined, function (resp) {
            if (resp.success) {
                this.setState({
                    event: resp.data.result,
                    fetchSuccess: this.state.fetchSuccess + 1
                });
                query = {
                    fetchObject: {
                        studentId: this.state.studentId,
                        eventId: this.state.eventId
                    }
                };
                Util.getJSON(Service.host + Service.fetchJoin, query, undefined, function (resp) {
                    if (resp.success) {
                        this.setState({
                            join: resp.data.result[0],
                            fetchSuccess: this.state.fetchSuccess + 1
                        })

                    }
                }.bind(this))
            }
        }.bind(this))

    }


    renderCardHeader(title, joinStatus) {
        return <CardHeader
            title={title}
            subtitle={joinStatus}
            actAsExpander={true}
            showExpandableButton={true}
        />
    }

    renderCardText(des) {
        return <CardText expandable={true}>
            {des}
        </CardText>
    }

    render() {

        var fetchSuccess = ( (this.state.fetchSuccess >= 2 && this.state.eventId != undefined) || (this.state.fetchSuccess >= 1 && this.state.required != undefined ));
        const actions = [
            <FlatButton
                label="关闭"
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
            />,
        ];
        if (fetchSuccess) {
            var date = "2016年05月19日";
            if (this.state.eventId != undefined) {
                var event = this.state.event;
                var join = this.state.join;
                var joinStatus = 0;
                if (join != undefined) {
                    joinStatus = join.status == 1 ? "已参加" : "已拒绝";
                }
                return (
                    <Card style={{paddingBottom:"200px"}} expanded={true}>
                        <Dialog
                            title="系统消息"
                            actions={actions}
                            modal={true}
                            open={this.state.open}
                        >
                            {this.state.dialogMsg}
                        </Dialog>
                        {this.renderCardHeader(event.title, joinStatus)}
                        {this.renderCardText(event.des)}
                        <hr/>
                    </Card>
                )
            } else if (this.state.required != undefined) {
                return (
                    <Card style={{paddingBottom:"200px"}} expanded={true}>
                        {this.renderCardHeader("需求详情", date)}
                        {this.renderCardText()}
                        <CardActions>
                            <FlatButton label="修改需求"/>
                            <FlatButton label="完成需求"/>
                        </CardActions>
                    </Card>
                )
            } else {
                return (<Card style={{paddingBottom:"200px"}} expanded={true}>
                    <CardHeader
                        title={"错误跳转"}
                    >
                    </CardHeader>
                </Card>);
            }
        } else {
            return (
                <div style={Util.style.container} ref="loading">
                    <RefreshIndicator
                        size={100}
                        left={0}
                        top={20}
                        status="loading"
                        style={Util.style.refresh}
                    />
                </div>
            )
        }

    }
}