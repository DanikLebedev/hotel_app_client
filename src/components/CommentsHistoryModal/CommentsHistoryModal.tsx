import { Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { Data } from '../../interfaces/clientInterfaces';
import toaster from 'toasted-notes';
import { handleClickOutside } from '../../sharedMethods/outsideClick';
import { Close, Delete } from '@material-ui/icons';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import { Comment } from '../../interfaces/clientInterfaces';
import { CommentService } from '../../APIServices/commentService';
import { AdminContext } from '../../context/admin.context';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface CommentsHistoryModal {
    closeModal: () => void;
    show: boolean;
    comments: Comment[];
    update: () => void;
}

export const CommentsHistoryModal: React.FC<CommentsHistoryModal> = (props: CommentsHistoryModal) => {
    const token = useContext(AdminContext).token;
    const deleteCommentHandler = async (id): Promise<void> => {
        const data: Data = await CommentService.deleteComment(JSON.stringify({ _id: id }), {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        });
        props.update();
        toaster.notify(data.message, {
            duration: 2000,
        });
    };

    return (
        <Container
            onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                handleClickOutside(event, 'overlay-category-form', props)
            }
            fluid={true}
            id={'overlay-category-form'}
            className={props.show ? 'show-modal add-modal-wrapper' : 'hide-modal'}
        >
            <div key={1} className="d-flex justify-content-around align-items-center">
                <div className="comment-form">
                    <h3>All comments</h3>
                    <div className={'comment-wrapper-modal'}>
                        <div>
                            {props.comments.length ? (
                                props.comments.map(comment => {
                                    return (
                                        <li className={'comments-list-item'}>
                                            <div>
                                                <div className={'comments-list-item-header'}>
                                                    <span>{comment.userEmail}</span>
                                                    <span>
                                                        {comment.createdAt ? comment.createdAt.split('T')[0] : null}
                                                    </span>
                                                </div>
                                                <div className={'comments-list-item-body'}>
                                                    <p>{comment.text}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <Tooltip title={'Delete'}>
                                                    <IconButton
                                                        className={'icon-buttons'}
                                                        id={comment._id}
                                                        onClick={() => deleteCommentHandler(comment._id)}
                                                    >
                                                        <Delete color="error" />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </li>
                                    );
                                })
                            ) : (
                                <p>There are no comments yet</p>
                            )}
                        </div>
                    </div>
                    <button className={'close-modal-button'} onClick={() => props.closeModal()}>
                        <Close />
                    </button>
                </div>
            </div>
        </Container>
    );
};
