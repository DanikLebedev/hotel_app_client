import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Feedback } from '../../../../interfaces/clientInterfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import toaster from 'toasted-notes';
import { FeedbackService } from '../../../../APIServices/feedbackService';
import { AdminFeedbackForm } from '../../GridsForms/AdminFeedbackForm/AdminFeedbackForm';
import { IconButton, TextField, Tooltip } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import { AdminContext } from '../../../../context/admin.context';
import { sortNumbersTypes } from '../../../../config';
import { Pagination } from '../../../Pagination/Pagination';

export const FeedbackDataGrid = () => {
    const fetchedFeedbacks = useContext(AdminContext).fetchedFeedbacks;
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [search, setSearch] = useState('');
    const [inputName, setInputName] = useState('');
    const [currentSort, setCurrentSort] = useState<string>('default');
    const [field, setField] = useState('');
    const [editProps, setEditProps] = useState<Feedback>({
        approved: false,
        message: '',
        userEmail: '',
        userLastName: '',
        userName: '',
    });
    const [feedbacks, setFeedbacks] = useState<Feedback[]>(fetchedFeedbacks);

    const closeModal = (): void => {
        setShowModal(false);
    };

    const onSortChange = (field: string) => {
        setField(field);
        let nextSort;
        if (currentSort === 'down') {
            nextSort = 'up';
            setCurrentSort(nextSort);
        } else if (currentSort === 'up') {
            nextSort = 'default';
            setCurrentSort(nextSort);
        } else if (currentSort === 'default') {
            nextSort = 'down';
            setCurrentSort(nextSort);
        }
    };

    function update() {
        FeedbackService.getAllFeedbacks().then(({ feedbacks }) => setFeedbacks(feedbacks));
    }

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
        update();
    };

    const addFeedbackHandler = () => {
        setIsEdit(false);
        setShowModal(true);
    };

    const filteredFeedbacks = (): Feedback[] => {
        if (inputName === 'user-email-input') {
            return feedbacks.filter(item => {
                return item.userEmail.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            });
        } else if (inputName === 'user-name-input') {
            return feedbacks.filter(item => {
                return (
                    item.userName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                    item.userLastName.toLowerCase().indexOf(search.toLowerCase()) !== -1
                );
            });
        } else if (inputName === 'message-input') {
            return feedbacks.filter(item => {
                return item.message.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            });
        } else {
            return feedbacks;
        }
    };

    const dataSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value);
        setInputName(event.target.name);
    };

    useEffect(() => {
        update();
    }, [fetchedFeedbacks]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(8);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentFeedback = filteredFeedbacks()
        .sort(sortNumbersTypes(field)[currentSort].fn)
        .slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="grid-table-wrapper">
            <table className="m-3 grid-table">
                <thead>
                    <tr>
                        <th>
                            <p>User Email</p>
                            <TextField id="standard-basic" name="user-email-input" onChange={dataSearch} />
                        </th>
                        <th>
                            <p>User full name</p>{' '}
                            <TextField id="standard-basic" name="user-name-input" onChange={dataSearch} />
                        </th>
                        <th>
                            <p>Message</p> <TextField id="standard-basic" name="message-input" onChange={dataSearch} />
                        </th>
                        <th>
                            <p>Approved</p>
                            <Tooltip title={'Sort'}>
                                <button className="sort-button" onClick={() => onSortChange('approved')}>
                                    <i
                                        className={
                                            field === 'approved'
                                                ? `fas fa-${sortNumbersTypes('approved')[currentSort].class}`
                                                : 'fas fa-sort'
                                        }
                                    />
                                </button>
                            </Tooltip>
                        </th>
                        <th>
                            <p>Actions</p>
                            <Tooltip title={'Add'}>
                                <IconButton className="icon-buttons" onClick={addFeedbackHandler}>
                                    <Add color="action" />
                                </IconButton>
                            </Tooltip>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFeedbacks().length
                        ? filteredFeedbacks()
                              .sort(sortNumbersTypes(field)[currentSort].fn)
                              .map((feedback, key) => {
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
                                              <Tooltip title={'Delete'}>
                                                  <IconButton
                                                      className={'icon-buttons'}
                                                      id={feedback._id}
                                                      onClick={deleteFeedbackHandler}
                                                  >
                                                      <Delete color="error" />
                                                  </IconButton>
                                              </Tooltip>
                                              <Tooltip title={'Edit'}>
                                                  <IconButton
                                                      className={'icon-buttons'}
                                                      id={feedback._id}
                                                      onClick={editFeedbackHandler}
                                                  >
                                                      <Edit color="primary" />
                                                  </IconButton>
                                              </Tooltip>
                                          </td>
                                      </tr>
                                  );
                              })
                        : null}
                </tbody>
            </table>
            <Pagination
                postPerPage={postPerPage}
                totalPosts={fetchedFeedbacks.length}
                paginate={paginate}
                currentPage={currentPage}
            />
            <AdminFeedbackForm
                update={update}
                closeModal={closeModal}
                editProps={editProps}
                isEdit={isEdit}
                show={showModal}
            />
        </div>
    );
};
