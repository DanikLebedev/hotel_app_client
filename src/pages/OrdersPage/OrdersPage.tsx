import {Responsive, WidthProvider} from 'react-grid-layout';
import React from 'react'
import './OrdersPage.scss'
import '../../assets/rglstyles.css'
import '../../assets/resizablestyles.css'

const ResponsiveGridLayout = WidthProvider(Responsive);

export const OrderPage = () => {
    const layout1 = [
        {i: '1', x: 0, y: 0, w: 3, h: 2, },
        {i: '2', x: 3, y: 2, w: 2, h: 2,},
        {i: '3', x: 4, y: 0, w: 1, h: 2}
    ];
        return (
            <ResponsiveGridLayout className="layout"
                                  layouts={{lg:layout1}}
                                  breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                                  cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
                <div className={'grid-div'} key="1">
                    <select name="categories" id="categories">
                    </select>
                    <input type="text" name='title' id='title' placeholder='title'
                          />
                    <input type="number" name='price' id='price' placeholder='price' />
                    <input type="number" name='guests' id='guests' placeholder='guests'/>
                    <input type="text" name='description' id='description' placeholder='description'
                           />
                    <input type="file" name='image' id='image' placeholder='image'/>
                    <input type="number" name='rooms' id='rooms' placeholder='rooms'
                          />
                    <input type="number" name='area' id='area' placeholder='area' />
                    <button>Add category</button>
                </div>
                <div className={'grid-div'} key="2">2</div>
                <div className={'grid-div'} key="3">3</div>
            </ResponsiveGridLayout>
        )
}