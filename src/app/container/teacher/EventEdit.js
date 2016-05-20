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
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
/**
 * 活动编辑页
 */
export default class EventEdit extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.setState({
            classesList: undefined,
            fetchSuccess: 0
        })
    }

    componentDidMount() {
        this.fetchClassesList();
    }


    fetchClassesList() {
        var query = {
            plan: {
                day: Util.getNowDate()
            }
        };
        Util.getJSON(Service.host + Service.fetchClasses, query, undefined, function (resp) {
            if (resp.success) {
                var classesList = resp.data.result;
                this.setState({
                    classesList: classesList,
                    fetchSuccess: this.state.fetchSuccess + 1
                })
            }
        }.bind(this))
    }

    handleSubmit() {
        console.log(this.refs.classesTable);
    }

    render() {

        if (this.state.fetchSuccess >= 1) {
            var classesList = this.state.classesList;
            var classesNameValuePair = {};
            let rows = null;
            if (classesList != undefined) {
                rows = classesList.map(classes => {
                    classesNameValuePair[classes.id] = classes.name;
                    return (<TableRow key={classes.id}>
                        <TableRowColumn>{classes.name}</TableRowColumn>
                    </TableRow>)
                });
            }

            return (
                <Card>
                    <CardTitle title={"发布活动"}/>
                    <CardText>
                        <TextField
                            hintText="输入活动标题"
                        /><br />
                        <TextField
                            hintText="输入活动内容"
                            fullWidth={true}
                            multiLine={true}
                        />
                        <h3>选择活动班级</h3>
                        <Table
                            ref="classesTable"
                            multiSelectable={true}
                            enableSelectAll={true}
                            style={{marginBottom:"20px"}}
                        >
                            <TableHeader
                            >
                                <TableRow>
                                    <TableHeaderColumn>班级名称</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows}
                            </TableBody>
                        </Table>
                        <RaisedButton label={"发布活动"} onTouchTap={this.handleSubmit.bind(this)} primary={true}/>
                    </CardText>
                </Card>
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