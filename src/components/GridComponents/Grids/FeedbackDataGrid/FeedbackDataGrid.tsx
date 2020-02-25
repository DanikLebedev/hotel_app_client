import React, {useCallback, useContext, useEffect, useState} from 'react';
import {  Feedback } from '../../../../interfaces/clientInterfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import toaster from 'toasted-notes';
import { FeedbackService } from '../../../../APIServices/feedbackService';
import { AdminFeedbackForm } from '../../GridsForms/AdminFeedbackForm/AdminFeedbackForm';
import { IconButton } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import {AdminContext} from "../../../../context/admin.context";

export const FeedbackDataGrid = () => {
    const feedbacks = useContext(AdminContext).fetchedFeedbacks
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editProps, setEditProps] = useState<Feedback>({
        approved: false,
        message: '',
        userEmail: '',
        userLastName: '',
        userName: '',
    });

    const closeModal = (): void => {
        setShowModal(false);
    };


    const editFeedbackHandler = (event: React.MouseEvent<EventTarget>) => {
        setIsEdit(true);
        const target = event.target as HTMLButtonElement;
        const filteredFeedbacks = feedbacks.find(feedback => {
            return feedback._id === target.id;
        });
        if (filteredFeedbacks) {
            setEditProps({ ...filteredFeedbacks });
            setShowModal(true);
        }
    };

    const deleteFeedbackHandler = async (event: React.MouseEvent<EventTarget>): Promise<void> => {
        const target = event.target as HTMLButtonElement;
        feedbacks.filter(feedback => {
            return feedback._id !== target.id;
        });
        const formData = new FormData();
        formData.append('_id', target.id);
        await FeedbackService.deleteFeedback(formData).then(data => {
            toaster.notify(data.message, {
                duration: 2000,
            });
        });
    };

    const addFeedbackHandler = () => {
        setIsEdit(false);
        setShowModal(true);
    };

    return (
        <div className="grid-table-wrapper">
            <table className="m-3 grid-table">
                <thead>
                    <tr>
                        <th>User Email</th>
                        <th>User full name</th>
                        <th>Message</th>
                        <th>Approved</th>
                        <th>
                            Actions
                            <IconButton className="icon-buttons" onClick={addFeedbackHandler}>
                                <Add color="action" />
                            </IconButton>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.length
                        ? feedbacks.map((feedback, key) => {
                              return (
                                  <tr key={key}>
                                      <td>{feedback.userEmail}</td>
                                      <td>
                                          {feedback.userName} {feedback.userLastName}
                                      </td>
                                      <td>{feedback.message}</td>
                                      <td>
                                          {feedback.approved ? (
                                              <FontAwesomeIcon color={'green'} icon={faCheck} />
                                          ) : (
                                              <FontAwesomeIcon color={'red'} icon={faTimes} />
                                          )}
                                      </td>
                                      <td>
                                          <IconButton
                                              className={'icon-buttons'}
                                              id={feedback._id}
                                              onClick={deleteFeedbackHandler}
                                          >
                                              <Delete color="error" />
                                          </IconButton>
                                          <IconButton
                                              className={'icon-buttons'}
                                              id={feedback._id}
                                              onClick={editFeedbackHandler}
                                          >
                                              <Edit color="primary" />
                                          </IconButton>
                                      </td>
                                  </tr>
                              );
                          })
                        : null}
                </tbody>
            </table>
            <AdminFeedbackForm closeModal={closeModal} editProps={editProps} isEdit={isEdit} show={showModal} />
        </div>
    );
};
