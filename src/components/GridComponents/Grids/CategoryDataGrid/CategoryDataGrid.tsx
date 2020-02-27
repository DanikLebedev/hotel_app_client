import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Category } from '../../../../interfaces/clientInterfaces';
import { CategoryService } from '../../../../APIServices/categoryService';
import toaster from 'toasted-notes';
import { AdminCategoryForm } from '../../GridsForms/AdminCategoryForm/AdminCategoryForm';
import { IconButton, TextField } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import { AdminContext } from '../../../../context/admin.context';

export const CategoryDataGrid = () => {
    const fetchedCategories = useContext(AdminContext).fetchedCategories;
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editProps, setEditProps] = useState<Category>({
        title: '',
    });
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState(fetchedCategories);

    function updateComponent(): void {
        CategoryService.getAllCategories().then(({ categories }) => setCategories(categories));
    }

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

    const dataSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value);
    };

    const deleteCategoryHandler = async (event: React.MouseEvent<EventTarget>): Promise<void> => {
        const target = event.target as HTMLButtonElement;
        fetchedCategories.filter(category => {
            return category._id !== target.id;
        });
        const formData = new FormData();
        formData.append('_id', target.id);
        await CategoryService.deleteCategory(formData).then(data => {
            toaster.notify(data.message, {
                duration: 2000,
            });
        });
    };

    const addCategoryHandler = (): void => {
        setIsEdit(false);
        setShowModal(true);
    };

    const closeModal = (): void => {
        setShowModal(false);
    };

    const filteredFetchedCategories = categories.filter(category => {
        return category.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    useEffect(() => {
        updateComponent();
    }, [fetchedCategories]);

    return (
        <div className="grid-table-wrapper">
            <table className="m-3 grid-table">
                <thead>
                    <tr>
                        <th className={'search-by-input-wrapper'}>
                            <p>Title</p>
                            <TextField id="standard-basic" name="category-input" onChange={dataSearch} />
                        </th>
                        <th>
                            Actions
                            <IconButton className={'icon-buttons'} onClick={addCategoryHandler}>
                                <Add />
                            </IconButton>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFetchedCategories.length
                        ? filteredFetchedCategories.map((category, key) => {
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

            <AdminCategoryForm
                update={updateComponent}
                show={showModal}
                isEdit={isEdit}
                editProps={editProps}
                closeModal={closeModal}
            />
        </div>
    );
};
