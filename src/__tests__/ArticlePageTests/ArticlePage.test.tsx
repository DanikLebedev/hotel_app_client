import { shallow } from 'enzyme';
import React from 'react';
import ArticlesPage from '../../pages/ArticlesPage/ArticlesPage';
import ArticlesList from '../../components/ArticlesList/ArticlesList';
import ArticleItem from '../../components/ArticleItem/ArticleItem';

const articleData = {
    title: '',
    image: '',
    text: '',
    createdAt: '',
};

describe('articles page test tests', () => {
    it('should renders room page without crashing', function() {
        const wrapper = shallow(<ArticlesPage />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should renders articles list without crashing', function() {
        const wrapper = shallow(<ArticlesList />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should renders articles item without crashing', function() {
        const wrapper = shallow(<ArticleItem articleInfo={articleData} />);
        expect(wrapper).toMatchSnapshot();
    });
});
