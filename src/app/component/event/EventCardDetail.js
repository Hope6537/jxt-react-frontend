import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const cardDetailStyle = {
    width: "300px",
    height: "500px",
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "30px",
    marginRight: "20px",
    display: 'inline-block',
};

/**
 * 活动信息
 * Created by hope6537 on 16/5/18.
 */
export default class EventCardDetail extends React.Component {

    constructor() {
        super();
    }

    render() {

        var eventTitle = this.props.event.title;
        var eventDes = this.props.event.des;
        var eventStatus = this.props.event.status;

        if (eventStatus == "0") {
            return (
                <Card style={cardDetailStyle}>
                    <CardHeader
                        title={eventTitle}
                    />
                    <CardTitle title="Card title" subtitle="Card subtitle"/>
                    <CardText style={{height:"250px"}}>
                        {eventDes}
                    </CardText>
                    <CardActions>
                        <FlatButton label="同意参加"/>
                        <FlatButton label="拒绝参加"/>
                    </CardActions>
                </Card>
            )
        } else {
            return (
                <Card style={cardDetailStyle}>
                    <CardHeader
                        title={eventTitle}
                    />
                    <CardTitle title="Card title" subtitle="Card subtitle"/>
                    <CardText style={{height:"250px"}}>
                        {eventDes}
                    </CardText>
                </Card>
            )
        }

    }
}