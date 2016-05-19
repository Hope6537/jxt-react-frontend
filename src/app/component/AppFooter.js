/**
 * Created by hope6537 on 16/5/18.
 */
'use strict';
import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const footerStyle = {
    backgroundColor: "#212121",
    boxSizing: "border-box",
    paddingTop: "30px",
    paddingBottom: "30px",
    textAlign: "center",
}

const footerFontStyle = {
    color: "#FFFFFF"
}


export default class AppFooter extends React.Component {

    render() {
        return (
            <div style={footerStyle}>
                <p style={footerFontStyle}>
                    联系我们 意见反馈
                </p>
            </div>
        )
    }
}