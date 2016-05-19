import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
const cardDetailStyle = {
    width: "300px",
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "10px",
    marginRight: "20px",
    display: 'inline-block',
};

/**
 * 餐谱卡片编辑器
 * Created by hope6537 on 16/5/18.
 */
export default class MealCardEditor extends React.Component {

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
                <CardText>
                    <input type="file" label="上传餐点图片"/>
                    <br/>
                    <TextField
                        hintText="输入餐点名称"
                    /><br />
                    <TextField
                        hintText="输入餐点描述"
                        fullWidth={true}
                        multiLine={true}
                    />
                </CardText>
                <CardActions>
                    <RaisedButton label="保存变更" primary={true}/>
                </CardActions>
            </Card>
        )
    }
}
