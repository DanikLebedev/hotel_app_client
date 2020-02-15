import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Category, Room, Rooms } from '../../interfaces/clientInterfaces';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/auth.context';
import { useHistory } from 'react-router-dom';
import { RoomService } from '../../APIServices/roomService';
import { CategoryService } from '../../APIServices/categoryService';
import toaster from 'toasted-notes';
import ScrollableAnchor from 'react-scrollable-anchor';

export const HomePageBookForm: React.FC = (): JSX.Element => {
    const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
    const { error, clearError } = useHttp();
    const auth = useContext(AuthContext);
    const isAuthenticated = auth.isAuthenticated;
    const history = useHistory();
    const selectOrderChangeHandler = async (event: ChangeEvent<HTMLSelectElement>): Promise<void> => {
        event.persist();
        const { rooms }: Rooms = await RoomService.getAllRooms();
        const filteredRooms: Room[] = rooms.filter(item => {
            return item.category.toString() === event.target.value.toString() && !item.isBooked;
        });
        setFilteredRooms(filteredRooms);
    };

    const fetchCategories: CallableFunction = useCallback(() => {
        CategoryService.getAllCategories().then(({ categories }) => setFetchedCategories(categories));
    }, []);

    const addOrderHandler = async (): Promise<void> => {
        if (filteredRooms.length === 0) {
            toaster.notify('Sorry, all rooms are booked', {
                duration: 2000,
            });
        } else {
            history.push(`/rooms/${filteredRooms[0]._id}`);
        }
    };

    const options: JSX.Element[] = fetchedCategories.map(({ title }, index) => {
        return (
            <option key={title + index} value={title}>
                {title}
            </option>
        );
    });

    useEffect(() => {
        fetchCategories();
        toaster.notify(error, {
            duration: 2000,
        });
        clearError();
    }, [fetchCategories, error, clearError]);

    return (
        <Container>
            <ScrollableAnchor id={'home-page-book-form'}>
                <Row>
                    <Col lg={12} md={12} sm={12}>
                        <div className="d-flex home-page__book-form justify-content-center align-items-center flex-column">
                            <h2>Choose Your Room</h2>
                            <select
                                className={'form-control w-50 m-2'}
                                onChange={selectOrderChangeHandler}
                                name="category"
                            >
                                {options}
                            </select>
                            <button className={'button btn-black'} onClick={addOrderHandler}>
                                Find
                            </button>
                        </div>
                    </Col>
                </Row>
            </ScrollableAnchor>
        </Container>
    );
};
