/**
 * 反馈组件
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


const styles = {
    container: {
        marginLeft: "20px"
    },
    button: {
        marginTop: "20px",
        marginBottom: "20px"
    }
}

class FeedbackDataComponent extends React.Component {

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
                <div style={styles.container}>
                    <h3>提出反馈</h3>
                    <TextField
                        hintText="标题"
                    /><br />
                    <br/>
                    <TextField
                        hintText="反馈内容"
                        fullWidth={true}
                        multiLine={true}
                    />
                    <br/>
                    <RaisedButton label="提交" primary={true} style={styles.button}/>
                </div>
                <div>
                    <h3 style={styles.container}>历史反馈</h3>
                    <Table
                        selectable={this.state.selectable}>
                        <TableHeader
                            displaySelectAll={this.state.showCheckboxes}
                            adjustForCheckbox={this.state.showCheckboxes}
                        >
                            <TableRow>
                                <TableHeaderColumn>时间</TableHeaderColumn>
                                <TableHeaderColumn>反馈标题</TableHeaderColumn>
                                <TableHeaderColumn>反馈内容</TableHeaderColumn>
                                <TableHeaderColumn>回复</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                            <TableRow>
                                <TableRowColumn>2016年05月19日14:09:33</TableRowColumn>
                                <TableRowColumn>学校太垃圾</TableRowColumn>
                                <TableRowColumn>真垃圾</TableRowColumn>
                                <TableRowColumn>尼玛,有种转学啊</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>2016年05月19日14:09:33</TableRowColumn>
                                <TableRowColumn>学校太垃圾</TableRowColumn>
                                <TableRowColumn>真垃圾</TableRowColumn>
                                <TableRowColumn>尼玛,有种转学啊</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>2016年05月19日14:09:33</TableRowColumn>
                                <TableRowColumn>学校太垃圾</TableRowColumn>
                                <TableRowColumn>真垃圾</TableRowColumn>
                                <TableRowColumn>尼玛,有种转学啊</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>2016年05月19日14:09:33</TableRowColumn>
                                <TableRowColumn>学校太垃圾</TableRowColumn>
                                <TableRowColumn>真垃圾</TableRowColumn>
                                <TableRowColumn>尼玛,有种转学啊</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>

        )
    }
}

const Feedback = () => (
    <Parent dataComponent={<FeedbackDataComponent/>}/>
);

export default Feedback;
