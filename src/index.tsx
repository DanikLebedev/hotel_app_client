import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import Loader from './components/Loader/Loader';
import { CometChat } from '@cometchat-pro/chat';
import { config } from './config';



const appSettings = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion('eu')
    .build();

CometChat.init(config.APP_COMET_CHAT_ID, appSettings).then(
    () => {
        console.log('Initialized successfully');
    },
    error => {
        console.log('Error in Initialization', { error });
    },
);
ReactDOM.render(
    <Suspense
        fallback={
            <div className=" loading-screen d-flex justify-content-center align-items-center min-vh-100">
                <Loader />
            </div>
        }
    >
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </Suspense>,
    document.getElementById('root'),
);

serviceWorker.unregister();
