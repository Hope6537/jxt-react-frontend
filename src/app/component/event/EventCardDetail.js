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

const cardDetailStyle = {
    width: "310px",
    height: "500px",
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "30px",
    marginRight: "20px",
    display: 'inline-block',
};

/**
 * 活动信息
 * Created by hope6537 on 16/5/18.
 */
export default class EventCardDetail extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        var event = this.props.event;
        var student = this.props.student;
        this.setState({
            open: false,
            event: event,
            student: student,

        })
    }

    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };

    handlePostJoin(accept) {
        var data = {
            postObject: {
                studentId: this.state.student.id,
                eventId: this.state.event.id,
                status: accept ? 1 : 2
            }
        };
        Util.postJSON(Service.host + Service.postJoin, data, function (resp) {
            this.setState({
                dialogMsg: decodeURIComponent(resp.returnMsg)
            });
            this.handleOpen();
            this.props.refresh.call(this.props.callObj)
        }.bind(this), "debug")
    }

    handleAccept() {
        this.handlePostJoin(true)
    }

    handleReject() {
        this.handlePostJoin(false)
    }

    handlePutJoin(accept) {
        var data = {
            putObject: {
                id: this.state.event.joinId,
                status: accept ? 1 : 2
            }
        };
        Util.putJSON(Service.host + Service.putJoin, data, function (resp) {
            this.setState({
                dialogMsg: decodeURIComponent(resp.returnMsg)
            });
            this.handleOpen();
            this.props.refresh.call(this.props.callObj)
        }.bind(this), "debug")
    }

    handleChangeToReject() {
        this.handlePutJoin(false);
    }

    handleChangeToAccept() {
        this.handlePutJoin(true);
    }

    render() {
        const actions = [
            <FlatButton
                label="关闭"
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
            />,
        ];
        var cardType = this.props.type == undefined ? "parent" : this.props.type;

        var event = this.props.event;
        var eventId = event.id;
        var eventTitle = event.title;
        var eventDes = event.des;
        if (event.relationClasses != undefined) {
            var eventClassesInfoList = event.relationClasses.map(classes => {
                return classes.name;
            });
        }
        //家长
        if (cardType != "teacher") {
            var student = this.state.student;
            var studentId = "";
            var studentName = ""
            if (student != undefined) {
                studentId = student.id;
                studentName = student.name;
            }
            var joinAction = [];
            if (event.joinStatus == 0 || event.joinStatus == undefined) {
                joinAction = [<FlatButton style={{marginLeft:"0px"}} key={event.id+"a"} label="同意" onTouchTap={this.handleAccept.bind(this)}/>,
                    <FlatButton style={{marginLeft:"0px"}}  key={event.id+"r"} label="拒绝" onTouchTap={this.handleReject.bind(this)}/>]
            } else if (event.joinStatus == 1) {
                joinAction = [<FlatButton style={{marginLeft:"0px"}} key={event.id+"a"} label="已同意" primary={true}/>,
                    <FlatButton style={{marginLeft:"0px"}}  key={event.id+"r"} label="变为拒绝" onTouchTap={this.handleChangeToReject.bind(this)}/>]
            } else if (event.joinStatus == 2) {
                joinAction = [<FlatButton  style={{marginLeft:"0px"}} key={event.id+"a"} label="已拒绝" primary={true}/>,
                    <FlatButton style={{marginLeft:"0px"}} key={event.id+"r"} label="变为同意" onTouchTap={this.handleChangeToAccept.bind(this)}/>]
            }
            return (
                <Card style={cardDetailStyle}>
                    <Dialog
                        title="系统消息"
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                    >
                        {this.state.dialogMsg}
                    </Dialog>
                    <CardHeader
                        title={"活动"}
                    />
                    <CardTitle title={eventTitle} subtitle={studentName+"的活动"}/>
                    <CardText style={{height:"250px"}}>
                        {eventDes}
                    </CardText>
                    <CardActions>

                        <RaisedButton style={{marginLeft:"0px"}} linkButton={true} label="详情"
                                      href={"/#/event/info/"+eventId+"/"+studentId}
                                      primary={true}/>
                        {joinAction}
                    </CardActions>
                </Card>
            )
        }
        //教师
        else {
            return (
                <Card style={cardDetailStyle}>
                    <CardHeader
                        title={"活动"}
                    />
                    <CardTitle title={eventTitle}/>
                    <CardText style={{height:"250px"}}>
                        {"活动所属班级:"}
                        <br/>
                        {JSON.stringify(eventClassesInfoList)}
                        <hr/>
                        {eventDes}
                    </CardText>
                    <CardActions>
                        <RaisedButton style={{marginLeft:"0px"}} linkButton={true} label={"编辑"}
                                      href={"/#/teacher/event/edit/"+eventId}
                                      primary={true}/>
                    </CardActions>
                </Card>
            )
        }

    }
}
