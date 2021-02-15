import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

import { Titlebar, Color } from 'custom-electron-titlebar'

new Titlebar({
	backgroundColor: Color.fromHex('#ECECEC')
});
