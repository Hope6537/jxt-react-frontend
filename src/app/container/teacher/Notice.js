/**
 * Created by hope6537 on 16/5/19.
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
import NoticeCard from '../../component/notice/NoticeCard'
import NoticeCardEditor from '../../component/notice/NoticeCardEditor'

export default class NoticeDataComponent extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.setState({
            noticeList: undefined,
            fetchSuccess: 0,
            open: false
        })
    }

    componentDidMount() {
        this.fetchNotice();
    }


    fetchNotice() {
        Util.getJSON(Service.host + Service.fetchNoticeRich, {}, undefined, function (resp) {
            if (resp.success) {
                this.setState({
                    noticeList: resp.data.result,
                    fetchSuccess: this.state.fetchSuccess + 1
                })
            }
        }.bind(this));
    }

    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };

    /**
     * 渲染方式很简单,每个PlanCard包含当天的数据,按照ListView方式放置
     * @returns {XML}
     */
    render() {
        var fetchSuccess = ( this.state.fetchSuccess >= 1);
        if (fetchSuccess) {
            var index = 0;
            var row = this.state.noticeList.map(notice=> {
                var date = new Date(notice.created * 1000);
                date = (date.getFullYear() + "年" + date.getMonth() + "月" + date.getDay() + "日");
                var classes = [];
                notice.relationClasses.map(clz => {
                    classes.push(clz.name)
                });
                index++;
                return (<NoticeCard key={notice.id} isFirst={index==1} date={date} title={notice.title} des={notice.des}
                                    classes={JSON.stringify(classes)}/>)
            });
            return (
                <div>
                    <Dialog
                        title="系统消息"
                        actions={<FlatButton label="关闭" primary={true} onTouchTap={this.handleClose.bind(this)}/>}
                        modal={true}
                        open={this.state.open}
                    >
                        {this.state.dialogMsg}
                    </Dialog>
                    <NoticeCardEditor refresh={this.fetchNotice} callObj={this}/>
                    <br/>
                    {row}
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