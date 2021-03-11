import React from 'react';
import { Link } from 'react-router-dom';
import { actions } from '../../actions';
import { connect } from 'react-redux';
import store from '../../reducers/store';
import './header.css';

class HeaderComponent extends React.Component{

    pages = [
        {
            name: "Stand",
            path: '/'
        },
        {
            name: "Store",
            path: '/store'
        },
        {
            name: "Office",
            path: '/office'
        }
    ] 

    constructor(props){
        super(props);
        this.state = {curPage: this.getCurrentPage()};
    }

    getCurrentPage = () => {

        let curPage;

        this.pages.forEach( page => {
            if(page.path === window.location.pathname){
                curPage = page;
                return;
            }
        })
        return curPage;
    }
    
    changePage = (page) => {
        this.setState({
            ...this.state,
            curPage: page
        });
    }

    render(){
        return (
            <nav>
                <img class="picture" src={this.props.picture}/>
                <h3>Me, the Manager</h3>
                <button class="picture_button" onClick={this.props.getPicture}>Change Picture</button>
                <h2 id="logo">Lemonade Stand</h2>
                <ul>
                {
                    this.pages.map( page => 
                        <li key={page.name} className={this.state.curPage.path === page.path ? 'active' : ''}>
                            <Link onClick={() => this.changePage(page)} to={page.path}>{page.name}</Link>
                        </li>
                    )
                }
                </ul>
            </nav>
        );
    }

}

let mapStateToProps = (state) => {
    return{
        picture: state.picture
    }
}

let mapDispatchtoProps = (dispatch) => {
    return{
        getPicture: () => { dispatch(actions.getPicture) }
    }
}


export default connect(mapStateToProps, mapDispatchtoProps)(HeaderComponent);