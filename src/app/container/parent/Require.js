/**
 * 需求组件
 * Created by hope6537 on 16/5/18.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Util from '../../util'
import Service from '../../service'


import Parent from '../Parent'
import NoticeCard from '../../component/notice/NoticeCard'


const styles = {
    container: {
        marginLeft: "20px"
    },
    button: {
        marginTop: "20px",
        marginBottom: "20px"
    }
};

export default class RequireDataComponent extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.setState({
            detail: {},
            fetchSuccess: 0,
            selectable: false,
            showCheckboxes: false,
            type: 0,
            studentId: "",
            title: "",
            des: "",
            parentId: 50020,
            open: false,
            detailOpen: false
        })
    }

    componentDidMount() {
        this.fetchRequireList();
        this.fetchStudent();
    }

    fetchRequireList() {
        var query = {
            fetchObject: {
                isDeleted: "NO"
            }
        };
        if (this.state.parentId != undefined) {
            query.fetchObject['parentId'] = this.state.parentId
        }
        Util.getJSON(Service.host + Service.fetchRequireRich, query, undefined, function (resp) {
            if (resp.success) {
                this.setState({
                    fetchSuccess: this.state.fetchSuccess + 1,
                    requireList: resp.data.result
                })
            } else {
                console.log("###ERROR###");
                console.log(resp);
            }
        }.bind(this))
    }


    fetchStudent() {
        var query = {
            fetchObject: {
                isDeleted: "NO"
            }
        };
        if (this.state.parentId != undefined) {
            query.fetchObject['parentId'] = this.state.parentId
        }
        Util.getJSON(Service.host + Service.fetchStudent, query, undefined, function (resp) {
            if (resp.success) {
                this.setState({
                    fetchSuccess: this.state.fetchSuccess + 1,
                    studentList: resp.data.result
                })
            } else {
                console.log("###ERROR###");
                console.log(resp);
            }
        }.bind(this))


    }

    handleChange(event, index, value) {
        var newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState)
    }

    handleChangeStudentId(e, i, v) {
        this.setState({
            studentId: v
        })
    }

    handleChangeType(e, i, v) {
        this.setState({
            type: v
        })
    }

    handleChangeTime(e, v) {
        this.setState({
            timeObject: v,
            time: Util.parseTime(v, true)
        })
    }

    handleChangeDate(e, v) {
        this.setState({
            dateObject: v,
            date: Util.parseDate(v, true)
        })
    }

    generateRequire() {
        var date = new Date();
        var data = {
            title: "需求标题" + Util.getNowTime(),
            des: "需求描述" + Util.getNowTime(),
            type: 1,
            studentId: 74001,
            timeObject: date,
            dateObject: date,
            time: Util.parseTime(date, true),
            date: Util.parseDate(date, true)
        };
        this.setState(data)

    }

    handleSubmit() {
        var data = {
            postObject: {
                title: this.state.title,
                des: this.state.des,
                studentId: this.state.studentId,
                parentId: this.state.parentId,
                type: this.state.type,
                time: this.state.time,
                date: this.state.date
            }
        };
        if (data.postObject.type == 0) {
            delete data.postObject.date;
        }
        Util.postJSON(Service.host + Service.postRequire, data, function (resp) {
            if (resp.success) {
                this.setState({
                    fetchSuccess: 0
                });
                this.fetchRequireList();
                this.fetchStudent();
            }
            this.setState({
                dialogMsg: decodeURIComponent(resp.returnMsg)
            });
            this.handleOpen();
        }.bind(this), "debug");
    }

    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.handleDetailClose();
        this.setState({open: false});
    };

    handleDetailOpen(e) {
        var detail = this.state.requireList[e.currentTarget.name];
        this.setState({
            detail: detail,
            detailOpen: true
        });

    };

    handleDetailClose() {
        this.setState({detailOpen: false});
    };

    handleCloseRequire() {
        Util.putJSON(Service.host + Service.putRequire, {
            putObject: {
                id: this.state.detail.id,
                status: 2
            }
        }, function (resp) {
            var ms = resp.returnMsg == undefined ? "系统错误" : resp.returnMsg;
            if (resp.success) {
                this.setState({
                    fetchSuccess: 0
                });
                this.handleDetailClose();
                this.fetchRequireList();
                this.fetchStudent();
            }
            this.setState({
                dialogMsg: decodeURIComponent(ms)
            });
            this.handleOpen();
        }.bind(this), "debug");
    }

    handleDeleteRequire() {
        Util.deleteJSON(Service.host + Service.deleteRequire, {
            deleteObject: {
                id: this.state.detail.id
            }
        }, function (resp) {
            if (resp.success) {
                this.setState({
                    fetchSuccess: 0
                });
                this.handleDetailClose();
                this.fetchRequireList();
                this.fetchStudent();
            }
            var ms = resp.returnMsg == undefined ? "系统错误" : resp.returnMsg;
            this.setState({
                dialogMsg: decodeURIComponent(ms)
            });
            this.handleOpen();

        }.bind(this), "debug");
    }

    renderDate() {
        if (this.state.type == 0) {
            return (<br/>);
        } else {
            return (<DatePicker hintText="选择日期"
                                okLabel="确定"
                                cancelLabel="取消"
                                value={this.state.dateObject}
                                onChange={this.handleChangeDate.bind(this)}/>);
        }
    }

    /**
     * 渲染方式很简单,内部包含一个表单和历史需求表格
     * @returns {XML}
     */
    render() {
        if (this.state.fetchSuccess >= 2) {

            let studentRow = this.state.studentList.map(
                student => {
                    return (
                        <MenuItem key={student.id} value={student.id} primaryText={student.name}/>)
                }
            );

            let typeMapper = {
                0: "每日需求",
                1: "单次需求"
            };
            let statusMapper = {
                0: "待处理",
                1: "已接受",
                2: "已结束",
                3: "已拒绝",
            };
            var index = 0;
            let requireRow = this.state.requireList.map(r => {
                return (<TableRow key={r.id}>
                    <TableRowColumn>{r.title}</TableRowColumn>
                    <TableRowColumn><FlatButton name={index++} style={{textAlign:"left"}}
                                                onTouchTap={this.handleDetailOpen.bind(this)} label="详细信息"
                                                primary={true}/></TableRowColumn>
                    <TableRowColumn>{statusMapper[r.status]}</TableRowColumn>
                </TableRow>)
            });

            var detailRequire = this.state.detail;
            var detailActions = [];
            let teacherInfo = "";
            let teacherReply = "";
            if (detailRequire.status == 1 || detailRequire.status == 2) {
                teacherInfo = "受理教师:" + detailRequire.teacherName;
                detailActions = [<RaisedButton label="关闭" primary={true}
                                               onTouchTap={this.handleDetailClose.bind(this)}/>,
                    <RaisedButton label="完成需求" secondary={true} onTouchTap={this.handleCloseRequire.bind(this)}
                                  style={{marginLeft:"10px"}}/>];
            }
            else if (detailRequire.status == 3) {
                teacherInfo = "受理教师:" + detailRequire.teacherName;
                teacherReply = "拒绝理由:" + detailRequire.reply;
                detailActions = [<RaisedButton label="关闭" primary={true}
                                               onTouchTap={this.handleDetailClose.bind(this)}/>];
            } else {
                detailActions = [<RaisedButton label="关闭" primary={true}
                                               onTouchTap={this.handleDetailClose.bind(this)}/>,
                    <RaisedButton label="删除需求" secondary={true} onTouchTap={this.handleDeleteRequire.bind(this)}
                                  style={{marginLeft:"10px"}}/>];
            }


            return (
                <div>
                    <div style={styles.container}>
                        <h3>提出新需求</h3>
                        <Dialog
                            title="系统消息"
                            actions={<FlatButton label="关闭" primary={true} onTouchTap={this.handleClose.bind(this)}/>}
                            modal={true}
                            open={this.state.open}
                        >
                            {this.state.dialogMsg}
                        </Dialog>
                        <Dialog
                            title="需求详情"
                            actions={detailActions}
                            modal={true}
                            open={this.state.detailOpen}
                        >
                            标题:{detailRequire.title} <br/>
                            关联学生:{detailRequire.studentName} <br/>
                            类型:{typeMapper[detailRequire.type]} <br/>
                            时间:{detailRequire.time} <br/>
                            日期:{detailRequire.date} <br/>
                            状态:{statusMapper[detailRequire.status]} <br/>
                            {teacherInfo}<br/>
                            {teacherReply}
                            <hr/>
                            内容:{detailRequire.des}

                            <br/>
                        </Dialog>
                        <TextField
                            hintText="输入需求标题"
                            ref="title"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange.bind(this)}
                            errorText={this.state.errorDes}
                        /><br />
                        <SelectField
                            name={"type"}
                            value={this.state.type} onChange={this.handleChangeType.bind(this)}
                            hintText="选择需求类型">
                            <MenuItem name={"type"} value={0} primaryText="每日"/>
                            <MenuItem name={"type"} value={1} primaryText="单次"/>
                        </SelectField>
                        <br/>
                        <SelectField
                            name={"studentId"}
                            value={this.state.studentId} onChange={this.handleChangeStudentId.bind(this)}
                            hintText="选择关联学生">
                            {studentRow}
                        </SelectField>
                        {this.renderDate()}
                        <TimePicker
                            format="24hr"
                            ref="time"
                            name="time"
                            hintText="选择时间"
                            okLabel="确定"
                            cancelLabel="取消"
                            value={this.state.timeObject}
                            onChange={this.handleChangeTime.bind(this)}
                        />
                        <br/>
                        <TextField
                            hintText="输入需求详情"
                            ref="des"
                            name="des"
                            value={this.state.des}
                            onChange={this.handleChange.bind(this)}
                            errorText={this.state.errorDes}
                            fullWidth={true}
                            multiLine={true}
                        />
                        <br/>
                        <RaisedButton label="测试-生成需求" secondary={true} onTouchTap={this.generateRequire.bind(this)}
                                      style={styles.button}/>
                        <br/>
                        <RaisedButton label="提交"
                                      onTouchTap={this.handleSubmit.bind(this)}
                                      primary={true} style={styles.button}/>
                    </div>
                    <div>
                        <h3 style={styles.container}>历史需求</h3>
                        <Table
                            selectable={this.state.selectable}>
                            <TableHeader
                                displaySelectAll={this.state.showCheckboxes}
                                adjustForCheckbox={this.state.showCheckboxes}
                            >
                                <TableRow>
                                    <TableHeaderColumn>需求标题</TableHeaderColumn>
                                    <TableHeaderColumn>需求内容</TableHeaderColumn>
                                    <TableHeaderColumn>状态</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                                {requireRow}
                            </TableBody>
                        </Table>
                    </div>
                </div>

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