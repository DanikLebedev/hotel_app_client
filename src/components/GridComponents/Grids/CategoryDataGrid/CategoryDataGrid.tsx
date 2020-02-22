import React, { useCallback, useEffect, useState } from 'react';
import { Category } from '../../../../interfaces/clientInterfaces';
import { CategoryService } from '../../../../APIServices/categoryService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import toaster from 'toasted-notes';
import { AdminCategoryForm } from '../../GridsForms/AdminCategoryForm/AdminCategoryForm';


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
                            actions
                            <button className={'icon-buttons'} onClick={addCategoryHandler}>
                                <FontAwesomeIcon color="green" icon={faPlusSquare} />
                            </button>
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
                                          <button
                                              className={'icon-buttons'}
                                              id={category._id}
                                              onClick={deleteCategoryHandler}
                                          >
                                              <FontAwesomeIcon color="red" icon={faTrash} />
                                          </button>
                                          <button
                                              className={'icon-buttons'}
                                              id={category._id}
                                              onClick={editCategoryHandler}
                                          >
                                              <FontAwesomeIcon color="white" icon={faEdit} />
                                          </button>
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
