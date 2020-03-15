import React, { Component } from 'react';
import { Widget, addResponseMessage, addUserMessage, dropMessages } from 'react-chat-widget';
import { CometChat } from '@cometchat-pro/chat';
import './CometChatWidget.scss';
import { config } from '../../config';
import 'react-chat-widget/lib/styles.css';
import {ClientContext} from "../../context/client.context";

const agentUID = config.APP_COMET_AGENT_UID;
const CUSTOMER_MESSAGE_LISTENER_KEY = 'client-listener';
const limit = 30;

class CometChatWidget extends Component {
    static contextType = ClientContext;
    createMessageListener = () => {
        CometChat.addMessageListener(
            CUSTOMER_MESSAGE_LISTENER_KEY,
            new CometChat.MessageListener({
                onTextMessageReceived: message => {
                    console.log('Incoming Message Log', { message });
                    addResponseMessage(message.text);
                },
            }),
        );
    };

    fetchPreviousMessages = () => {
        const messagesRequest = new CometChat.MessagesRequestBuilder()
            .setUID(agentUID)
            .setLimit(limit)
            .build();

        messagesRequest.fetchPrevious().then(
            messages => {
                console.log('Message list fetched:', messages);
                messages.forEach(message => {
                    // @ts-ignore
                    if (message.receiver !== agentUID) {
                        // @ts-ignore
                        addResponseMessage(message.text);
                    } else {
                        // @ts-ignore
                        addUserMessage(message.text);
                    }
                });
            },
            error => {
                console.log('Message fetching failed with error:', error);
            },
        );
    };

    fetchAuthToken = async uid => {
        const response = await fetch(`/api/chatWidget/api/auth?uid=${uid}`, {
            headers: {
                appId: config.APP_COMET_CHAT_ID,
            },
        });
        const result = await response.json();
        return result;
    };

    componentDidMount() {
        addResponseMessage('Welcome to our hotel!');
        addResponseMessage('Can I help you?');

        const uid = localStorage.getItem('cc-uid');
        if (uid !== null) {
            this.fetchAuthToken(uid).then(
                result => {
                    console.log('auth token fetched', result);
                    CometChat.login(result.authToken).then(user => {
                        console.log('Login successfully:', { user });
                        this.createMessageListener();
                        this.fetchPreviousMessages();
                    });
                },
                error => {
                    console.log('Initialization failed with error:', error);
                },
            );
        }
    }

    createUser = async () => {
        const response = await fetch(`/api/chatWidget/api/create`, {
            headers: {
                appId: config.APP_COMET_CHAT_ID,
                Authorization: `Bearer ${this.context.token}`
            },
        });
        const result = await response.json();
        return result;
    };

    handleNewUserMessage = newMessage => {
        console.log(`New message incoming! ${newMessage}`);
        const textMessage = new CometChat.TextMessage(agentUID, newMessage, CometChat.RECEIVER_TYPE.USER);
        const uid = localStorage.getItem('cc-uid');

        if (uid === null) {
            this.createUser().then(
                result => {
                    console.log('auth token fetched', result);
                    localStorage.setItem('cc-uid', result);
                    CometChat.login(result).then(user => {
                        console.log('Login successfully:', { user });
                        CometChat.sendMessage(textMessage).then(
                            message => {
                                console.log('Message sent successfully:', message);
                            },
                            error => {
                                console.log('Message sending failed with error:', error);
                            },
                        );
                        CometChat.addMessageListener(
                            CUSTOMER_MESSAGE_LISTENER_KEY,
                            new CometChat.MessageListener({
                                onTextMessageReceived: message => {
                                    console.log('Incoming Message Log', { message });
                                    addResponseMessage(message.text);
                                },
                            }),
                        );
                    });
                },
                error => {
                    console.log('Initialization failed with error:', error);
                },
            );
        } else {
            CometChat.sendMessage(textMessage).then(
                message => {
                    console.log('Message sent successfully:', message);
                },
                error => {
                    console.log('Message sending failed with error:', error);
                },
            );
        }
    };

    componentWillUnmount() {
        CometChat.removeMessageListener(CUSTOMER_MESSAGE_LISTENER_KEY);
        CometChat.logout();
        dropMessages();
        localStorage.removeItem('cc-uid')
    }

    render() {
        return (
            <div className="widget">
                <Widget
                    handleNewUserMessage={this.handleNewUserMessage}
                    title="Rixos hotel chat"
                    subtitle="Ready to help you"
                />
            </div>
        );
    }
}

export default CometChatWidget;
