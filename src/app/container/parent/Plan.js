import React from 'react';
import ReactDOM from 'react-dom';
import PlanCard from '../../component/plan/PlanCard'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Util from '../../util'
import Service from '../../service'
import RefreshIndicator from 'material-ui/RefreshIndicator';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


const style = {
    container: {
        position: 'relative',
        paddingBottom: "1000px"
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
    },
};

export default class PlanDataComponent extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {

        this.setState({
            selectable: false,
            showCheckboxes: false,
            planList: undefined,
            classesList: undefined,
            fetchSuccess: 0,
        })
    }

    componentDidMount() {
        var width = 500;
        var container = ReactDOM.findDOMNode(this.refs.loading);
        if (container != null) {
            width = container.offsetWidth;
        }
        this.setState({
            width: width
        });
        this.fetchClassesList();
        this.fetchPlanList();
    }


    fetchPlanList() {
        var query = {
            fetchObject: {
                isDeleted: "NO"
            }
        };
        Util.getJSON(Service.host + Service.fetchPlan, query, undefined, function (resp) {
            if (resp.success) {
                var planList = resp.data.result;
                this.setState({
                    planList: planList,
                    fetchSuccess: this.state.fetchSuccess + 1
                })
            }
        }.bind(this))
    }

    fetchClassesList() {
        Util.getJSON(Service.host + Service.fetchClasses, {}, undefined, function (resp) {
            if (resp.success) {
                var classesList = resp.data.result;
                this.setState({
                    classesList: classesList,
                    fetchSuccess: this.state.fetchSuccess + 1
                })
            }
        }.bind(this))
    }


    /**
     * 渲染方式很简单,每个PlanCard包含当天的数据,按照ListView方式放置
     * @returns {XML}
     */
    render() {

        if (this.state.fetchSuccess >= 2) {
            var classesList = this.state.classesList;
            var classesNameValuePair = {};
            if (classesList != undefined) {
                classesList.map(classes => {
                    classesNameValuePair[classes.id] = classes.name;
                });
            }
            var planList = this.state.planList;
            let planRow = null;
            var index = 0;
            if (planList != undefined && classesList != undefined) {
                planRow = planList.map(plan => {
                    index++;
                    return <PlanCard className={classesNameValuePair[plan.classesId]} date={plan.day} data={plan}
                                     key={plan.id}
                                     isFirst={index==1}/>
                });
            }
            return (
                <div>
                    {planRow}
                </div>

            )
        } else {
            return (
                <div style={style.container} ref="loading">
                    <RefreshIndicator
                        size={100}
                        left={(this.state.width/2) - 50}
                        top={20}
                        status="loading"
                        style={style.refresh}
                    />
                </div>
            )
        }

    }
}