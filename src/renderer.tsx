import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

import { Titlebar, Color } from 'custom-electron-titlebar'
import { mainColor } from './definitions';

export const titlebar = new Titlebar({
	backgroundColor: Color.fromHex(mainColor)
});
titlebar.updateTitle('PPG Timer');
