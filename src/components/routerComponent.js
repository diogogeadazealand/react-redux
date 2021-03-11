import React from 'react';
import StoreComponent from './store/storeComponent';
import StandComponent from './stand/standComponent';
import OfficeComponent from './officeComponent';
import WorkerComponent from './workerComponent';
import { Switch, Route } from 'react-router-dom';

export default class RouterComponent extends React.Component{

    render(){
        return (
            <Switch>
                <Route exact path='/' component={StandComponent} />
                <Route path='/store' component={StoreComponent} />
                <Route path='/office' component={OfficeComponent} />
                <Route path='/office/:number' component={WorkerComponent} />
            </Switch>
        );
    }

}