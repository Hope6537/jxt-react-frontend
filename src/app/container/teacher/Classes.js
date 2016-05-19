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
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import Parent from '../Parent'


const styles = {
    container: {
        marginLeft: "20px"
    },
    button: {
        marginTop: "20px",
        marginBottom: "20px"
    }
}

export default class FeedbackDataComponent extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.setState({
            selectable: false,
            showCheckboxes: false,
            requireType: null,
            targetTeacherId: null,
        })
    }

    /**
     * 渲染方式很简单,内部包含一个表单和历史需求表格
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <div>
                    <h3 style={styles.container}>班级管理</h3>
                    <Table
                        selectable={this.state.selectable}>
                        <TableHeader
                            displaySelectAll={this.state.showCheckboxes}
                            adjustForCheckbox={this.state.showCheckboxes}
                        >
                            <TableRow>
                                <TableHeaderColumn>学号</TableHeaderColumn>
                                <TableHeaderColumn>姓名</TableHeaderColumn>
                                <TableHeaderColumn>家长</TableHeaderColumn>
                                <TableHeaderColumn>操作</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                            <TableRow>
                                <TableRowColumn>000001</TableRowColumn>
                                <TableRowColumn>小刘</TableRowColumn>
                                <TableRowColumn>家长</TableRowColumn>
                                <TableRowColumn>查看信息</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>000002</TableRowColumn>
                                <TableRowColumn>小张</TableRowColumn>
                                <TableRowColumn>家长</TableRowColumn>
                                <TableRowColumn>查看信息</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>

        )
    }
}
