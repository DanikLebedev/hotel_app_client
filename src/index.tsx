import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
ReactDOM.render(
    <Suspense fallback={'loading'}>
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </Suspense>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
