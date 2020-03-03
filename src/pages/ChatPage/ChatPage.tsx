import React, { Component } from 'react';
import axios from 'axios';
import Chatkit, { CurrentUser, PusherRoom } from '@pusher/chatkit-client';
import Spinner from 'react-spinkit';
import Dialog from '../../components/SupportDialog/SupportDialog';
import ChatWidget from '../../components/ChatWidget/ChatWidget';
import { handleInput, sendMessage, connectToRoom } from '../../sharedMethods/sharedMethods';

interface ChatPage {
    currentUser: CurrentUserExtend | null;
    currentRoom: PusherRoom | null;
    newMessage: string;
    messages: any[];
    isLoading: boolean;
    userId: '';
    isDialogOpen: boolean;
}

export interface CurrentUserExtend extends CurrentUser {
    name: string;
    id: string;
}

class Customer extends Component {
    state: ChatPage = {
        currentUser: null,
        currentRoom: null,
        newMessage: '',
        messages: [],
        isLoading: false,
        userId: '',
        isDialogOpen: false,
    };

    showDialog = () => {
        this.setState({
            isDialogOpen: !this.state.isDialogOpen,
        });
    };

    addSupportStaffToRoom = () => {
        const { currentRoom, currentUser } = this.state;
        if (currentUser && currentRoom) {
            return currentUser.addUserToRoom({
                userId: 'support',
                roomId: currentRoom.id,
            });
        }
    };

    createRoom = () => {
        const { currentUser } = this.state;
        if (currentUser) {
            currentUser
                .createRoom({
                    name: currentUser.name,
                    private: true,
                })
                .then(room => connectToRoom(room.id))
                .then(() => this.addSupportStaffToRoom())
                .catch(console.error);
        }
    };

    launchChat = (event: any) => {
        event.preventDefault();

        this.setState({
            isDialogOpen: false,
            isLoading: true,
        });

        const { userId } = this.state;

        if (userId === null || userId.trim() === '') {
            alert('Invalid userId');
        } else {
            axios
                .post('http://localhost:5200/users', { userId })
                .then(() => {
                    const tokenProvider = new Chatkit.TokenProvider({
                        url: 'http://localhost:5200/authenticate',
                    });

                    const chatManager = new Chatkit.ChatManager({
                        instanceLocator: '<your chatkit instance locator>',
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

    render() {
        const { newMessage, messages, currentUser, currentRoom, isDialogOpen, userId, isLoading } = this.state;

        return (
            <div className="customer-chat">
                <h1>Imaginary Service</h1>
                <p>Need help? Chat with us</p>

                {currentRoom ? (
                    <ChatWidget
                        newMessage={newMessage}
                        sendMessage={sendMessage}
                        handleInput={handleInput}
                        currentUser={currentUser}
                        messages={messages}
                    />
                ) : (
                    <button onClick={this.showDialog} className="contact-btn">
                        Contact Support
                    </button>
                )}

                {isLoading ? <Spinner name="three-bounce" color="#300d4f" /> : null}

                {isDialogOpen ? (
                    <Dialog username={userId} handleInput={handleInput} launchChat={this.launchChat} />
                ) : null}
            </div>
        );
    }
}

export default Customer;
