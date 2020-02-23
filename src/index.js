import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter} from 'react-router-dom'
import Page from './component/page/page'
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { LocaleProvider } from 'antd';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/index';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

let store=createStore(reducer);

ReactDOM.render((<Provider store={store}><BrowserRouter><LocaleProvider locale={zh_CN}><Page/></LocaleProvider></BrowserRouter></Provider>), document.getElementById('root'));
registerServiceWorker();
