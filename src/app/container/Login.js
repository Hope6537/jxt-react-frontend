/**
 * 登录组件
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
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Util from '../util'
import Service from '../service'
import Parent from './Parent'


const styles = {
    container: {
        marginLeft: "20px"
    },
    button: {
        marginTop: "20px",
        marginBottom: "20px",
        marginRight:"20px"
    }
};

export default class LoginDataComponent extends React.Component {

    constructor() {
        super();
    }

    /**
    当前的初始状态
    1、请求的成功数
    2、当前表单的用户名
    3、当前表单的密码
    4、当前窗口的Dialog状态
    */
    componentWillMount() {
        this.setState({
            fetchSuccess: 0,
            tel: "",
            password: "",
            type:"1",
            open: false
        })

    }

    handleChange(event, index, value) {
        var newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState)
    }

    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };

    handleChangeType(e, i, v) {
        this.setState({
            type: v
        })
    }

    handleSubmit(){
      var data = {
        fetchObject:{
          tel:this.state.tel,
          password:Util.encrypt(this.state.password),
        }
      }
        var url = Service.host;
        if(this.state.type==1){
            url += Service.parentLogin;
        }else if(this.state.type==2){
            url += Service.teacherLogin;
        }else{
          alert("请选择登录类型");
          return;
        }
        console.log(data);
        Util.getJSON(url,data,undefined,function(resp){
          if(resp.success){
              var storage = window.localStorage;
              storage.setItem("token",resp.data.token);
              this.setState({
                  dialogMsg: "登录成功"
              });
              this.handleOpen();
          }else{
            this.setState({
                dialogMsg: decodeURIComponent(resp.returnMsg)
            });
            this.handleOpen();
          }

        }.bind(this))

    }
    generateParent(){
      this.setState({
        tel:"13337571753",
        password:"123",
        type:"1"
      })
    }
    generateTeacher(){
      this.setState({
        tel:"13466871609",
        password:"123",
        type:"2"
      })
    }

    showToken(){
      var storage = window.localStorage;
      this.setState({
          dialogMsg: storage.getItem("token")
      });
      this.handleOpen();
    }

    /**
     * 渲染方式很简单,历史需求表格
     * @returns {XML}
     */
    render() {
        if (this.state.fetchSuccess >= 0) {
            return (
                <div>
                  <Card>
                    <CardTitle title="用户登录"/>
                    <CardText>
                    <SelectField
                        name={"type"}
                        value={this.state.type} onChange={this.handleChangeType.bind(this)}
                        hintText="选择登陆类型">
                        <MenuItem name={"type"} value={"1"} primaryText="家长"/>
                        <MenuItem name={"type"} value={"2"} primaryText="教师"/>
                    </SelectField>
                    <br/>
                    <TextField
                        hintText="输入手机号"
                        ref="tel"
                        name="tel"
                        value={this.state.tel}
                        onChange={this.handleChange.bind(this)}
                        errorText={this.state.errorDes}
                    />
                    <br />
                    <TextField
                        hintText="输入密码"
                        ref="password"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange.bind(this)}
                        errorText={this.state.errorDes}
                    />
                    <br/>
                    <RaisedButton label="测试-家长登录"
                                  onTouchTap={this.generateParent.bind(this)}
                                  secondary={true} style={styles.button}/>
                    <RaisedButton label="测试-教师登录"
                                                onTouchTap={this.generateTeacher.bind(this)}
                                                secondary={true} style={styles.button}/>
                    <br />
                    <RaisedButton label="提交"
                                  onTouchTap={this.handleSubmit.bind(this)}
                                  primary={true} style={styles.button}/>
                    <br />
                    <RaisedButton label="测试-查看当前登录Token"
                                  onTouchTap={this.showToken.bind(this)}
                                  primary={true} style={styles.button}/>
                    </CardText>
                  </Card>
                        <Dialog
                            title="系统消息"
                            actions={<FlatButton label="关闭"  onTouchTap={this.handleClose.bind(this)}/>}
                            modal={true}
                            open={this.state.open}
                        >
                            {this.state.dialogMsg}
                        </Dialog>

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
