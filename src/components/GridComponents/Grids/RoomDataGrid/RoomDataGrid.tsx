import React, { useCallback, useEffect, useState } from 'react';
import { Room } from '../../../../interfaces/clientInterfaces';
import { RoomService } from '../../../../APIServices/roomService';
import { config } from '../../../../config';
import toaster from 'toasted-notes';
import { RoomForm } from '../../GridsForms/AdminRoomForm/RoomForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from '../../../Pagination/Pagination';
import { IconButton } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';

export const RoomDataGrid: React.FC = () => {
    const [fetchedRooms, setFetchedRooms] = useState<Room[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(3);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentRoom = fetchedRooms.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

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

    const fetchRoom: CallableFunction = useCallback(() => {
        RoomService.getAllRooms().then(({ rooms }) => setFetchedRooms(rooms));
    }, []);

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
        const filteredRooms = fetchedRooms.filter(room => {
            return room._id !== target.id;
        });
        setFetchedRooms(filteredRooms);
        const formData = new FormData();
        formData.append('_id', target.id);
        await RoomService.deleteRoom(formData).then(data => {
            toaster.notify(data.message, {
                duration: 2000,
            });
        });
    };

    const addRoomHandler = () => {
        setIsEdit(false);
        setShowModal(true);
    };

    const closeModal = (): void => {
        setShowModal(false);
    };

    useEffect(() => {
        fetchRoom();
    }, [fetchRoom, fetchedRooms]);

    return (
        <div className="grid-table-wrapper">
            <table className="m-3 grid-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Guests</th>
                        <th>Description</th>
                        <th>Rooms</th>
                        <th>Area</th>
                        <th>Image</th>
                        <th>
                            Actions
                            <IconButton className={'icon-buttons'} onClick={addRoomHandler}>
                                <Add />
                            </IconButton>
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
                                      <td>
                                          <div
                                              className="room-img"
                                              style={{
                                                  background: `url("${config.baseUrl +
                                                      room.image}") center center / cover`,
                                                  height: '100px',
                                                  width: '100%',
                                              }}
                                          ></div>
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
            <RoomForm show={showModal} isEdit={isEdit} editProps={editProps} closeModal={closeModal} />
        </div>
    );
};
