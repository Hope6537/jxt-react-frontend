/**
 * 食谱组件
 * Created by hope6537 on 16/5/18.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import MealCard from '../../component/meal/MealCard'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Parent from '../Parent'

class MealDataComponent extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <MealCard date="2016年05月18日" isFirst={true}/>
                <MealCard date="2016年05月17日"/>
                <MealCard date="2016年05月16日"/>
                <MealCard date="2016年05月15日"/>
            </div>

        )
    }
}


const Meal = () => (
    <Parent dataComponent={<MealDataComponent/>}/>
);

export default Meal
