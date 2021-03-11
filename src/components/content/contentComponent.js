import React from 'react';
import RouterComponent from '../routerComponent';
import './style.css'

export default class ContentComponent extends React.Component{

    render(){
        return (
            <div className="container">
                <RouterComponent />
            </div>
        );
    }

}