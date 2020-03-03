import React from 'react';
import Proptypes from 'prop-types';
import { CurrentUserExtend } from '../../pages/ChatPage/ChatPage';

interface ChatWidget {
    newMessage: string;
    sendMessage: (this: any, event: any) => void;
    handleInput: (this: any, event: any) => void;
    currentUser: CurrentUserExtend | null;
    messages: Message[];
}

interface Message {
    text: string;
    senderId: string;
}


const ChatWidget: React.FC<ChatWidget> = (props: ChatWidget) => {
    const { newMessage, sendMessage, handleInput, currentUser, messages } = props;

    const ChatSession = messages.map(message => {
        if (currentUser) {
            const user = message.senderId === currentUser.id ? 'user' : 'support';
            return <span className={`${user} message`}>{message.text}</span>;
        }
    });

    return (
        <section className="chat">
            <div className="chat-widget">
                <header className="chat-header">
                    <h2>Got Questions? Chat with us</h2>
                </header>
                <section className="chat-body">{ChatSession}</section>

                <form onSubmit={sendMessage} className="message-form">
                    <input
                        className="message-input"
                        autoFocus
                        name="newMessage"
                        placeholder="Compose your message and hit ENTER to send"
                        onChange={handleInput}
                        value={newMessage}
                    />
                </form>
            </div>
        </section>
    );
};

export default ChatWidget;
