import { Container } from 'react-bootstrap';
import React, {useContext, useEffect, useState} from 'react';
import { Category, Data } from '../../../../interfaces/clientInterfaces';
import toaster from 'toasted-notes';
import { CategoryService } from '../../../../APIServices/categoryService';
import { handleClickOutside } from '../../../../sharedMethods/outsideClick';
import { Close } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import {AdminContext} from "../../../../context/admin.context";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface CategoryForm {
    closeModal: () => void;
    show: boolean;
    editProps: Category;
    isEdit: boolean;
    update: () => void;
}

export const AdminCategoryForm: React.FC<CategoryForm> = (props: CategoryForm) => {
    const [categoryForm, setCategoryForm] = useState<Category>(props.editProps);
    const token = useContext(AdminContext).token
    const addCategoryHandler = async (): Promise<void> => {
        if (props.isEdit) {
            const data: Data = await CategoryService.updateCategory(JSON.stringify(categoryForm), {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            });
            toaster.notify(data.message, {
                duration: 2000,
            });
            props.update();
        } else {
            const data: Data = await CategoryService.postCategory(categoryForm, {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            });
            setCategoryForm({
                title: '',
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
            setCategoryForm(props.editProps);
        } else {
            setCategoryForm({
                title: '',
            });
        }
    }, [props.isEdit, props.editProps]);

    const categoryChangeHandler = (event: InputEvent): void => {
        setCategoryForm({ ...categoryForm, [event.target.name]: event.target.value });
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
                <div className="admin-form">
                    <h3>Category form</h3>
                    <label htmlFor="title">Enter the Title</label>
                    <input
                        onChange={categoryChangeHandler}
                        type="text"
                        className={'form-control'}
                        value={categoryForm.title}
                        name="title"
                        id="title"
                        placeholder="title"
                    />
                    <Button onClick={addCategoryHandler} color="primary" variant="contained" className="mt-3">
                        {props.isEdit ? 'Update' : 'Create'} Category
                    </Button>
                    <button className={'close-modal-button'} onClick={() => props.closeModal()}>
                        <Close />
                    </button>
                </div>
            </div>
        </Container>
    );
};
