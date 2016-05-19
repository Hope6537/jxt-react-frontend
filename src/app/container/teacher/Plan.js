/**
 * Created by hope6537 on 16/5/19.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PlanCard from '../../component/plan/PlanCard'
import PlanCardEditor from '../../component/plan/PlanCardEditor'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


export default class PlanDataComponent extends React.Component {

    constructor() {
        super();
        this.handleChangePlanClass = this.handleChangePlanClass.bind(this);
    }

    handleChangePlanClass(event, index, value) {
        this.setState({mealClassId: value});
    }

    componentWillMount() {
        this.setState({
            selectable: false,
            showCheckboxes: false,
            mealClassId: null,
        })
    }

    /**
     * 渲染方式很简单,每个PlanCard包含当天的数据,按照ListView方式放置
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <Card style={{marginBottom:"20px"}}>
                    <CardTitle title={"编辑今日餐谱"}/>
                    <CardText>
                        <SelectField value={this.state.mealClassId} onChange={this.handleChangePlanClass}
                                     hintText="选择班级">
                            <MenuItem value={1} primaryText="A班"/>
                            <MenuItem value={2} primaryText="B班"/>
                        </SelectField>
                        <br/>
                        <PlanCardEditor/>
                    </CardText>
                    <CardActions>
                        <RaisedButton label="应用到当前班级"/>
                        <RaisedButton label="应用到所有班级" primary={true}/>
                    </CardActions>
                </Card>
                <br/>
                <PlanCard date="2016年05月18日" isFirst={true}/>
                <PlanCard date="2016年05月17日"/>
                <PlanCard date="2016年05月16日"/>
                <PlanCard date="2016年05月15日"/>
                <PlanCard date="2016年05月14日"/>
                <PlanCard date="2016年05月13日"/>
                <PlanCard date="2016年05月12日"/>
                <PlanCard date="2016年05月11日"/>
            </div>

        )
    }
}