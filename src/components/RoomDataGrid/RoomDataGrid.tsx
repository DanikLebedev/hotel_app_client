import React, { useCallback, useEffect, useState } from 'react';
import { Room } from '../../interfaces/clientInterfaces';
import { RoomService } from '../../APIServices/roomService';
import { CategoryService } from '../../APIServices/categoryService';
import { Table } from 'react-bootstrap';
import { config } from '../../config';
import toaster from 'toasted-notes';
import { RoomForm } from '../AdminRoomForm/RoomForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

export const RoomDataGrid: React.FC = () => {
    const [fetchedRooms, setFetchedRooms] = useState<Room[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
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
        <>
            <Table bordered className="m-3">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>title</th>
                        <th>price</th>
                        <th>guests</th>
                        <th>description</th>
                        <th>rooms</th>
                        <th>area</th>
                        <th>image</th>
                        <th>
                            actions
                            <button className={'icon-buttons'} onClick={addRoomHandler}>
                                <FontAwesomeIcon color="green" icon={faPlusSquare} />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {fetchedRooms.length
                        ? fetchedRooms.map((room, key) => {
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
                                          <button className={'icon-buttons'} id={room._id} onClick={deleteRoomHandler}>
                                              <FontAwesomeIcon color="red" icon={faTrash} />
                                          </button>
                                          <button
                                              color="grey"
                                              className={'icon-buttons'}
                                              id={room._id}
                                              onClick={editRoomHandler}
                                          >
                                              <FontAwesomeIcon icon={faEdit} />
                                          </button>
                                      </td>
                                  </tr>
                              );
                          })
                        : null}
                </tbody>
            </Table>
            <RoomForm show={showModal} isEdit={isEdit} editProps={editProps} closeModal={closeModal} />
        </>
    );
};
