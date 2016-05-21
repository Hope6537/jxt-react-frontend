import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const cardDetailStyle = {
    width: "300px",
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "10px",
    marginRight: "20px",
    display: 'inline-block',
};

/**
 * 餐谱卡片
 * Created by hope6537 on 16/5/18.
 */
export default class MealCardDetail extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        var mealCardType = this.props.type;
        if (mealCardType != undefined) {
            this.setState({
                type: mealCardType
            })
        }
    }

    render() {

        var mealCardType = this.state.type;
        var data = this.props.data;
        data = JSON.parse(data);
        if (data == undefined) {
            data = {
                title: "尚未编辑",
                des: '尚未编辑'
            }
        }

        return (
            <Card style={cardDetailStyle}>
                <CardHeader
                    title={mealCardType}
                />
                <CardTitle title={data.title}/>
                <CardText>
                    {data.des}
                </CardText>
                <CardActions>
                    <FlatButton label="好评"/>
                    <FlatButton label="差评"/>
                </CardActions>
            </Card>
        )
    }
}
