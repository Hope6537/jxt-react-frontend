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
export default class NoticeCardEditor extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.setState({
            classesList: undefined,
            noticeId: undefined,
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
        this.fetchClassesList();
    }

    /**
     * 获取班级列表
     */
    fetchClassesList() {
        var query = {
            //TODO:教师所属班级集合
        };

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

    generateNotice() {
        var data = {
            title: "通知内容",
            des: "通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容",
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

    handleSubmit() {
        var classesIdList = this.handleSelection();
        var noticeData = {
            postObject: {
                classesIdList: classesIdList,
                title: this.state.title,
                des: this.state.des
            }
        };
        var that = this;
        Util.postJSON(Service.host + Service.postNoticeRich, noticeData, function (resp) {
            if (resp.success) {
                that.setState({
                    dialogMsg: decodeURIComponent(resp.returnMsg)
                });
                that.handleOpen();
                this.props.refresh.call(this.props.callObj)
            }
        }.bind(this), 'debug')
    }

    render() {
        var fetchSuccess = ( this.state.fetchSuccess >= 1);
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

            return (
                <Card>
                    <CardTitle title={"发布通知"}/>
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
                        <RaisedButton label={"测试-生成通知"} onTouchTap={this.generateNotice.bind(this)} secondary={true}/>
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
                        <RaisedButton label={"发布通知"}
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