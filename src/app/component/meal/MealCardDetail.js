
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

        return (
            <Card style={cardDetailStyle}>
                <CardHeader
                    title={mealCardType}
                />
                <CardTitle title="Card title" subtitle="Card subtitle"/>
                <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
                <CardActions>
                    <FlatButton label="好评"/>
                    <FlatButton label="差评"/>
                </CardActions>
            </Card>
        )
    }
}
