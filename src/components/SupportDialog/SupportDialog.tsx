import React from 'react';
import Proptypes from 'prop-types';
import './SupportDialog.scss';

interface SupportDialog {
    username: string;
    handleInput: (event: any) => void;
    launchChat: (event: any) => void;
}

const SupportDialog: React.FC<SupportDialog> = (props: SupportDialog) => {
    const { username, handleInput, launchChat } = props;

    return (
        <div className="dialog-container">
            <div className="dialog">
                <form className="dialog-form" onSubmit={launchChat}>
                    <label className="username-label" htmlFor="username">
                        What is your name?
                    </label>
                    <input
                        id="username"
                        className="username-input"
                        autoFocus
                        type="text"
                        name="userId"
                        value={username}
                        onChange={handleInput}
                    />
                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

SupportDialog.propTypes = {
    username: Proptypes.string.isRequired,
    handleInput: Proptypes.func.isRequired,
    launchChat: Proptypes.func.isRequired,
};

export default SupportDialog;
