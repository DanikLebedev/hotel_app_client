import { shallow } from 'enzyme';
import React from 'react';
import RoomsPage from '../../pages/RoomsPage/RoomsPage';
import RoomsList from '../../components/RoomsList/RoomsList';
import RoomItem from '../../components/RoomItem/RoomItem';

const roomData = {
    area: 0,
    category: '',
    description: '',
    guests: 0,
    image: '',
    isBooked: false,
    price: 0,
    rooms: 0,
    title: '',
    _id: '',
};

describe('rooms page test tests', () => {
    it('should renders room page without crashing', function() {
        const wrapper = shallow(<RoomsPage />);
        expect(wrapper).toMatchSnapshot()
    });

    it('should renders rooms list without crashing', function() {
        const wrapper = shallow(<RoomsList />);
        expect(wrapper).toMatchSnapshot()
    });

    it('should renders rooms item without crashing', function() {
        const wrapper = shallow(<RoomItem roomInfo={roomData} searchRoom={false} />);
        expect(wrapper).toMatchSnapshot()
    });
});
