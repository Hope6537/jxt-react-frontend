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
 * 通知信息列
 * Created by hope6537 on 16/5/18.
 */
export default class MealCard extends React.Component {


    renderCardHeader(date) {
        return <CardHeader
            title="通知的标题"
            subtitle={date}
            actAsExpander={true}
            showExpandableButton={true}
        />
    }

    renderCardText() {
        return <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
    }

    /**
     * 渲染方式很无脑,放置一个Extendable的Card,里面再装3个Card
     * @returns {XML}
     */
    render() {

        var date = this.props.date;
        var isFirst = this.props.isFirst == undefined ? false : this.props.isFirst;
        if (isFirst) {
            return (
                <Card expanded={true}>
                    {this.renderCardHeader(date)}
                    {this.renderCardText()}
                </Card>
            )
        } else {
            return (
                <Card>
                    {this.renderCardHeader(date)}
                    {this.renderCardText()}
                </Card>
            )
        }

    }
}
