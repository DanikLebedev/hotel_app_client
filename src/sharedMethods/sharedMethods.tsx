function handleInput(this: any, event: any) {
    const { value, name } = event.target;

    this.setState({
        [name]: value,
    });
}

function sendMessage(this: any, event: any) {
    event.preventDefault();
    const { newMessage, currentUser, currentRoom } = this.state;

    if (newMessage.trim() === '') return;

    currentUser.sendMessage({
        text: newMessage,
        roomId: `${currentRoom.id}`,
    });

    this.setState({
        newMessage: '',
    });
}

function connectToRoom(this: any, id: string) {
    const { currentUser } = this.state;

    return currentUser
        .subscribeToRoom({
            roomId: `${id}`,
            messageLimit: 100,
            hooks: {
                onMessage: (message: any) => {
                    this.setState({
                        messages: [...this.state.messages, message],
                    });
                },
            },
        })
        .then((currentRoom: any) => {
            this.setState({
                currentRoom,
            });
        });
}

export { handleInput, sendMessage, connectToRoom };
