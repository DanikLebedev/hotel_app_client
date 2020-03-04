import React, { useContext, useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import './Dialog.css';
import { Container } from 'react-bootstrap';
import { handleClickOutside } from '../../sharedMethods/outsideClick';
import { Close } from '@material-ui/icons';
import { ClientContext } from '../../context/client.context';

const Dialog = props => {
    const { username, handleInput, launchChat, show, closeModal } = props;

    return (
        <Container
            onClick={event => handleClickOutside(event, 'overlay-feedback', props)}
            fluid={true}
            id={'overlay-feedback'}
            className={show ? 'show-modal add-modal-wrapper' : 'hide-modal'}
        >
            <div key={1} className="d-flex justify-content-around align-items-center">
                <div className="change-user-info-form">
                    <div className="feedback-form">
                        <h3>Confirm your email</h3>
                        <form onSubmit={launchChat}>
                            <input
                                id="username"
                                className="username-input"
                                autoFocus
                                type="text"
                                name="userId"
                                value={username}
                                onChange={handleInput}
                                disabled={true}
                            />
                            <button type="submit" className={'button btn-black'}>
                                Confirm
                            </button>
                        </form>
                    </div>
                    <button className={'close-modal-button'} onClick={() => closeModal()}>
                        <Close />
                    </button>
                </div>
            </div>
        </Container>
    );
};

Dialog.propTypes = {
    username: Proptypes.string.isRequired,
    handleInput: Proptypes.func.isRequired,
    launchChat: Proptypes.func.isRequired,
    show: Proptypes.bool.isRequired,
    closeModal: Proptypes.func.isRequired,
};

export default Dialog;
