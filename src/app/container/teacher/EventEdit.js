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
/**
 * 活动编辑页
 */
var selectionList = [];
export default class EventEdit extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.setState({
            classesList: undefined,
            fetchSuccess: 0,
            selectedList: [],
            classesIndexValuePair: undefined,
            open: false,
            showCheckboxes: true,
            title: "",
            des: ""
        })
    }

    componentDidMount() {
        var eventId = this.props.params.eventId;
        if (eventId != undefined) {
            this.setState({
                eventId: eventId,
                showCheckboxes: false
            });
            this.fetchEvent(eventId);
        }
        this.fetchClassesList();
    }

    fetchEvent(eventId) {
        var query = {
            event: {
                id: eventId == undefined ? this.state.eventId : eventId
            }
        };
        Util.getJSON(Service.host + Service.getEvent, query, undefined, function (resp) {
            if (resp.success) {
                var event = resp.data.result;
                var data = {
                    title: event.title,
                    des: event.des
                };
                this.setState(data);
            }
        }.bind(this))

    }


    fetchClassesList() {
        var query = null;
        query = {
            //TODO:教师所属班级集合
        };
        var limitClassesIdList = [];
        if (this.props.params.eventId != undefined) {
            query = {
                fetchObject: {
                    eventId: this.props.params.eventId
                }
            };
            Util.getJSON(Service.host + Service.fetchEventClassesId, query, undefined, function (resp) {
                if (resp.success) {
                    limitClassesIdList = resp.data.result;
                    this.setState({
                        fetchSuccess: this.state.fetchSuccess + 1
                    });
                    Util.getJSON(Service.host + Service.fetchClasses, query, undefined, function (resp) {
                        if (resp.success) {
                            var classesList = resp.data.result;
                            var temp = [];
                            if (limitClassesIdList.length > 0) {
                                classesList.map(classes=> {
                                    if (limitClassesIdList.indexOf(classes.id) != -1) {
                                        temp.push(classes);
                                    }
                                });
                                classesList = temp;
                            }
                            console.log(classesList);
                            var classesNameValuePair = {};
                            var classesIndexValuePair = [];
                            var index = 0;
                            classesList.map(classes => {
                                classesNameValuePair[classes.id] = classes.name;
                                classesIndexValuePair[index++] = (classes.id);
                            });
                            this.setState({
                                classesList: classesList,
                                fetchSuccess: this.state.fetchSuccess + 1,
                                classesNameValuePair: classesNameValuePair,
                                classesIndexValuePair: classesIndexValuePair,
                                errorDes: ""
                            })
                        }
                    }.bind(this));
                }
            }.bind(this))
        } else {
            Util.getJSON(Service.host + Service.fetchClasses, query, undefined, function (resp) {
                if (resp.success) {
                    var classesList = resp.data.result;
                    var classesNameValuePair = {};
                    var classesIndexValuePair = [];
                    var index = 0;
                    classesList.map(classes => {
                        classesNameValuePair[classes.id] = classes.name;
                        classesIndexValuePair[index++] = (classes.id);
                    });
                    this.setState({
                        classesList: classesList,
                        fetchSuccess: this.state.fetchSuccess + 1,
                        classesNameValuePair: classesNameValuePair,
                        classesIndexValuePair: classesIndexValuePair,
                        errorDes: ""
                    })
                }
            }.bind(this));
        }


    }

    generateEvent() {
        var data = {
            title: "活动内容",
            des: "活动描述五十字五十字五十字五十字五十字五十字五十字五十字五十字",
        };
        this.setState(data)

    }

    handleBindSelection(e) {
        selectionList = e;
    }

    handleSelection() {
        var selectedList = [];
        var classesIndexValuePair = this.state.classesIndexValuePair;
        if (selectionList == 'all') {
            selectedList = classesIndexValuePair;
        } else if (selectionList != "none" && selectionList != []) {
            var i = 0;
            selectionList.map(index=> {
                selectedList[i++] = (classesIndexValuePair[index])
            });
        } else {
            selectedList = []
        }
        return selectedList;
    }

    handleSubmit() {
        var eventData = {
            postObject: {
                title: this.state.title,
                des: this.state.des
            }
        };
        var that = this;
        if (this.state.eventId != undefined) {
            eventData['postObject']['id'] = this.state.eventId;
            eventData['putObject'] = eventData['postObject'];
            Util.putJSON(Service.host + Service.putEvent, eventData, function (resp) {
                if (resp.success) {
                    that.setState({
                        dialogMsg: decodeURIComponent(resp.returnMsg)
                    });
                    that.handleOpen();
                }
            }, 'debug')
        } else {
            Util.postJSON(Service.host + Service.postEvent, eventData, function (resp) {
                if (resp.success) {
                    var newId = resp.data.result;
                    that.setState({
                        dialogMsg: decodeURIComponent(resp.returnMsg)
                    });
                    that.handleOpen();
                    var classesIdList = that.handleSelection();
                    var publishData = {
                        postObject: {
                            eventId: newId,
                            classesIdList: classesIdList
                        }
                    };
                    Util.postJSON(Service.host + Service.batchPostPublish, publishData, function (resp) {
                        if (resp.success) {
                            that.setState({
                                dialogMsg: decodeURIComponent(resp.returnMsg)
                            });
                        }
                    }, 'debug')
                }
            }, 'debug')
        }

    }

    handleChange(event) {
        var newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState)
    }

    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };


    render() {
        var fetchSuccess = (this.props.params.eventId != undefined && this.state.fetchSuccess >= 2) || ( this.state.fetchSuccess >= 1 && this.props.params.eventId == undefined);
        if (fetchSuccess) {
            var classesList = this.state.classesList;
            let rows = null;
            if (classesList != undefined) {
                rows = classesList.map(classes => {
                    return (<TableRow key={classes.id}>
                        <TableRowColumn>{classes.name}</TableRowColumn>
                    </TableRow>)
                });
            }
            const actions = [
                <FlatButton
                    label="关闭"
                    primary={true}
                    onTouchTap={this.handleClose.bind(this)}
                />,
            ];

            return (
                <Card>
                    <CardTitle title={"发布活动"}/>
                    <CardText>
                        <TextField
                            ref="title"
                            name="title"
                            hintText="输入活动标题"
                            value={this.state.title}
                            onChange={this.handleChange.bind(this)}
                            errorText={this.state.errorDes}
                        /><br />
                        <TextField
                            ref="des"
                            name="des"
                            hintText="输入活动内容"
                            value={this.state.des}
                            onChange={this.handleChange.bind(this)}
                            errorText={this.state.errorDes}
                            fullWidth={true}
                            multiLine={true}
                        />
                        <Dialog
                            title="系统消息"
                            actions={actions}
                            modal={true}
                            open={this.state.open}
                        >
                            {this.state.dialogMsg}
                        </Dialog>
                        <RaisedButton label={"测试-生成活动"} onTouchTap={this.generateEvent.bind(this)} secondary={true}/>
                        <br/>
                        <h3>{this.state.eventId == undefined ? "选择活动班级" : "活动关联班级"}</h3>
                        <Table
                            onRowSelection={this.handleBindSelection.bind(this)}
                            multiSelectable={true}
                            enableSelectAll={true}
                            style={{marginBottom:"20px"}}
                        >
                            <TableHeader
                                displaySelectAll={this.state.showCheckboxes}
                                adjustForCheckbox={this.state.showCheckboxes}
                            >
                                <TableRow>
                                    <TableHeaderColumn>班级名称</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody ref="body" displayRowCheckbox={this.state.showCheckboxes}>
                                {rows}
                            </TableBody>
                        </Table>
                        <RaisedButton label={this.state.eventId == undefined ? "发布活动" : "修改活动"}
                                      onTouchTap={this.handleSubmit.bind(this)} primary={true}/>
                    </CardText>
                </Card>
            )
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