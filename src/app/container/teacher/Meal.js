/**
 * Created by hope6537 on 16/5/19.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Util from '../../util'
import Service from '../../service'

import MealCard from '../../component/meal/MealCard'
import MealCardEditor from '../../component/meal/MealCardEditor'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


export default class MealDataComponent extends React.Component {

    constructor() {
        super();
        this.handleChangeMealClass = this.handleChangeMealClass.bind(this);
    }

    handleChangeMealClass(event, index, value) {
        this.setState({mealClassId: value});
    }

    componentWillMount() {
        this.setState({
            selectable: false,
            showCheckboxes: false,
            mealClassId: null,
        })
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Card style={{marginBottom:"20px"}}>
                    <CardTitle title={"编辑今日餐谱"}/>
                    <CardText>
                        <SelectField value={this.state.mealClassId} onChange={this.handleChangeMealClass}
                                     hintText="选择班级">
                            <MenuItem value={1} primaryText="A班"/>
                            <MenuItem value={2} primaryText="B班"/>
                        </SelectField>
                        <br/>
                        <MealCardEditor type="早餐"/>
                        <MealCardEditor type="午餐"/>
                        <MealCardEditor type="晚餐"/>
                    </CardText>
                    <CardActions>
                        <RaisedButton label="应用到当前班级"/>
                        <RaisedButton label="应用到所有班级" primary={true}/>
                    </CardActions>
                </Card>
                <br/>
                <div>
                    <MealCard date="2016年05月18日" isFirst={true}/>
                    <MealCard date="2016年05月17日"/>
                    <MealCard date="2016年05月16日"/>
                    <MealCard date="2016年05月15日"/>
                </div>
            </div>
        )
    }
}