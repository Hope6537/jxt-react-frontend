'use strict';
import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import NavigationClose from '../../../node_modules/material-ui/svg-icons/navigation/close';
import NavigationApp from '../../../node_modules/material-ui/svg-icons/navigation/apps';

import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import { Link } from 'react-router'


function handleTouchTap() {
    console.log(('onTouchTap triggered on the title component'));
}

const styles = {
    title: {
        cursor: 'pointer',
    },
    smallIcon: {
        width: 36,
        height: 36,
    },
    mediumIcon: {
        width: 48,
        height: 48,
    },
    largeIcon: {
        width: 60,
        height: 60,
    },
    small: {
        width: 72,
        height: 72,
        padding: 16,
    },
    medium: {
        width: 96,
        height: 96,
        padding: 24,
    },
    large: {
        width: 120,
        height: 120,
        padding: 30,
    },
};


export default class AppHeaderBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillMount() {
        console.log("type:" + this.props.type);
        if (this.props.type != null && this.props.type != undefined) {
            this.setState({
                type: this.props.type
            })
        } else {
            this.setState({
                type: "parent"
            })
        }
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    handleClose() {
        this.setState({open: false});
    }

    renderDrawer() {
        if (this.state.type == "parent") {
            return (<div>
                <IconButton onTouchTap={this.handleToggle.bind(this)}>
                    <NavigationApp style={{backgroundColor:"#FFFFFF"}}/>
                </IconButton>
                <Drawer
                    docked={false}
                    width={250}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <AppBar
                        title="家校通-家长端"
                    />
                    <MenuItem onTouchTap={this.handleClose} href="/#/meal">每日食谱</MenuItem>
                    <MenuItem onTouchTap={this.handleClose} href="/#/plan">每日作息</MenuItem>
                    <MenuItem onTouchTap={this.handleClose} href="/#/event">校内活动</MenuItem>
                    <MenuItem onTouchTap={this.handleClose} href="/#/notice">校内通知</MenuItem>
                    <MenuItem onTouchTap={this.handleClose} href="/#/require">提出需求</MenuItem>
                    <MenuItem onTouchTap={this.handleClose} href="/#/feedback">提出反馈</MenuItem>
                </Drawer>
            </div>)
        }
        if (this.state.type == "teacher") {
            return (<div>
                <IconButton onTouchTap={this.handleToggle.bind(this)}>
                    <NavigationApp/>
                </IconButton>
                <Drawer
                    docked={false}
                    width={250}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <AppBar
                        title="家校通-教师端"
                    />
                    <MenuItem onTouchTap={this.handleClose} href="/#/teacher/meal">食谱管理</MenuItem>
                    <MenuItem onTouchTap={this.handleClose} href="/#/teacher/plan">作息管理</MenuItem>
                    <MenuItem onTouchTap={this.handleClose} href="/#/teacher/event">活动管理</MenuItem>
                    <MenuItem onTouchTap={this.handleClose} href="/#/teacher/notice">通知管理</MenuItem>
                    <MenuItem onTouchTap={this.handleClose} href="/#/teacher/require">需求受理</MenuItem>
                    <MenuItem onTouchTap={this.handleClose} href="/#/teacher/classes">班级管理</MenuItem>
                </Drawer>
            </div>)
        }
        if (this.state.type == "admin") {
            return (<div>
                <IconButton onTouchTap={this.handleToggle.bind(this)}>
                    <NavigationApp/>
                </IconButton>
                <Drawer
                    docked={false}
                    width={250}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <AppBar
                        title="家校通-管理员端"
                    />
                    <MenuItem onTouchTap={this.handleClose}>教师管理</MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>学生管理</MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>班级管理</MenuItem>
                </Drawer>
            </div>)
        }

    }

    renderRight() {
        return (<div className="body"><FlatButton style={{color:"#FFFFFF",marginTop:"6px"}} linkButton={true} href='/#/login' label="登录"/></div>)
    }

    render() {


        return (<AppBar
            title={<span style={styles.title}>家校通</span>}
            onTitleTouchTap={handleTouchTap}
            iconElementLeft={this.renderDrawer()}
            iconElementRight={this.renderRight()}
        />)
    }
}


export default AppHeaderBar;
