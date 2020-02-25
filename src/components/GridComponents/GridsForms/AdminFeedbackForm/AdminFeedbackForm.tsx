import { Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Data, Feedback } from '../../../../interfaces/clientInterfaces';
import toaster from 'toasted-notes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FeedbackService } from '../../../../APIServices/feedbackService';
import Checkbox from '@material-ui/core/Checkbox';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface FeedbackForm {
    closeModal: () => void;
    show: boolean;
    editProps: Feedback;
    isEdit: boolean;
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
        } else {
            const data: Data = await FeedbackService.postFeedback(feedbackForm, {
                'Content-Type': 'application/json',
            });
            toaster.notify(data.message, {
                duration: 2000,
            });
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
        <Container fluid={true} className={props.show ? 'show-modal add-modal-wrapper' : 'hide-modal'}>
            <div key={1} className="d-flex justify-content-around align-items-center">
                <div className="admin-form ">
                    <h3>Feedback form</h3>
                    <label htmlFor="approved">Choose status</label>
                    <Checkbox
                        checked={feedbackForm.approved}
                        name={'approved'}
                        onChange={onChangeHandler}
                        value="checkedA"
                        color='primary'
                    />
                    <button onClick={addFeedbackHandler} className="btn btn-primary mt-3">
                        Update Feedback
                    </button>
                </div>
                <button className={'close-button'} onClick={() => props.closeModal()}>
                    <FontAwesomeIcon icon={faWindowClose} />
                </button>
            </div>
        </Container>
    );
};
