import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
const cardDetailStyle = {
    width: "320px",
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

        var cardType = this.props.type == undefined ? "parent" : this.props.type;
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
                        <RaisedButton style={{marginLeft:"0px"}} linkButton={true} label="详情" href="/#/event/info/123"
                                      primary={true}/>
                        <FlatButton label="同意"/>
                        <FlatButton label="拒绝"/>
                    </CardActions>
                </Card>
            )
        } else {
            var buttonLabel = cardType == "teacher" ? "编辑" : "编辑";
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
                        <RaisedButton style={{marginLeft:"0px"}} linkButton={true} label={buttonLabel}
                                      href="/#/teacher/event/edit/123"
                                      primary={true}/>
                    </CardActions>
                </Card>
            )
        }

    }
}
