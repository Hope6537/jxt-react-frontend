/**
 * 活动组件
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

import EventCardDetail from '../../component/event/EventCardDetail'
import Parent from '../Parent'

export default class EventDataComponent extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.setState({
            fetchSuccess: 0,
            eventList: undefined,
            open: false
        })
    }


    componentDidMount() {
        this.fetchEvent();
    }

    fetchEvent() {
        var query = {
            "parentId": "50020"
        };
        Util.getJSON(Service.host + Service.fetchEventGroupByStudent, query, undefined, function (resp) {
            if (resp.success) {
                this.setState({
                    studentList: resp.data.result,
                    fetchSuccess: this.state.fetchSuccess + 1
                })
            }
        }.bind(this))

    }

    render() {


        var fetchSuccess = ( this.state.fetchSuccess >= 1);
        if (fetchSuccess) {
            var studentList = this.state.studentList;
            //需要处理的活动
            let needHandleData = [];
            let alreadyHandleData = [];
            if (studentList != undefined) {
                studentList.map(student => {
                    var eventList = student.relationEventList;
                    eventList.map(event=> {
                        if (event.joinStatus == 0 || event.joinStatus == undefined) {
                            needHandleData.push(<EventCardDetail refresh={this.fetchEvent} callObj={this}
                                                                 key={event.id+":"+student.id}
                                                                 student={{id:student.id,name:student.name}}
                                                                 event={event}/>);
                        }
                        if (event.joinStatus == 1 || event.joinStatus == 2) {
                            alreadyHandleData.push(<EventCardDetail refresh={this.fetchEvent} callObj={this}
                                                                    key={event.id+":"+student.id}
                                                                    student={{id:student.id,name:student.name}}
                                                                    event={event}/>);
                        }

                    });
                });
            }
            return (
                <div>
                    <Card>
                        <CardTitle title="待处理活动"/>
                        {needHandleData}
                    </Card>
                    <Card>
                        <CardTitle title="已处理活动"/>
                        {alreadyHandleData}
                    </Card>
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