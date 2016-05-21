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
            eventList: undefined
        })
    }

    componentDidMount() {
        this.fetchEvent();
    }

    fetchEvent() {
        var query = {
            fetchObject: {
                "isDeleted": "NO"
            }
        };
        Util.getJSON(Service.host + Service.fetchFullEvent, query, undefined, function (resp) {
            if (resp.success) {
                this.setState({
                    eventList: resp.data.result,
                    fetchSuccess: this.state.fetchSuccess + 1
                })
            }
        }.bind(this))

    }

    render() {
        var fetchSuccess = ( this.state.fetchSuccess >= 1);
        if (fetchSuccess) {
            var eventList = this.state.eventList;
            let rows = null;
            if (eventList != undefined) {
                rows = eventList.map(event => {
                    return (<EventCardDetail key={event.id} type="teacher" event={event}/>)
                });
            }
            return (
                <div>
                    <Card>
                        <CardText style={{textAlign: "right",}}>
                            <RaisedButton linkButton={true} label="发布新活动" href="/#/teacher/event/edit/-1"
                                          primary={true}/>
                        </CardText>
                    </Card>
                    <br/>
                    {rows}
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