import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Util from  '../../util'
import Service from  '../../service'

const cardDetailStyle = {
    width: "300px",
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "10px",
    marginRight: "20px",
    display: 'inline-block',
};

/**
 * 餐谱卡片编辑器
 * Created by hope6537 on 16/5/18.
 */
export default class MealCardEditor extends React.Component {

    constructor() {
        super();
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillMount() {
        var mealCardType = this.props.type;
        var classesId = this.props.classesId;
        if (mealCardType != undefined) {
            this.setState({
                open: false,
                dialogMsg: "",
                classesId: classesId,
                type: mealCardType,
                mealImg: "",
                mealTitle: "",
                mealDes: "",
                errorTitle: "",
                errorDes: ""
            })
        }
    }

    handleChangeMealImg(e) {
        this.setState({
            mealImg: e.target.value
        })
    }

    handleChangeMealTitle(e) {
        this.setState({
            mealTitle: e.target.value
        })
    }

    handleChangeMealDes(e) {
        this.setState({
            mealDes: e.target.value
        })
    }

    handleGenerateMeal() {
        this.setState({
            mealTitle: "餐谱名称模板",
            mealDes: "餐谱名称描述模板"
        })
    }

    handleData() {
        var data = {
            title: this.state.mealTitle,
            des: this.state.mealDes,
            img: this.state.mealImg
        };
        if (data.title == "") {
            this.setState({
                errorTitle: "请输入餐谱名称"
            });
            return;
        } else {
            this.setState({
                errorTitle: ""
            });
        }
        if (data.des == "") {
            this.setState({
                errorDes: "请输入餐谱描述"
            });
            return;
        } else {
            this.setState({
                errorDes: ""
            });
        }
        var meal = {
            day: Util.getNowDate()
        };
        var type = this.state.type;
        if (type == "早餐") {
            type = 'breakfast'
        }
        if (type == "晚餐") {
            type = 'dinner'
        }
        if (type == "午餐") {
            type = 'lunch'
        }
        meal[type] = JSON.stringify(data);
        return meal;
    }

    handleSubmit() {
        var meal = this.handleData();
        var query = {
            meal: {
                day: Util.getNowDate()
            }
        };
        var sendData = {
            postObject: meal
        };
        var that = this;
        Util.getJSON(Service.host + Service.fetchMeal, query, undefined, function (resp) {
            if (resp.success) {
                //刚刚创建
                if (resp.data.result.length == 0) {
                    Util.postJSON(Service.host + Service.postMeal, sendData, function (resp) {
                        that.setState({
                            dialogMsg: decodeURIComponent(resp.returnMsg)
                        });
                        that.handleOpen()
                    }, 'debug')
                }
                //进行修改
                else {
                    var id = resp.data.result[0].id;
                    sendData['putObject'] = sendData.postObject;
                    sendData['putObject']['id'] = id;
                    Util.putJSON(Service.host + Service.putMeal, sendData, function (resp) {
                        that.setState({
                            dialogMsg: decodeURIComponent(resp.returnMsg)
                        });
                        that.handleOpen();
                    }, 'debug')
                }
            } else {
                this.setState({
                    dialogMsg: decodeURIComponent(resp.returnMsg)
                });
                this.handleOpen()
            }
        }.bind(this));
    }

    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };

    render() {
        var mealCardType = this.state.type;
        const actions = [
            <FlatButton
                label="关闭"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];
        return (
            <Card style={cardDetailStyle}>
                <CardHeader
                    title={mealCardType}
                />
                <CardText>
                    <input ref="mealImg" type="file" label="上传餐点图片" value={this.state.mealImg}
                           onChange={this.handleChangeMealImg.bind(this)}/>
                    <br/>
                    <TextField
                        errorText={this.state.errorTitle}
                        ref="mealTitle"
                        hintText="输入餐点名称"
                        value={this.state.mealTitle}
                        onChange={this.handleChangeMealTitle.bind(this)}
                    /><br />
                    <TextField
                        errorText={this.state.errorDes}
                        ref="mealDes"
                        hintText="输入餐点描述"
                        value={this.state.mealDes}
                        fullWidth={true}
                        multiLine={true}
                        onChange={this.handleChangeMealDes.bind(this)}
                    />
                    <Dialog
                        title="系统消息"
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                    >
                        {this.state.dialogMsg}
                    </Dialog>
                </CardText>
                <CardActions>
                    <RaisedButton label="保存变更" primary={true} onTouchTap={this.handleSubmit.bind(this)}/>
                    <RaisedButton label="生成餐谱" secondary={true} onTouchTap={this.handleGenerateMeal.bind(this)}/>
                </CardActions>
            </Card>
        )
    }
}
