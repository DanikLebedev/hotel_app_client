import React, { useCallback, useState, useEffect, useContext, ChangeEvent } from 'react';
import { Article, Customer, Comment } from '../../interfaces/clientInterfaces';
import { useParams } from 'react-router-dom';
import { ArticleService } from '../../APIServices/articleService';
import { Col, Container, Row } from 'react-bootstrap';
import { config } from '../../config';
import Loader from '../../components/Loader/Loader';
import './ArticleInfoPage.scss';
import { ClientContext } from '../../context/client.context';
import { CustomerService } from '../../APIServices/customerService';
import { CommentService } from '../../APIServices/commentService';
import toaster from 'toasted-notes';

export const ArticleInfoPage: React.FC = () => {
    const context = useContext(ClientContext);
    const params: { id?: string } = useParams();
    const articleId: string | undefined = params.id;
    const [articleInfo, setArticleInfo] = useState<Article[]>([]);
    // const [userInfo, setUserInfo] = useState<Customer>(context.fetchedUserInfo);
    const [allComments, setAllComments] = useState<Comment[]>(context.fetchedComments);
    const [commentForm, setCommentForm] = useState<Comment>({
        text: '',
        createdAt: '',
        userEmail: context.fetchedUserInfo.email,
        articleId: articleId,
    });

    const update = useCallback(() => {
        ArticleService.getArticleById(articleId).then(({ article }) => {
            setArticleInfo(article);
        });
        CommentService.getAllComments().then(({ comment }) => setAllComments(comment));
    }, [articleId, context.token]);

    const onChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentForm({ ...commentForm, [event.target.name]: event.target.value });
    };

    const addCommentHandler = async () => {
        try {
            console.log(commentForm);
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
                    <div className="comment-form">
                        <textarea
                            title={'comment'}
                            name={'text'}
                            onChange={onChangeTextArea}
                            className={'form-control'}
                            rows={4}
                        />
                        <button className={'button btn-black'} onClick={addCommentHandler}>
                            Send comment
                        </button>
                    </div>
                    <div className="comments-list">
                        {allComments.length ? (
                            allComments
                                .filter(comment => comment.articleId === articleId)
                                .map(comment => {
                                    return <li key={comment._id}>{comment.text}</li>;
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
