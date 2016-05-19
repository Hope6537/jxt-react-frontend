import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

/**
 * 活动编辑页
 */
export default class NoticeCardEditor extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Card>
                <CardTitle title={"发布通知"}/>
                <CardText>
                    <TextField
                        hintText="输入通知标题"
                    /><br />
                    <TextField
                        hintText="输入通知内容"
                        fullWidth={true}
                        multiLine={true}
                    />
                    <h3>选择通知班级</h3>
                    <Table
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
                            <TableRow>
                                <TableRowColumn>A班</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>B班</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>C班</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>D班</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <RaisedButton label={"发布通知"} primary={true}/>
                </CardText>
            </Card>
        )
    }
}