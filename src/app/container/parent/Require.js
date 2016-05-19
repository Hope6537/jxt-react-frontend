/**
 * 需求组件
 * Created by hope6537 on 16/5/18.
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
import NoticeCard from '../../component/notice/NoticeCard'


const styles = {
    container: {
        marginLeft: "20px"
    },
    button: {
        marginTop: "20px",
        marginBottom: "20px"
    }
}

class RequireDataComponent extends React.Component {

    constructor() {
        super();
        this.handleChangeRequireType = this.handleChangeRequireType.bind(this);
        this.handleChangeTargetTeacherId = this.handleChangeTargetTeacherId.bind(this);
    }

    componentWillMount() {
        this.setState({
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

    /**
     * 渲染方式很简单,内部包含一个表单和历史需求表格
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <div style={styles.container}>
                    <h3>提出新需求</h3>
                    <TextField
                        hintText="输入需求标题"
                    /><br />
                    <SelectField value={this.state.requireType} onChange={this.handleChangeRequireType}
                                 hintText="选择需求类型">
                        <MenuItem value={1} primaryText="定期"/>
                        <MenuItem value={2} primaryText="单次"/>
                    </SelectField>
                    <br/>
                    <SelectField value={this.state.targetTeacherId} onChange={this.handleChangeTargetTeacherId}
                                 hintText="选择受理教师">
                        <MenuItem value={1} primaryText="刘老师"/>
                        <MenuItem value={2} primaryText="王老师"/>
                    </SelectField>
                    {this.renderDate()}
                    <TimePicker
                        format="24hr"
                        hintText="选择时间"
                    />

                    <br/>
                    <TextField
                        hintText="输入需求详情"
                        fullWidth={true}
                        multiLine={true}
                    />
                    <br/>
                    <RaisedButton label="提交" primary={true} style={styles.button}/>
                </div>
                <div>
                    <h3 style={styles.container}>历史需求</h3>
                    <Table
                        selectable={this.state.selectable}>
                        <TableHeader
                            displaySelectAll={this.state.showCheckboxes}
                            adjustForCheckbox={this.state.showCheckboxes}
                        >
                            <TableRow>
                                <TableHeaderColumn>需求标题</TableHeaderColumn>
                                <TableHeaderColumn>需求内容</TableHeaderColumn>
                                <TableHeaderColumn>受理人</TableHeaderColumn>
                                <TableHeaderColumn>状态</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                            <TableRow>
                                <TableRowColumn>标题</TableRowColumn>
                                <TableRowColumn>点击弹出Dialog</TableRowColumn>
                                <TableRowColumn>刘老师</TableRowColumn>
                                <TableRowColumn>接受</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>标题</TableRowColumn>
                                <TableRowColumn>点击弹出Dialog</TableRowColumn>
                                <TableRowColumn>刘老师</TableRowColumn>
                                <TableRowColumn>接受</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>标题</TableRowColumn>
                                <TableRowColumn>点击弹出Dialog</TableRowColumn>
                                <TableRowColumn>刘老师</TableRowColumn>
                                <TableRowColumn>接受</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>标题</TableRowColumn>
                                <TableRowColumn>点击弹出Dialog</TableRowColumn>
                                <TableRowColumn>刘老师</TableRowColumn>
                                <TableRowColumn>接受</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>

        )
    }
}

const Require = () => (
    <Parent dataComponent={<RequireDataComponent/>}/>
);

export default Require;
