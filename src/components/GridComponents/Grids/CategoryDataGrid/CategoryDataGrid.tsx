import React, { useCallback, useEffect, useState } from 'react';
import { Category } from '../../../../interfaces/clientInterfaces';
import { CategoryService } from '../../../../APIServices/categoryService';
import toaster from 'toasted-notes';
import { AdminCategoryForm } from '../../GridsForms/AdminCategoryForm/AdminCategoryForm';
import { IconButton } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';

export const CategoryDataGrid = () => {
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editProps, setEditProps] = useState<Category>({
        title: '',
    });

    const fetchCategories: CallableFunction = useCallback(() => {
        CategoryService.getAllCategories().then(({ categories }) => setFetchedCategories(categories));
    }, []);

    const editCategoryHandler = (event: React.MouseEvent<EventTarget>): void => {
        setIsEdit(true);
        const target = event.target as HTMLButtonElement;
        const filteredCategories = fetchedCategories.find(category => {
            return category._id === target.id;
        });
        if (filteredCategories) {
            setEditProps({ ...filteredCategories });
            setShowModal(true);
        }
    };

    const deleteCategoryHandler = async (event: React.MouseEvent<EventTarget>): Promise<void> => {
        const target = event.target as HTMLButtonElement;
        const filteredCategories = fetchedCategories.filter(category => {
            return category._id !== target.id;
        });
        setFetchedCategories(filteredCategories);
        const formData = new FormData();
        formData.append('_id', target.id);
        await CategoryService.deleteCategory(formData).then(data => {
            toaster.notify(data.message, {
                duration: 2000,
            });
        });
    };

    const addCategoryHandler = () => {
        setIsEdit(false);
        setShowModal(true);
    };

    const closeModal = (): void => {
        setShowModal(false);
    };

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories, fetchedCategories]);

    return (
        <div className="grid-table-wrapper">
            <table className="m-3 grid-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>
                            Actions
                            <IconButton className={'icon-buttons'} onClick={addCategoryHandler}>
                                <Add />
                            </IconButton>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {fetchedCategories.length
                        ? fetchedCategories.map((category, key) => {
                              return (
                                  <tr key={key}>
                                      <td>{category.title}</td>
                                      <td>
                                          <IconButton
                                              className={'icon-buttons'}
                                              id={category._id}
                                              onClick={deleteCategoryHandler}
                                          >
                                              <Delete color="error" />
                                          </IconButton>
                                          <IconButton
                                              className={'icon-buttons'}
                                              id={category._id}
                                              onClick={editCategoryHandler}
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
            <AdminCategoryForm show={showModal} isEdit={isEdit} editProps={editProps} closeModal={closeModal} />
        </div>
    );
};
