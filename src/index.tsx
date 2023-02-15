import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/index.scss';
import App from './App';

import {Provider} from "react-redux";
import {setupStore} from "./store";

const store = setupStore()

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
)
