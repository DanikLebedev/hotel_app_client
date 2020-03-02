import { Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Data, Feedback } from '../../../../interfaces/clientInterfaces';
import toaster from 'toasted-notes';
import { FeedbackService } from '../../../../APIServices/feedbackService';
import Checkbox from '@material-ui/core/Checkbox';
import { Close } from '@material-ui/icons';
import { handleClickOutside } from '../../../../hooks/outsideClick.hook';
import { Button } from '@material-ui/core';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface FeedbackForm {
    closeModal: () => void;
    show: boolean;
    editProps: Feedback;
    isEdit: boolean;
    update: () => void;
}

export const AdminFeedbackForm: React.FC<FeedbackForm> = (props: FeedbackForm) => {
    const [feedbackForm, setFeedbackForm] = useState<Feedback>(props.editProps);

    const addFeedbackHandler = async (): Promise<void> => {
        if (props.isEdit) {
            const data: Data = await FeedbackService.updateFeedback(JSON.stringify(feedbackForm), {
                'Content-Type': 'application/json',
            });
            toaster.notify(data.message, {
                duration: 2000,
            });
            props.update();
        } else {
            const data: Data = await FeedbackService.postFeedback(feedbackForm, {
                'Content-Type': 'application/json',
            });
            toaster.notify(data.message, {
                duration: 2000,
            });
            props.update();
        }
        props.closeModal();
    };

    useEffect(() => {
        if (props.isEdit) {
            setFeedbackForm(props.editProps);
        } else {
            setFeedbackForm({ approved: false, message: '', userEmail: '', userLastName: '', userName: '' });
        }
    }, [props.isEdit, props.editProps]);

    const onChangeHandler = (event: InputEvent): void => {
        setFeedbackForm({ ...feedbackForm, [event.target.name]: event.target.checked });
    };

    return (
        <Container
            onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                handleClickOutside(event, 'overlay-edit-feedback', props)
            }
            id={'overlay-edit-feedback'}
            fluid={true}
            className={props.show ? 'show-modal add-modal-wrapper' : 'hide-modal'}
        >
            <div key={1} className="d-flex justify-content-around align-items-center">
                <div className="admin-form ">
                    <h3>Feedback form</h3>
                    <label htmlFor="approved">Choose status</label>
                    <Checkbox
                        checked={feedbackForm.approved}
                        name={'approved'}
                        onChange={onChangeHandler}
                        value="checkedA"
                        color="primary"
                    />
                    <Button onClick={addFeedbackHandler} color="primary" variant="contained" className="mt-3">
                        Update Feedback
                    </Button>
                    <button className={'close-modal-button'}  onClick={() => props.closeModal()}>
                        <Close />
                    </button>
                </div>
            </div>
        </Container>
    );
};
