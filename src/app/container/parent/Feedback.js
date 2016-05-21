/**
 * 反馈组件
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
import Util from '../../util'
import Service from '../../service'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import Parent from '../Parent'


const styles = {
    container: {
        marginLeft: "20px"
    },
    button: {
        marginTop: "20px",
        marginBottom: "20px"
    }
}

export default class FeedbackDataComponent extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.setState({
            parentId: "50020",
            selectable: false,
            showCheckboxes: false,
            classesList: undefined,
            noticeId: undefined,
            fetchSuccess: 0,
            selectedList: [],
            classesIndexValuePair: undefined,
            open: false,
            title: "",
            des: ""
        })
    }

    componentDidMount() {
        this.fetchFeedBack();
    }

    handleChange(event) {
        var newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState)
    }

    fetchFeedBack() {
        var query = {
            fetchObject: {
                parentId: this.state.parentId
            }
        };
        Util.getJSON(Service.host + Service.fetchFeedBack, query, undefined, function (resp) {
            if (resp.success) {
                this.setState({
                    feedbackList: resp.data.result,
                    fetchSuccess: this.state.fetchSuccess + 1,
                })
            }
        }.bind(this));
    }


    generateNotice() {
        var data = {
            title: "反馈标题",
            des: "反馈内容,反馈内容,反馈内容,反馈内容",
        };
        this.setState(data)
    }


    handleSubmit() {
        var noticeData = {
            postObject: {
                title: this.state.title,
                des: this.state.des,
                parentId: this.state.parentId
            }
        };
        var that = this;
        Util.postJSON(Service.host + Service.postFeedBack, noticeData, function (resp) {
            if (resp.success) {
                that.setState({
                    dialogMsg: decodeURIComponent(resp.returnMsg)
                });
                that.handleOpen();
                this.fetchFeedBack()
            }
        }.bind(this), 'debug')
    }

    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };

    /**
     * 渲染方式很简单,内部包含一个表单和历史需求表格
     * @returns {XML}
     */
    render() {
        var fetchSuccess = ( this.state.fetchSuccess >= 1);
        if (fetchSuccess) {
            var row = this.state.feedbackList.map(feedback=> {
                var created = Util.parseDate(feedback.created);
                var reply = feedback.reply == undefined ? "尚未回复,请稍等" : feedback.reply;
                return (<TableRow key={feedback.id}>
                    <TableRowColumn>{feedback.title}</TableRowColumn>
                    <TableRowColumn>{feedback.des}</TableRowColumn>
                    <TableRowColumn>{reply}</TableRowColumn>
                </TableRow>)
            });
            return (
                <div>
                    <div style={styles.container}>
                        <h3>提出反馈</h3>
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
                            hintText="输入通知内容"
                            value={this.state.des}
                            onChange={this.handleChange.bind(this)}
                            errorText={this.state.errorDes}
                            fullWidth={true}
                            multiLine={true}
                        />

                        <Dialog
                            title="系统消息"
                            actions={<FlatButton label="关闭" primary={true} onTouchTap={this.handleClose.bind(this)} />}
                            modal={true}
                            open={this.state.open}
                        >
                            {this.state.dialogMsg}
                        </Dialog>
                        <br/>
                        <RaisedButton label={"测试——生成反馈"} onTouchTap={this.generateNotice.bind(this)} secondary={true}
                                      style={{marginRight:"10px"}}/>
                        <RaisedButton label="提交" primary={true} onTouchTap={this.handleSubmit.bind(this)}
                                      style={styles.button}/>
                    </div>
                    <div>
                        <h3 style={styles.container}>历史反馈</h3>
                        <Table
                            selectable={this.state.selectable}>
                            <TableHeader
                                displaySelectAll={this.state.showCheckboxes}
                                adjustForCheckbox={this.state.showCheckboxes}
                            >
                                <TableRow>
                                    <TableHeaderColumn>反馈标题</TableHeaderColumn>
                                    <TableHeaderColumn>反馈内容</TableHeaderColumn>
                                    <TableHeaderColumn>回复</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                                {row}
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
