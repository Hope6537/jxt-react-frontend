import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main'; // Our custom react component

injectTapEventPlugin();
ReactDOM.render(<Main />, document.getElementById('app'));
