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
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Util from '../../util'
import Service from '../../service'

import MealCard from '../../component/meal/MealCard'
import MealCardEditor from '../../component/meal/MealCardEditor'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


const style = {
    container: {
        position: 'relative',
        paddingBottom: "1000px",
        textAlign: "center",
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
    },
};

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
            mealList: [],
            selectable: false,
            showCheckboxes: false,
            mealClassId: null,
            fetchSuccess: 0
        })
    }

    /**
     * 在这里读取整个Meal列表
     */
    componentDidMount() {
        this.fetchMeal();
    }

    fetchMeal() {
        console.log("fetch meal");
        Util.getJSON(Service.host + Service.fetchMeal, {meal: {isDeleted: "0"}}, null, function (resp) {
            if (resp.success) {
                this.setState({
                    mealList: resp.data.result,
                    fetchSuccess: this.state.fetchSuccess + 1
                });
            }
        }.bind(this))
    }

    render() {
        if (this.state.fetchSuccess >= 1) {
            var mealList = this.state.mealList;
            let rows = null;
            var index = 0;
            if (mealList != undefined) {
                rows = mealList.map(meal => {
                    var isFirst = false;
                    if (index == 0) {
                        isFirst = true;
                    }
                    index++;
                    return <MealCard key={meal.id} date={meal.day} data={meal} isFirst={isFirst}/>
                });
            }

            return (
                <div>
                    <Card style={{marginBottom:"20px"}}>
                        <CardTitle title={"编辑今日餐谱"}/>
                        <CardText>
                            <MealCardEditor fetchMethod={this.fetchMeal} callObj={this} type="早餐"/>
                            <MealCardEditor fetchMethod={this.fetchMeal} callObj={this} type="午餐"/>
                            <MealCardEditor fetchMethod={this.fetchMeal} callObj={this} type="晚餐"/>
                        </CardText>
                    </Card>
                    <br/>
                    <div>
                        {rows}
                    </div>
                </div>
            )
        } else {
            return (
                <div style={Util.style.container} ref="loading">
                    <RefreshIndicator
                        size={100}
                        left={0}
                        top={20}
                        status="loading"
                        style={Util.style.refresh}
                    />
                </div>
            )
        }


    }
}