import React from 'react';
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
const cardTextStyle = {
    paddingBottom: "150px",
};

const styles = {
    container: {
        marginLeft: "20px"
    },
    button: {
        marginTop: "20px",
        marginBottom: "20px"
    }
};

/**
 * 作息卡片编辑
 * Created by hope6537 on 16/5/18.
 */
export default class PlanCard extends React.Component {

    renderCardHeader(date) {
        return <CardHeader
            title="今日作息时间编辑"
        />
    }

    componentWillMount() {
        this.setState({
            selectable: false,
            showCheckboxes: false,
        })
    }

    /**
     * 在这里放置一个Date
     * @returns {XML}
     */
    renderCardText() {
        return <CardText>
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
                <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                    <TableRow>
                        <TableRowColumn>08:00-10:00</TableRowColumn>
                        <TableRowColumn><TextField
                            hintText="输入内容"
                        /></TableRowColumn>
                        <TableRowColumn><TextField
                            hintText="输入备注"
                        /></TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>10:00-12:00</TableRowColumn>
                        <TableRowColumn><TextField
                            hintText="输入内容"
                        /></TableRowColumn>
                        <TableRowColumn><TextField
                            hintText="输入备注"
                        /></TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>12:00-14:00</TableRowColumn>
                        <TableRowColumn><TextField
                            hintText="输入内容"
                        /></TableRowColumn>
                        <TableRowColumn><TextField
                            hintText="输入备注"
                        /></TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>14:00-16:00</TableRowColumn>
                        <TableRowColumn><TextField
                            hintText="输入内容"
                        /></TableRowColumn>
                        <TableRowColumn><TextField
                            hintText="输入备注"
                        /></TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        </CardText>
    }

    render() {
        return (
            <Card>
                {this.renderCardHeader()}
                {this.renderCardText()}
            </Card>
        )
    }
}