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
import CardExampleWithoutAvatar from '../component/CardExampleWithoutAvatar'
import CardExampleControlled from '../component/CardExampleControlled'


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

class Main extends React.Component {
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

    renderDataComponent() {
        return ( this.props.dataComponent != null ? this.props.dataComponent : <div>"具体每个实例Container的内容"</div>)
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <AppHeaderBar style={styles.dataComponent}/>
                    {
                        this.renderDataComponent()
                    }
                    <AppFooter/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Main;
