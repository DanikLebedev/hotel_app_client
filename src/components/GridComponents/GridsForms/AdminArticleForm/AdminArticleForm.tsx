import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import toaster from 'toasted-notes';
import { Article, Data } from '../../../../interfaces/clientInterfaces';
import { Col, Row } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { AdminContext } from '../../../../context/admin.context';
import { handleClickOutside } from '../../../../sharedMethods/outsideClick';
import { Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import {ArticleService} from "../../../../APIServices/articleService";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface ArticleForm {
    closeModal: () => void;
    show: boolean;
    editProps: Article;
    isEdit: boolean;
    update: () => void;
}

const useStyles = makeStyles(theme => ({
    input: {
        display: 'none',
    },
}));

export const AdminArticleForm: React.FC<ArticleForm> = (props: ArticleForm) => {
    const classes = useStyles();
    const [articleForm, setArticleForm] = useState<Article>(props.editProps);
    const token = useContext(AdminContext).token;

    const addArticleHandler = async (event: ChangeEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const formData: FormData = new FormData(event.target);
        if (props.isEdit) {
            const data: Data = await ArticleService.updateArticle(formData, {
                Authorization: `Bearer ${token}`,
            });
            toaster.notify(data.message, {
                duration: 2000,
            });
            props.update();
        } else {
            const response: Response = await fetch('/api/admin/articles/create', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data: Data = await response.json();
            toaster.notify(data.message, {
                duration: 2000,
            });
            setArticleForm({
                title: '',
                text: '',
                image: '',
                createdAt: '',
            });
            props.update();
        }
        props.closeModal();
    };

    const articleChangeHandler = (event: InputEvent): void => {
        setArticleForm({ ...articleForm, [event.target.name]: event.target.value });
    };
    const articleTextAreaChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setArticleForm({ ...articleForm, [event.target.name]: event.target.value });
    };

    const fileChangeHandler = (event: InputEvent): void => {
        if (event.target.files) {
            setArticleForm({ ...articleForm, [event.target.name]: event.target.files[0].name });
        }
    };

    useEffect(() => {
        if (props.isEdit) {
            setArticleForm(props.editProps);
        } else {
            setArticleForm({
                title: '',
                text: '',
                image: '',
                createdAt: '',
            });
        }
    }, [props.isEdit, props.editProps]);

    return (
        <div
            className={props.show ? 'show-modal add-modal-wrapper' : 'hide-modal'}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => handleClickOutside(event, 'overlay-edit-room', props)}
            id={'overlay-edit-room'}
        >
            <div key={1} className="d-flex justify-content-around align-items-center">
                <div className="admin-form">
                    <form onSubmit={addArticleHandler}>
                        <h3>{props.isEdit ? 'Update' : 'Create'} Article</h3>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                <label htmlFor="title">Enter the Title</label>
                                <input
                                    onChange={articleChangeHandler}
                                    type="text"
                                    className={'form-control'}
                                    value={articleForm.title}
                                    name="title"
                                    id="title"
                                    placeholder="title"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                <label htmlFor="price">Enter the text</label>
                                <textarea
                                    onChange={articleTextAreaChangeHandler}
                                    className={'form-control'}
                                    value={articleForm.text}
                                    name="text"
                                    id="text"
                                    placeholder="text"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                <label htmlFor="contained-button-file">
                                    Add photo
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                                <span>{articleForm.image}</span>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={fileChangeHandler}
                                    name="image"
                                    defaultValue={articleForm.image}
                                    placeholder="image"
                                />
                            </Col>
                        </Row>
                        {props.isEdit ? <input type="hidden" name="_id" value={articleForm._id} /> : null}
                        <Button type={'submit'} color="primary" variant="contained" className="mt-3">
                            {props.isEdit ? 'Update' : 'Create'} Article
                        </Button>
                    </form>
                    <button className="close-modal-button" onClick={(): void => props.closeModal()}>
                        <Close />
                    </button>
                </div>
            </div>
        </div>
    );
};
