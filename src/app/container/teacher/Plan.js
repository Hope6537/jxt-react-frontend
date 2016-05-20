/**
 * Created by hope6537 on 16/5/19.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PlanCard from '../../component/plan/PlanCard'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Util from '../../util'
import Service from '../../service'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


export default class PlanDataComponent extends React.Component {

    constructor() {
        super();
        this.handleChangePlanClass = this.handleChangePlanClass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitAll = this.handleSubmitAll.bind(this);
        this.handleGenerate = this.handleGenerate.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChangePlanClass(event, index, value) {
        this.setState({planClassesId: value});
    }

    componentWillMount() {
        this.setState({
            selectable: false,
            showCheckboxes: false,
            planClassesId: null,
            classesList: undefined,
            dialogMsg: "",
            open: false,
            at: "",
            ar: "",
            bt: "",
            br: "",
            ct: "",
            cr: "",
            dt: "",
            dr: ""
        })
    }

    componentDidMount() {
        this.fetchClassesList();
    }

    fetchClassesList() {
        var query = {
            plan: {
                day: Util.getNowDate()
            }
        };
        Util.getJSON(Service.host + Service.fetchClasses, query, undefined, function (resp) {
            if (resp.success) {
                var classesList = resp.data.result;
                this.setState({
                    classesList: classesList
                })
            } else {
                this.setState({
                    dialogMsg: decodeURIComponent(resp.returnMsg)
                });
                this.handleOpen()
            }
        }.bind(this))
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

    handleGenerate() {
        var data = {
            at: "上午的课",
            bt: "午前活动",
            ct: "午睡",
            dt: "下午的课",
        };
        this.setState(data)
    }

    handleSubmitAll(e) {
        this.handleSubmit(e, true);
    }


    handleSubmit(e, isAll) {
        var data = {
            at: this.state.at,
            ar: this.state.ar,
            bt: this.state.bt,
            br: this.state.br,
            ct: this.state.ct,
            cr: this.state.cr,
            dt: this.state.dt,
            dr: this.state.dr
        };
        var planClassesId = this.state.planClassesId;

        if (isAll != undefined) {
            planClassesId = "-1";
        }
        if (planClassesId == undefined) {
            alert("请选择班级");
            return;
        }
        var classesList = null;
        //弹出稍候框
        if (planClassesId == "-1") {
            this.setState({
                dialogMsg: decodeURIComponent("正在引用到所有班级,请稍等")
            });
            this.handleOpen();
            classesList = this.state.classesList;

        } else {
            classesList = [{id: planClassesId}];
        }

        classesList.map(classes => {
            var query = {
                fetchObject: {
                    classesId: classes.id,
                    day: Util.getNowDate()
                }
            };
            var sendData = {
                postObject: {
                    classesId: classes.id,
                    day: Util.getNowDate(),
                    data: JSON.stringify(data)
                }
            };
            var that = this;
            Util.getJSON(Service.host + Service.fetchPlan, query, undefined, function (resp) {
                if (resp.success) {
                    //刚刚创建
                    if (resp.data.result.length == 0) {
                        Util.postJSON(Service.host + Service.postPlan, sendData, function (resp) {
                            that.setState({
                                dialogMsg: decodeURIComponent(resp.returnMsg)
                            });
                            that.handleOpen()
                        }, 'debug')
                    }
                    //进行修改
                    else {
                        var id = resp.data.result[0].id;
                        sendData['putObject'] = sendData.postObject;
                        sendData['putObject']['id'] = id;
                        Util.putJSON(Service.host + Service.putPlan, sendData, function (resp) {
                            that.setState({
                                dialogMsg: decodeURIComponent(resp.returnMsg)
                            });
                            that.handleOpen();
                        }, 'debug')
                    }
                } else {
                    this.setState({
                        dialogMsg: decodeURIComponent(resp.returnMsg)
                    });
                    this.handleOpen()
                }
            }.bind(this));
        })

    }


    /**
     * 渲染方式很简单,每个PlanCard包含当天的数据,按照ListView方式放置
     * @returns {XML}
     */
    render() {
        const actions = [
            <FlatButton
                label="关闭"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];
        var classesList = this.state.classesList;
        let rows = null;
        if (classesList != undefined) {
            rows = classesList.map(classes => {
                return <MenuItem key={classes.id} value={classes.id} primaryText={classes.name}/>
            });
        }
        return (
            <div>
                <Card style={{marginBottom:"20px"}}>
                    <CardTitle title={"编辑今日作息"}/>
                    <CardText>
                        <SelectField value={this.state.planClassesId} onChange={this.handleChangePlanClass}
                                     hintText="选择班级">
                            {rows}
                        </SelectField>
                        <Dialog
                            title="系统消息"
                            actions={actions}
                            modal={true}
                            open={this.state.open}
                        >
                            {this.state.dialogMsg}
                        </Dialog>
                        <br/>
                        <Table
                            selectable={this.state.selectable}>
                            <TableHeader
                                displaySelectAll={this.state.showCheckboxes}
                                adjustForCheckbox={this.state.showCheckboxes}
                            >
                                <TableRow>
                                    <TableHeaderColumn>时间</TableHeaderColumn>
                                    <TableHeaderColumn>内容</TableHeaderColumn>
                                    <TableHeaderColumn>备注</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                                <TableRow>
                                    <TableRowColumn>08:00-10:00</TableRowColumn>
                                    <TableRowColumn><TextField ref="at"
                                                               name="at"
                                                               value={this.state.at}
                                                               errorText={this.state.errorDes}
                                                               onChange={this.handleChange.bind(this)}
                                                               hintText="输入内容"
                                    /></TableRowColumn>
                                    <TableRowColumn><TextField ref="ar"
                                                               name="ar"
                                                               value={this.state.ar}
                                                               onChange={this.handleChange.bind(this)}
                                                               errorText={this.state.errorDes}
                                                               hintText="输入备注"
                                    /></TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>10:00-12:00</TableRowColumn>
                                    <TableRowColumn><TextField hintText="输入内容"
                                                               ref="bt"
                                                               name="bt"
                                                               value={this.state.bt}
                                                               onChange={this.handleChange.bind(this)}
                                                               errorText={this.state.errorDes}
                                    /></TableRowColumn>
                                    <TableRowColumn><TextField ref='br'
                                                               name="br"
                                                               value={this.state.br}
                                                               onChange={this.handleChange.bind(this)}
                                                               errorText={this.state.errorDes}
                                                               hintText="输入备注"
                                    /></TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>12:00-14:00</TableRowColumn>
                                    <TableRowColumn><TextField ref="ct"
                                                               name="ct"
                                                               value={this.state.ct}
                                                               onChange={this.handleChange.bind(this)}
                                                               errorText={this.state.errorDes}
                                                               hintText="输入内容"
                                    /></TableRowColumn>
                                    <TableRowColumn><TextField ref="cr"
                                                               name="cr"
                                                               value={this.state.cr}
                                                               onChange={this.handleChange.bind(this)}
                                                               errorText={this.state.errorDes}
                                                               hintText="输入备注"
                                    /></TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>14:00-16:00</TableRowColumn>
                                    <TableRowColumn><TextField ref="dt"
                                                               name="dt"
                                                               value={this.state.dt}
                                                               onChange={this.handleChange.bind(this)}
                                                               errorText={this.state.errorDes}
                                                               hintText="输入内容"
                                    /></TableRowColumn>
                                    <TableRowColumn><TextField ref='dr'
                                                               name="dr"
                                                               value={this.state.dr}
                                                               onChange={this.handleChange.bind(this)}
                                                               errorText={this.state.errorDes}
                                                               hintText="输入备注"
                                    /></TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardText>
                    <CardActions>
                        <RaisedButton label="生成课表" onTouchTap={this.handleGenerate}/>
                        <RaisedButton label="应用到当前班级" onTouchTap={this.handleSubmit}/>
                        <RaisedButton label="应用到所有班级" onTouchTap={this.handleSubmitAll} primary={true}/>
                    </CardActions>
                </Card>
                <br/>
                <PlanCard date="2016年05月18日" isFirst={true}/>
                <PlanCard date="2016年05月17日"/>
                <PlanCard date="2016年05月16日"/>
                <PlanCard date="2016年05月15日"/>
                <PlanCard date="2016年05月14日"/>
                <PlanCard date="2016年05月13日"/>
                <PlanCard date="2016年05月12日"/>
                <PlanCard date="2016年05月11日"/>
            </div>

        )
    }
}