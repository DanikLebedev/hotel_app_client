import React, { useCallback, useState, useEffect, useContext, ChangeEvent, useRef } from 'react';
import { Article, Customer, Comment } from '../../interfaces/clientInterfaces';
import { useParams } from 'react-router-dom';
import { ArticleService } from '../../APIServices/articleService';
import { Col, Container, Row, FormText } from 'react-bootstrap';
import { config } from '../../config';
import Loader from '../../components/Loader/Loader';
import './ArticleInfoPage.scss';
import { ClientContext } from '../../context/client.context';
import { CommentService } from '../../APIServices/commentService';
import toaster from 'toasted-notes';
import { duration, IconButton, Tooltip } from '@material-ui/core';
import { Delete, Edit, Save, Cancel } from '@material-ui/icons';

export const ArticleInfoPage: React.FC = () => {
    const context = useContext(ClientContext);
    const params: { id?: string } = useParams();
    const articleId: string | undefined = params.id;
    const [articleInfo, setArticleInfo] = useState<Article[]>([]);
    const [allComments, setAllComments] = useState<Comment[]>(context.fetchedComments);
    const [commentForm, setCommentForm] = useState<Comment>({
        text: '',
        userEmail: '',
        articleId: articleId,
    });
    const [isEdit, setIsEdit] = useState({ edit: false, id: '' });

    const toggleEditMode = (id: any) => {
        setIsEdit({ edit: !isEdit.edit, id });
        console.log(isEdit);
    };

    const update = useCallback(() => {
        ArticleService.getArticleById(articleId).then(({ article }) => {
            setArticleInfo(article);
        });
        CommentService.getAllComments().then(({ comment }) => setAllComments(comment));
    }, [articleId, context.token]);

    const onChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentForm({
            ...commentForm,
            [event.target.name]: event.target.value,
            userEmail: context.fetchedUserInfo.email,
        });
    };

    const deleteCommentHandler = async (event: React.MouseEvent<EventTarget>) => {
        const target = event.target as HTMLButtonElement;
        const data = await CommentService.deleteComment(JSON.stringify({ _id: target.id }), {
            Authorization: `Bearer ${context.token}`,
            'Content-Type': 'application/json',
        });
        update();
        toaster.notify(data.message);
    };

    const addCommentHandler = async (): Promise<void> => {
        try {
            const data = await CommentService.postComment(
                { ...commentForm },
                { Authorization: `Bearer ${context.token}`, 'Content-Type': 'application/json' },
            );
            update();
            toaster.notify(data.message, {
                duration: 2000,
            });
        } catch (e) {
            toaster.notify('Something went wrong', {
                duration: 2000,
            });
        }
    };

    const updateCommentHandler = async () => {
        try {
            const data = await CommentService.updateComment(
                JSON.stringify({ ...commentForm, userEmail: context.fetchedUserInfo.email }),
                {
                    Authorization: `Bearer ${context.token}`,
                    'Content-Type': 'application/json',
                },
            );
            update();
            toaster.notify(data.message, {
                duration: 2000,
            });
            setIsEdit({ edit: false, id: '' });
        } catch (e) {
            toaster.notify('Something went wrong');
        }
    };

    const filteredComments = allComments.filter(comment => comment.articleId === articleId);

    useEffect(() => {
        update();
    }, [update]);

    const articleInfoLayout: JSX.Element[] = articleInfo.map((article, key) => {
        return (
            <Row key={key}>
                <Col lg={6} md={6} sm={6}>
                    <img
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        src={config.baseUrl + article.image}
                        alt="room"
                    />
                </Col>
                <Col>
                    <h3 className={'article-info-page-title'}>{article.title.toString()}</h3>
                    <h5>{new Date(article.createdAt).toLocaleDateString()}</h5>
                    <p className={'article-info-page-description'}>{article.text}</p>
                </Col>
            </Row>
        );
    });

    return (
        <div className="article-info-page">
            <div className="article-info-page-bg d-flex justify-content-center align-items-end" />
            <Container className="article-info-page-wrapper">
                {articleInfo.length !== 0 ? (
                    articleInfoLayout
                ) : (
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <Loader />
                    </div>
                )}
                <div className={'comment-wrapper'}>
                    {context.isAuthenticated ? (
                        <div className="comment-form">
                            <textarea
                                name={'text'}
                                placeholder={'Your comment ...'}
                                onChange={onChangeTextArea}
                                className={'form-control'}
                                style={{ resize: 'none' }}
                            />
                            <button className={'button btn-black'} onClick={addCommentHandler}>
                                Send comment
                            </button>
                        </div>
                    ) : (
                        <h4 className={'unauth-comment-title'}>Please log in, to leave comments</h4>
                    )}

                    <div className="comments-list">
                        <h3>Comments</h3>
                        {filteredComments.length !== 0 ? (
                            filteredComments.map(comment => {
                                return (
                                    <li className={'comments-list-item'} key={comment._id}>
                                        <div>
                                            <div className={'comments-list-item-header'}>
                                                <span>{comment.userEmail.split('@')[0]}</span>
                                                <span>
                                                    {comment.createdAt ? comment.createdAt.split('T')[0] : null}
                                                </span>
                                            </div>
                                            <div className={'comments-list-item-body'}>
                                                {isEdit.edit && isEdit.id === comment._id ? (
                                                    <div className={'edit-wrapper'}>
                                                        <input
                                                            defaultValue={comment.text}
                                                            type="text"
                                                            name="text"
                                                            id={'comment-edit-input'}
                                                            className={'form-control'}
                                                            onChange={e =>
                                                                setCommentForm({
                                                                    ...commentForm,
                                                                    [e.target.name]: e.target.value,
                                                                    _id: comment._id,
                                                                })
                                                            }
                                                        />
                                                        <Tooltip title={'Save'}>
                                                            <IconButton
                                                                className={'icon-buttons'}
                                                                onClick={updateCommentHandler}
                                                            >
                                                                <Save color="action" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title={'Cancel'}>
                                                            <IconButton
                                                                className={'icon-buttons'}
                                                                onClick={() => setIsEdit({ edit: false, id: '' })}
                                                            >
                                                                <Cancel color="error" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                ) : (
                                                    <p>{comment.text}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            {context.fetchedUserInfo.email === comment.userEmail ? (
                                                <>
                                                    <Tooltip title={'Delete'}>
                                                        <IconButton
                                                            className={'icon-buttons'}
                                                            id={comment._id}
                                                            hidden={isEdit.edit && isEdit.id === comment._id}
                                                            onClick={deleteCommentHandler}
                                                        >
                                                            <Delete color="error" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={'Edit'}>
                                                        <IconButton
                                                            className={'icon-buttons'}
                                                            hidden={isEdit.edit && isEdit.id === comment._id}
                                                            onClick={() => toggleEditMode(comment._id)}
                                                            id={comment._id}
                                                        >
                                                            <Edit color="primary" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </>
                                            ) : null}
                                        </div>
                                    </li>
                                );
                            })
                        ) : (
                            <p>There no comments</p>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
