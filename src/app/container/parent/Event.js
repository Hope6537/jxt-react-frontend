/**
 * 活动组件
 * Created by hope6537 on 16/5/18.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import EventCardDetail from '../../component/event/EventCardDetail'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Parent from '../Parent'

class EventDataComponent extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div>
                    <h3>待跟进活动</h3>
                    <EventCardDetail event={{title:"活动1",des:"活动描述",status:"0"}}/>
                    <EventCardDetail event={{title:"活动2",des:"活动描述",status:"0"}}/>
                </div>
                <div>
                    <h3>历史活动</h3>
                    <EventCardDetail event={{title:"活动3",des:"活动描述"}}/>
                    <EventCardDetail event={{title:"活动4",des:"活动描述"}}/>
                    <EventCardDetail event={{title:"活动4",des:"活动描述"}}/>
                    <EventCardDetail event={{title:"活动4",des:"活动描述"}}/>
                    <EventCardDetail event={{title:"活动4",des:"活动描述"}}/>
                    <EventCardDetail event={{title:"活动4",des:"活动描述"}}/>
                    <EventCardDetail event={{title:"活动4",des:"活动描述"}}/>

                </div>
            </div>

        )
    }
}

const Event = () => (
    <Parent dataComponent={<EventDataComponent/>}/>
);

export default Event;
