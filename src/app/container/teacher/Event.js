/**
 * Created by hope6537 on 16/5/19.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton'
import EventCardDetail from '../../component/event/EventCardDetail'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Parent from '../Parent'

export default class EventDataComponent extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Card>
                    <CardText style={{textAlign: "right",}}>
                        <RaisedButton linkButton={true} label="发布新活动" href="/#/teacher/event/edit/-1" primary={true}/>
                    </CardText>
                </Card>
                <br/>
                <EventCardDetail type="teacher" event={{title:"活动3",des:"活动描述"}}/>
                <EventCardDetail type="teacher" event={{title:"活动4",des:"活动描述"}}/>
                <EventCardDetail type="teacher" event={{title:"活动4",des:"活动描述"}}/>
                <EventCardDetail type="teacher" event={{title:"活动4",des:"活动描述"}}/>
                <EventCardDetail type="teacher" event={{title:"活动4",des:"活动描述"}}/>
                <EventCardDetail type="teacher" event={{title:"活动4",des:"活动描述"}}/>
                <EventCardDetail type="teacher" event={{title:"活动4",des:"活动描述"}}/>
            </div>

        )
    }
}