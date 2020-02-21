import React from 'react';
import { render } from '@testing-library/react';
import { HomePageArticles } from '../components/HomePageComponents/HomePageArticles';
import ReactDOM from 'react-dom';

it('should renders without crashing', function() {
    const div = document.createElement('div');
    ReactDOM.render(<HomePageArticles />, div);
});
