import React, {ChangeEvent, useState} from 'react';
import { Container } from 'react-bootstrap';
import { handleClickOutside } from '../../hooks/outsideClick.hook';
import { Button, DialogContent } from '@material-ui/core';
import { Close, Send } from '@material-ui/icons';
import {Category, Feedback, OrderCart} from '../../interfaces/clientInterfaces';
import { Pagination } from '../Pagination/Pagination';
import { ErrorMessage } from '../ErrorsComponents/ErrorMessage';
import {useForm} from "react-hook-form";

interface FeedbackModal {
    closeModal: () => void;
    show: boolean;
    onSubmit: () => Promise<void>;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

interface FeedbackFormData {
    message: string;
}

export const FeedbackModal: React.FC<FeedbackModal> = (props: FeedbackModal) => {
    const { register, handleSubmit, errors } = useForm<FeedbackFormData>();


    return (
        <Container
            onClick={(event: React.MouseEvent<HTMLDivElement>) => handleClickOutside(event, 'overlay-feedback', props)}
            fluid={true}
            id={'overlay-feedback'}
            className={props.show ? 'show-modal add-modal-wrapper' : 'hide-modal'}
        >
            <div key={1} className="d-flex justify-content-around align-items-center">
                <div className="change-user-info-form">
                    <h3>Leave your feedback</h3>
                    <div className='feedback-form'>
                        <textarea
                            rows={5}
                            cols={45}
                            className={'form-control'}
                            placeholder={'your feedback...'}
                            onChange={props.onChange}
                            name={'message'}
                            ref={register({ required: true })}
                        />
                        <ErrorMessage error={errors.message} type={'error'} />
                        <button onClick={handleSubmit(props.onSubmit)} className={'button btn-black'}>
                            Send feedback <Send />
                        </button>
                    </div>
                    <button className={'close-modal-button'} onClick={() => props.closeModal()}>
                        <Close />
                    </button>
                </div>
            </div>
        </Container>
    );
};
