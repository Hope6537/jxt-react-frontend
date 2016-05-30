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
            title: "",
            des: "",
            reply: "",
            teacherId: 740014,
            open: false,
            detailOpen: false,
            refuseOpen: false
        })
    }

    componentDidMount() {
        this.fetchRequireList();
    }

    fetchRequireList() {
        var query = {};
        if (this.state.teacherId != undefined) {
            query['teacherId'] = this.state.teacherId
        }
        Util.getJSON(Service.host + Service.fetchRequireRichByTeacherId, query, undefined, function (resp) {
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

    handleChange(event, index, value) {
        var newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState)
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
        this.setState({
            dialogMsg: (<RefreshIndicator
                size={20}
                left={0}
                top={20}
                status="loading"
                style={Util.style.refresh}
            />)
        });
        Util.putJSON(Service.host + Service.putRequire, {
            putObject: {
                id: this.state.detail.id,
                status: 2
            }
        }, function (resp) {
            var ms = resp.returnMsg == undefined ? "系统错误" : resp.returnMsg;
            if (resp.success) {
                this.handleDetailClose();
                this.fetchRequireList();
            }
            this.setState({
                dialogMsg: decodeURIComponent(ms)
            });
            this.handleOpen();
        }.bind(this), "debug");
    }


    handleOpenRefuse() {
        this.setState({refuseOpen: true});
    }


    handleAccept() {
        this.setState({
            dialogMsg: (<RefreshIndicator
                size={20}
                left={0}
                top={20}
                status="loading"
                style={Util.style.refresh}
            />)
        });
        Util.putJSON(Service.host + Service.putRequire, {
            putObject: {
                id: this.state.detail.id,
                status: 1,
                teacherId: this.state.teacherId
            }
        }, function (resp) {
            var ms = resp.returnMsg == undefined ? "系统错误" : resp.returnMsg;
            if (resp.success) {
                this.handleDetailClose();
                this.fetchRequireList();
            }
            this.setState({
                dialogMsg: decodeURIComponent(ms)
            });
            this.handleOpen();
        }.bind(this), "debug");
    }

    handleRefuse() {
        this.setState({
            dialogMsg: (<RefreshIndicator
                size={20}
                left={0}
                top={20}
                status="loading"
                style={Util.style.refresh}
            />)
        });
        Util.putJSON(Service.host + Service.putRequire, {
            putObject: {
                id: this.state.detail.id,
                status: 3,
                teacherId: this.state.teacherId,
                reply: this.state.reply
            }
        }, function (resp) {
            var ms = resp.returnMsg == undefined ? "系统错误" : resp.returnMsg;
            if (resp.success) {
                this.handleDetailClose();
                this.handleRefuseClose();
                this.fetchRequireList();
            }
            this.setState({
                dialogMsg: decodeURIComponent(ms)
            });
            this.handleOpen();
        }.bind(this), "debug");
    }

    handleRefuseClose() {
        this.setState({refuseOpen: false});
    }

    handleChangeReply(e) {
        this.setState({reply: e.target.value})
    }

    /**
     * 渲染方式很简单,历史需求表格
     * @returns {XML}
     */
    render() {
        if (this.state.fetchSuccess >= 1) {

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
            let requireRow = this.state.requireList.reverse().map(r => {
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
            if (detailRequire.status == 1) {
                teacherInfo = "受理教师:" + detailRequire.teacherName;
                detailActions = [
                    <RaisedButton label="完成需求" secondary={true} onTouchTap={this.handleCloseRequire.bind(this)}
                                  style={{marginLeft:"10px"}}/>,
                    <RaisedButton label="关闭"
                                  onTouchTap={this.handleDetailClose.bind(this)}/>];
            }
            else if (detailRequire.status == 3) {
                teacherInfo = "受理教师:" + detailRequire.teacherName;
                teacherReply = "拒绝理由:" + detailRequire.reply;
                detailActions = [<RaisedButton label="关闭"
                                               onTouchTap={this.handleDetailClose.bind(this)}/>];
            } else if (detailRequire.status == 2) {
                teacherInfo = "受理教师:" + detailRequire.teacherName;
                detailActions = [<RaisedButton label="关闭"
                                               onTouchTap={this.handleDetailClose.bind(this)}/>];
            } else {
                detailActions = [
                    <RaisedButton label="接收" primary={true} onTouchTap={this.handleAccept.bind(this)}
                                  style={{marginLeft:"10px"}}/>,
                    <RaisedButton label="拒绝" secondary={true} onTouchTap={this.handleOpenRefuse.bind(this)}
                                  style={{marginLeft:"10px"}}/>,
                    <RaisedButton label="关闭" style={{marginLeft:"10px"}}
                                  onTouchTap={this.handleDetailClose.bind(this)}/>
                ];
            }


            return (
                <div>
                    <div>
                        <Dialog
                            title="系统消息"
                            actions={<FlatButton label="关闭"  onTouchTap={this.handleClose.bind(this)}/>}
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
                        <Dialog
                            title="请写出拒绝理由"
                            actions={[
                            <FlatButton label="发送" primary={true} onTouchTap={this.handleRefuse.bind(this)}/>
                            ]}
                            modal={true}
                            open={this.state.refuseOpen}
                        >
                            <TextField
                                onChange={this.handleChangeReply.bind(this)}
                                hintText="输入拒绝理由"
                                value={this.state.reply}
                            /><br />
                        </Dialog>
                        <h3 style={styles.container}>需求列表</h3>
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