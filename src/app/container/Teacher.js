/**
 * Created by hope6537 on 16/5/18.
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppHeaderBar from '../component/AppHeaderBar'
import AppFooter from '../component/AppFooter'


const styles = {
    container: {
        paddingTop: 0,
    },
    dataComponent: {
        height: 1000
    }
};

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
});

class Teacher extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);

        this.state = {
            open: false,
        };
    }

    handleRequestClose() {
        this.setState({
            open: false,
        });
    }

    handleTouchTap() {
        this.setState({
            open: true,
        });
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <AppHeaderBar type="teacher" style={styles.dataComponent}/>
                    {
                        this.props.children
                    }
                    <AppFooter/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Teacher;
