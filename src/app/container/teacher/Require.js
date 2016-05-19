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
import Dialog from 'material-ui/Dialog';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import Parent from '../Parent'
import NoticeCard from '../../component/notice/NoticeCard'

const styles = {
    container: {
        marginLeft: "20px"
    },
    button: {
        marginTop: "20px",
        marginBottom: "20px"
    },
    leftButton: {
        textAlign: "left"
    }
};

export default class RequireDataComponent extends React.Component {

    constructor() {
        super();
        this.handleChangeRequireType = this.handleChangeRequireType.bind(this);
        this.handleChangeTargetTeacherId = this.handleChangeTargetTeacherId.bind(this);
        this.handleRefuseOpen = this.handleRefuseOpen.bind(this);
        this.handleDetailOpen = this.handleDetailOpen.bind(this);
        this.handleRefuseClose = this.handleRefuseClose.bind(this);
        this.handleDetailClose = this.handleDetailClose.bind(this);
    }

    componentWillMount() {
        this.setState({
            refuseOpen: false,
            detailOpen: false,
            selectable: false,
            showCheckboxes: false,
            requireType: null,
            targetTeacherId: null,
        })
    }

    handleChangeRequireType(event, index, value) {
        this.setState({requireType: value});
    }

    handleChangeTargetTeacherId(event, index, value) {
        this.setState({targetTeacherId: value});
    }

    renderDate() {
        if (this.state.requireType == 1) {
            return (<br/>);
        } else {
            return (<DatePicker hintText="选择日期"/>);
        }
    }

    handleDetailOpen() {
        this.setState({detailOpen: true});
    };

    handleDetailClose() {
        this.setState({detailOpen: false});
    };


    handleRefuseOpen() {
        this.setState({refuseOpen: true});
    };

    handleRefuseClose() {
        this.setState({detailOpen: false, refuseOpen: false});
    };

    /**
     * 渲染方式很简单,内部包含一个表单和历史需求表格
     * @returns {XML}
     */
    render() {

        const refuseActions = [
            <FlatButton
                label="提交"

                onTouchTap={this.handleRefuseClose}
            />,
        ];

        const detailActions = [
            <RaisedButton style={{marginRight:"10px"}} label="接受" onTouchTap={this.handleDetailClose}
            />,
            <RaisedButton label="拒绝"
                          onTouchTap={this.handleRefuseOpen}
                          secondary={true}/>
        ]

        return (
            <div>
                <div>
                    <h3 style={styles.container}>需求列表</h3>
                    <Dialog
                        title="需求详情"
                        actions={detailActions}
                        modal={true}
                        open={this.state.detailOpen}
                    >
                        写代码需要加班,帮忙看下孩子到5:00pm
                    </Dialog>
                    <Dialog
                        title="请写出拒绝理由"
                        actions={refuseActions}
                        modal={true}
                        open={this.state.refuseOpen}
                    >
                        <TextField
                            hintText="拒绝理由"
                        /><br />
                    </Dialog>
                    <Table
                        selectable={this.state.selectable}>
                        <TableHeader
                            displaySelectAll={this.state.showCheckboxes}
                            adjustForCheckbox={this.state.showCheckboxes}
                        >
                            <TableRow>
                                <TableHeaderColumn>需求标题</TableHeaderColumn>
                                <TableHeaderColumn>需求内容</TableHeaderColumn>
                                <TableHeaderColumn>发起家长</TableHeaderColumn>
                                <TableHeaderColumn>状态</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                            <TableRow>
                                <TableRowColumn>标题</TableRowColumn>
                                <TableRowColumn><FlatButton style={styles.leftButton} label="详情"
                                                            onTouchTap={this.handleDetailOpen}
                                /></TableRowColumn>
                                <TableRowColumn>家长</TableRowColumn>
                                <TableRowColumn>待跟进</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>标题</TableRowColumn>
                                <TableRowColumn><FlatButton style={styles.leftButton}
                                                            label="详情" onTouchTap={this.handleDetailOpen}
                                /></TableRowColumn>
                                <TableRowColumn>家长</TableRowColumn>
                                <TableRowColumn>待跟进</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>标题</TableRowColumn>
                                <TableRowColumn><FlatButton style={styles.leftButton} label="详情"
                                                            onTouchTap={this.handleDetailOpen}
                                /></TableRowColumn>
                                <TableRowColumn>家长</TableRowColumn>
                                <TableRowColumn>待跟进</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>标题</TableRowColumn>
                                <TableRowColumn><FlatButton label="详情"
                                                            style={styles.leftButton}
                                                            onTouchTap={this.handleDetailOpen}
                                /></TableRowColumn>
                                <TableRowColumn>家长</TableRowColumn>
                                <TableRowColumn>待跟进</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>

        )
    }
}