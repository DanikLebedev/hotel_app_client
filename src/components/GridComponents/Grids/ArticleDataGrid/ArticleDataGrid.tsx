import React, { useContext, useState, ChangeEvent, useEffect } from 'react';
import { Article } from '../../../../interfaces/clientInterfaces';
import { Pagination } from '../../../Pagination/Pagination';
import { IconButton, TextField, Tooltip } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import toaster from 'toasted-notes';
import { AdminArticleForm } from '../../GridsForms/AdminArticleForm/AdminArticleForm';
import { AdminContext } from '../../../../context/admin.context';
import { config, sortNumbersTypes } from '../../../../config';
import { ConfirmDeleteModal } from '../../../ConfirmDeleteModal/ConfirmDeleteModal';
import { ArticleService } from '../../../../APIServices/articleService';

export const ArticleDataGrid: React.FC = () => {
    const fetchedAllArticles = useContext(AdminContext).fetchedAllArticles;
    const token = useContext(AdminContext).token;
    const [articles, setArticles] = useState<Article[]>(fetchedAllArticles);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editProps, setEditProps] = useState<Article>({
        title: '',
        text: '',
        image: '',
        createdAt: '',
    });
    const [search, setSearch] = useState('');
    const [inputName, setInputName] = useState('');
    const [currentSort, setCurrentSort] = useState<string>('default');
    const [field, setField] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [targetId, setTargetId] = useState<string>('');

    const displayConfirmModal = (event: React.MouseEvent<EventTarget>) => {
        const target = event.target as HTMLButtonElement;
        setTargetId(target.id);
        setShowConfirmModal(true);
    };

    const closeConfirmModal = () => {
        setShowConfirmModal(false);
    };

    const filteredArticles = (): Article[] => {
        if (inputName === 'title-input') {
            return articles.filter(article => {
                return article.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            });
        } else if (inputName === 'text-input') {
            return articles.filter(article => {
                return article.text.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            });
        } else if (inputName === 'created-input') {
            return articles.filter(article => {
                if (article !== undefined) {
                    return article.createdAt.toLowerCase().indexOf(search.toLowerCase()) !== -1;
                }
            });
        } else {
            return articles;
        }
    };

    function update(): void {
        ArticleService.getAllArticles().then(({ article }) => setArticles(article));
    }

    const editOrderHandler = (event: React.MouseEvent<EventTarget>): void => {
        setIsEdit(true);
        const target = event.target as HTMLButtonElement;
        const filteredArticles = articles.find(article => {
            return article._id === target.id;
        });
        if (filteredArticles) {
            setEditProps({ ...filteredArticles });
            setShowModal(true);
        }
    };

    const deleteArticleHandler = async (): Promise<void> => {
        articles.filter(article => {
            return article._id !== targetId;
        });
        const formData = new FormData();
        formData.append('_id', targetId);
        await ArticleService.deleteArticle(formData, { Authorization: `Bearer ${token}` }).then(data => {
            update();
            setShowConfirmModal(false);
            toaster.notify(data.message, {
                duration: 2000,
            });
        });
    };

    const dataSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value);
        setInputName(event.target.name);
    };

    const addArticleHandler = (): void => {
        setIsEdit(false);
        setShowModal(true);
    };

    const closeModal = (): void => {
        setShowModal(false);
    };

    const onSortChange = (field: string): void => {
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

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(8);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = filteredArticles()
        .sort(sortNumbersTypes(field)[currentSort].fn)
        .slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number): void => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        update();
    }, [fetchedAllArticles]);

    return (
        <div className="grid-table-wrapper">
            <table className="m-3 grid-table">
                <thead>
                    <tr>
                        <th>
                            <p>Title</p>
                            <TextField id="standard-basic" name="title-input" onChange={dataSearch} />
                        </th>
                        <th>
                            <p>Text</p>
                            <div className={'d-flex'}>
                                <TextField id="standard-basic" name="text-input" onChange={dataSearch} />
                            </div>
                        </th>
                        <th>
                            <p>Created Date</p>
                            <div className={'d-flex'}>
                                <TextField id="x-basic" name="created-input" onChange={dataSearch} />
                                <Tooltip title={'Sort'}>
                                    <button className="sort-button" onClick={(): void => onSortChange('created')}>
                                        <i
                                            className={
                                                field === 'created'
                                                    ? `fas fa-${sortNumbersTypes('created')[currentSort].class}`
                                                    : 'fas fa-sort'
                                            }
                                        />
                                    </button>
                                </Tooltip>
                            </div>
                        </th>
                        <th>
                            <p>image</p>
                        </th>
                        <th>
                            <p>Actions</p>
                            <Tooltip title={'Add'}>
                                <IconButton className={'icon-buttons'} onClick={addArticleHandler}>
                                    <Add />
                                </IconButton>
                            </Tooltip>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.length
                        ? currentPosts.map((article, key) => {
                              return (
                                  <tr key={key}>
                                      <td>{article.title}</td>
                                      <td>{article.text}</td>
                                      <td>{article ? new Date(article.createdAt).toLocaleDateString() : null}</td>
                                      <td style={{ minWidth: '200px' }}>
                                          <div
                                              className="room-img"
                                              style={{
                                                  background: `url("${config.baseUrl +
                                                      article.image}") center center / cover`,
                                                  height: '100px',
                                                  width: '100%',
                                              }}
                                          />
                                      </td>
                                      <td>
                                          <Tooltip title={'Delete'}>
                                              <IconButton
                                                  className={'icon-buttons'}
                                                  id={article._id}
                                                  onClick={displayConfirmModal}
                                              >
                                                  <Delete color="error" />
                                              </IconButton>
                                          </Tooltip>
                                          <Tooltip title={'Edit'}>
                                              <IconButton
                                                  className={'icon-buttons'}
                                                  id={article._id}
                                                  onClick={editOrderHandler}
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
            <ConfirmDeleteModal
                show={showConfirmModal}
                id={targetId}
                onDelete={deleteArticleHandler}
                closeModal={closeConfirmModal}
            />
            <AdminArticleForm
                update={update}
                isEdit={isEdit}
                closeModal={closeModal}
                editProps={editProps}
                show={showModal}
            />
            <Pagination
                postPerPage={postPerPage}
                totalPosts={articles.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};
