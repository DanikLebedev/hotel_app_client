import React, { Component } from 'react';
import axios from 'axios';
import Chatkit, { CurrentUser } from '@pusher/chatkit-client';
import Spinner from 'react-spinkit';
import Dialog from './Dialog';
import ChatWidget from './ChatWidget';
import { handleInput, sendMessage, connectToRoom } from './sharedMethods';
import './ChatPage.scss';
import { ClientContext } from '../../context/client.context';
import toaster from 'toasted-notes';

// interface CustomerState {
//     currentUser: CurrentUser |null,
//     currentRoom: null,
//     newMessage: '',
//     messages: [],
//     isLoading: false,
//     userId: '',
//     isDialogOpen: false,
// }

class Customer extends Component {
    static contextType = ClientContext;
    constructor() {
        super();
        this.state = {
            currentUser: null,
            currentRoom: null,
            newMessage: '',
            messages: [],
            isLoading: false,
            userId: '',
            isDialogOpen: false,
        };

        this.connectToRoom = connectToRoom.bind(this);
        this.sendMessage = sendMessage.bind(this);
        this.handleInput = handleInput.bind(this);
    }

    showDialog = () => {
        this.setState({
            isDialogOpen: !this.state.isDialogOpen,
        });
    };

    addSupportStaffToRoom = () => {
        const { currentRoom, currentUser } = this.state;

        return currentUser.addUserToRoom({
            userId: 'support',
            roomId: currentRoom.id,
        });
    };

    closeModal = () => {
        this.setState({
            isDialogOpen: !this.state.isDialogOpen,
        });
    };

    createRoom = () => {
        const { currentUser } = this.state;

        currentUser
            .createRoom({
                name: currentUser.name,
                private: true,
            })
            .then(room => this.connectToRoom(room.id))
            .then(() => this.addSupportStaffToRoom())
            .catch(console.error);
    };

    launchChat = event => {
        event.preventDefault();

        this.setState({
            isDialogOpen: false,
            isLoading: true,
        });

        const { userId } = this.state;

        if (userId === null || userId.trim() === '') {
            toaster.notify('Need to authorize', {
                duration: 2000,
            });
        } else {
            axios
                .post('http://localhost:5000/api/chat/users', { userId })
                .then(() => {
                    const tokenProvider = new Chatkit.TokenProvider({
                        url: 'http://localhost:5000/api/chat/authenticate',
                    });

                    const chatManager = new Chatkit.ChatManager({
                        instanceLocator: 'v1:us1:722a53b7-df43-4433-a060-3479c0d266e7',
                        userId,
                        tokenProvider,
                    });

                    return chatManager.connect().then(currentUser => {
                        this.setState(
                            {
                                currentUser,
                                isLoading: false,
                            },
                            () => this.createRoom(),
                        );
                    });
                })
                .catch(console.error);
        }
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                userId: this.context.userEmail,
            });
        }, 2000);
    }

    render() {
        const { newMessage, messages, currentUser, currentRoom, isDialogOpen, userId, isLoading } = this.state;
        return (
            <>
                <div className={'support-page-bg'} />

                <div className="customer-chat">
                    <h1>Imaginary Service</h1>
                    <h4>Need help? Chat with us</h4>

                    {currentRoom ? (
                        <ChatWidget
                            newMessage={newMessage}
                            sendMessage={this.sendMessage}
                            handleInput={this.handleInput}
                            currentUser={currentUser}
                            messages={messages}
                        />
                    ) : (
                        <button onClick={this.showDialog} className="button btn-black">
                            Contact Support
                        </button>
                    )}

                    {isLoading ? <Spinner name="three-bounce" color="#300d4f" /> : null}

                    {isDialogOpen ? (
                        <Dialog
                            closeModal={this.closeModal}
                            show={this.state.isDialogOpen}
                            username={userId}
                            handleInput={this.handleInput}
                            launchChat={this.launchChat}
                        />
                    ) : null}
                </div>
            </>
        );
    }
}

export default Customer;
