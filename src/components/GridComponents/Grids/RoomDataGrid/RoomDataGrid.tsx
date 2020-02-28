import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Room } from '../../../../interfaces/clientInterfaces';
import { RoomService } from '../../../../APIServices/roomService';
import { config } from '../../../../config';
import toaster from 'toasted-notes';
import { RoomForm } from '../../GridsForms/AdminRoomForm/RoomForm';
import { Pagination } from '../../../Pagination/Pagination';
import { IconButton, TextField } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import { AdminContext } from '../../../../context/admin.context';
import { sortNumbersTypes } from '../../../../config';

type SortTypeParams = {
    class: string;
    fn: (a: Room, b: Room) => number | Room;
};

interface SortType {
    up: SortTypeParams;
    down: SortTypeParams;
    default: SortTypeParams;
}

export const RoomDataGrid: React.FC = () => {
    const fetchedRooms = useContext(AdminContext).fetchedRooms;
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [rooms, setRooms] = useState<Room[]>(fetchedRooms);
    const [currentSort, setCurrentSort] = useState<string>('default');
    const [field, setField] = useState('');
    const [search, setSearch] = useState('');
    const [inputName, setInputName] = useState('');

    const [editProps, setEditProps] = useState<Room>({
        area: 0,
        category: '',
        description: '',
        guests: 0,
        image: '',
        isBooked: false,
        price: 0,
        rooms: 0,
        title: '',
    });

    function update(): void {
        RoomService.getAllRooms().then(({ rooms }) => setRooms(rooms));
    }

    const editRoomHandler = (event: React.MouseEvent<EventTarget>) => {
        setIsEdit(true);
        const target = event.target as HTMLButtonElement;
        const filteredRooms = fetchedRooms.find(room => {
            return room._id === target.id;
        });
        if (filteredRooms) {
            setEditProps({ ...filteredRooms });
            setShowModal(true);
        }
    };

    const deleteRoomHandler = async (event: React.MouseEvent<EventTarget>): Promise<void> => {
        const target = event.target as HTMLButtonElement;
        fetchedRooms.filter(room => {
            return room._id !== target.id;
        });
        const formData = new FormData();
        formData.append('_id', target.id);
        await RoomService.deleteRoom(formData).then(data => {
            toaster.notify(data.message, {
                duration: 2000,
            });
        });
        update();
    };

    const addRoomHandler = () => {
        setIsEdit(false);
        setShowModal(true);
    };

    const closeModal = (): void => {
        setShowModal(false);
    };

    const onSortChange = (field: string) => {
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

    const filteredRooms = (): Room[] => {
        if (inputName === 'category-input') {
            return rooms.filter(item => {
                return item.category.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            });
        } else if (inputName === 'title-input') {
            return rooms.filter(item => {
                return item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            });
        } else if (inputName === 'descr-input') {
            return rooms.filter(item => {
                return item.description.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            });
        } else if (inputName === 'price-input') {
            return rooms.filter(item => {
                return (
                    item.price
                        .toString()
                        .toLowerCase()
                        .indexOf(search.toLowerCase()) !== -1
                );
            });
        } else if (inputName === 'guests-input') {
            return rooms.filter(item => {
                return (
                    item.guests
                        .toString()
                        .toLowerCase()
                        .indexOf(search.toLowerCase()) !== -1
                );
            });
        } else if (inputName === 'area-input') {
            return rooms.filter(item => {
                return (
                    item.area
                        .toString()
                        .toLowerCase()
                        .indexOf(search.toLowerCase()) !== -1
                );
            });
        } else if (inputName === 'rooms-input') {
            return rooms.filter(item => {
                return (
                    item.rooms
                        .toString()
                        .toLowerCase()
                        .indexOf(search.toLowerCase()) !== -1
                );
            });
        }
        return rooms;
    };
    const dataSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value);
        setInputName(event.target.name);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(8);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentRoom = filteredRooms()
        .sort(sortNumbersTypes(field)[currentSort].fn)
        .slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        update();
    }, [fetchedRooms]);

    return (
        <div className="grid-table-wrapper">
            <table className="m-3 grid-table">
                <thead>
                    <tr>
                        <th>
                            <p>Category</p>
                            <div className={'d-flex'}>
                                <TextField id="standard-basic" name="category-input" onChange={dataSearch} />
                            </div>
                        </th>
                        <th>
                            <p>Title</p>
                            <div className={'d-flex'}>
                                <TextField id="standard-basic" name="title-input" onChange={dataSearch} />
                            </div>
                        </th>
                        <th style={{ width: '80px' }}>
                            <p>Price</p>
                            <div className={'d-flex'}>
                                <TextField id="standard-basic" name="price-input" onChange={dataSearch} />
                                <button className="sort-button" onClick={() => onSortChange('price')}>
                                    <i
                                        className={
                                            field === 'price'
                                                ? `fas fa-${sortNumbersTypes('price')[currentSort].class}`
                                                : 'fas fa-sort'
                                        }
                                    />
                                </button>
                            </div>
                        </th>
                        <th style={{ width: '80px' }}>
                            <p>Guests</p>
                            <div className={'d-flex'}>
                                <TextField id="standard-basic" name="guests-input" onChange={dataSearch} />
                                <button className="sort-button" onClick={() => onSortChange('guests')}>
                                    <i
                                        className={
                                            field === 'guests'
                                                ? `fas fa-${sortNumbersTypes('guests')[currentSort].class}`
                                                : 'fas fa-sort'
                                        }
                                    />
                                </button>
                            </div>
                        </th>
                        <th>
                            <p>Description</p>
                            <TextField id="standard-basic" name="descr-input" onChange={dataSearch} />
                        </th>
                        <th style={{ width: '80px' }}>
                            <p>Rooms</p>
                            <div className={'d-flex'}>
                                <TextField id="standard-basic" name="rooms-input" onChange={dataSearch} />
                                <button className="sort-button" onClick={() => onSortChange('rooms')}>
                                    <i
                                        className={
                                            field === 'rooms'
                                                ? `fas fa-${sortNumbersTypes('rooms')[currentSort].class}`
                                                : 'fas fa-sort'
                                        }
                                    />
                                </button>
                            </div>
                        </th>
                        <th style={{ width: '80px' }}>
                            <p>Area</p>
                            <div className={'d-flex'}>
                                <TextField id="standard-basic" name="area-input" onChange={dataSearch} />
                                <button className="sort-button" onClick={() => onSortChange('area')}>
                                    <i
                                        className={
                                            field === 'area'
                                                ? `fas fa-${sortNumbersTypes('guests')[currentSort].class}`
                                                : 'fas fa-sort'
                                        }
                                    />
                                </button>
                            </div>
                        </th>
                        <th>
                            <p>Image</p>
                        </th>
                        <th>
                            <p>Actions</p>
                            <div className={'d-flex'}>
                                <IconButton className={'icon-buttons'} onClick={addRoomHandler}>
                                    <Add />
                                </IconButton>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentRoom.length
                        ? currentRoom.map((room, key) => {
                              return (
                                  <tr key={key}>
                                      <td>{room.category}</td>
                                      <td>{room.title}</td>
                                      <td>{room.price}</td>
                                      <td>{room.guests}</td>
                                      <td>{room.description}</td>
                                      <td>{room.rooms}</td>
                                      <td>{room.area}</td>
                                      <td style={{ minWidth: '200px' }}>
                                          <div
                                              className="room-img"
                                              style={{
                                                  background: `url("${config.baseUrl +
                                                      room.image}") center center / cover`,
                                                  height: '100px',
                                                  width: '100%',
                                              }}
                                          />
                                      </td>
                                      <td>
                                          <IconButton
                                              className={'icon-buttons'}
                                              id={room._id}
                                              onClick={deleteRoomHandler}
                                          >
                                              <Delete color="error" />
                                          </IconButton>
                                          <IconButton
                                              className={'icon-buttons'}
                                              id={room._id}
                                              onClick={editRoomHandler}
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
            <Pagination
                postPerPage={postPerPage}
                totalPosts={fetchedRooms.length}
                paginate={paginate}
                currentPage={currentPage}
            />
            <RoomForm update={update} show={showModal} isEdit={isEdit} editProps={editProps} closeModal={closeModal} />
        </div>
    );
};
