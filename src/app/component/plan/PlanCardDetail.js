import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';


/**
 * 作息表格
 * Created by hope6537 on 16/5/18.
 */
export default class PlanCardDetail extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.setState({
            selectable: false,
            showCheckboxes: false
        })
    }


    renderTableBody() {
        var planData = JSON.parse(this.props.data.data);
        if (planData != undefined) {
            return (<TableBody displayRowCheckbox={this.state.showCheckboxes}>
                <TableRow>
                    <TableRowColumn>08:00-08:45</TableRowColumn>
                    <TableRowColumn>{planData.at}</TableRowColumn>
                    <TableRowColumn>{planData.ar}</TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn>08:55-09:30</TableRowColumn>
                    <TableRowColumn>{planData.bt}</TableRowColumn>
                    <TableRowColumn>{planData.br}</TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn>09:50-10:35</TableRowColumn>
                    <TableRowColumn>{planData.ct}</TableRowColumn>
                    <TableRowColumn>{planData.cr}</TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn>10:35-11:20</TableRowColumn>
                    <TableRowColumn>{planData.dt}</TableRowColumn>
                    <TableRowColumn>{planData.dr}</TableRowColumn>
                </TableRow>
            </TableBody>)
        }

    }

    /**
     * 渲染一个表格出来
     * @returns {XML}
     */
    render() {


        return (
            <Table
                selectable={this.state.selectable}>
                <TableHeader
                    displaySelectAll={this.state.showCheckboxes}
                    adjustForCheckbox={this.state.showCheckboxes}
                >
                    <TableRow>
                        <TableHeaderColumn>时间</TableHeaderColumn>
                        <TableHeaderColumn>内容</TableHeaderColumn>
                        <TableHeaderColumn>备注</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                {this.renderTableBody()}
            </Table>
        )
    }
}
