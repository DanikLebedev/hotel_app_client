import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Category } from '../../../../interfaces/clientInterfaces';
import { CategoryService } from '../../../../APIServices/categoryService';
import toaster from 'toasted-notes';
import { AdminCategoryForm } from '../../GridsForms/AdminCategoryForm/AdminCategoryForm';
import { IconButton, TextField, Tooltip } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import { AdminContext } from '../../../../context/admin.context';
import { sortNumbersTypes } from '../../../../config';
import { Pagination } from '../../../Pagination/Pagination';

export const CategoryDataGrid: React.FC = () => {
    const fetchedCategories: Category[] = useContext(AdminContext).fetchedCategories;
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editProps, setEditProps] = useState<Category>({
        title: '',
    });
    const [search, setSearch] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>(fetchedCategories);

    function updateComponent(): void {
        CategoryService.getAllCategories().then(({ categories }) => setCategories(categories));
    }

    const editCategoryHandler = (event: React.MouseEvent<EventTarget>): void => {
        setIsEdit(true);
        const target = event.target as HTMLButtonElement;
        const filteredCategories: Category | undefined = fetchedCategories.find(category => {
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
        const formData: FormData = new FormData();
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

    const filteredFetchedCategories: Category[] = categories.filter(category => {
        return category.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(8);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentCategory = filteredFetchedCategories.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        updateComponent();
    }, [fetchedCategories]);

    return (
        <>
            <div className="grid-table-wrapper">
                <table className="m-3 grid-table">
                    <thead>
                        <tr>
                            <th className={'search-by-input-wrapper'}>
                                <p>Title</p>
                                <TextField id="standard-basic" name="category-input" onChange={dataSearch} />
                            </th>
                            <th>
                                <p>Actions</p>
                                <Tooltip title={'Add'}>
                                    <IconButton className={'icon-buttons'} onClick={addCategoryHandler}>
                                        <Add />
                                    </IconButton>
                                </Tooltip>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCategory.length
                            ? currentCategory.map((category, key) => {
                                  return (
                                      <tr key={key}>
                                          <td>{category.title}</td>
                                          <td>
                                              <Tooltip title={'Delete'}>
                                                  <IconButton
                                                      className={'icon-buttons'}
                                                      id={category._id}
                                                      onClick={deleteCategoryHandler}
                                                  >
                                                      <Delete color="error" />
                                                  </IconButton>
                                              </Tooltip>
                                              <Tooltip title={'Edit'}>
                                                  <IconButton
                                                      className={'icon-buttons'}
                                                      id={category._id}
                                                      onClick={editCategoryHandler}
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
                    totalPosts={fetchedCategories.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>

            <AdminCategoryForm
                update={updateComponent}
                show={showModal}
                isEdit={isEdit}
                editProps={editProps}
                closeModal={closeModal}
            />
        </>
    );
};
