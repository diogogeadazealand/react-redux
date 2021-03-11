import React from 'react';
import {INGREDIENTS} from '../../models/ingredient'
import './store.css';

import { actions } from '../../actions';
import { connect } from 'react-redux';

class StoreComponent extends React.Component{

    render(){
        return(
            <div className="store">
                <h3 id="cash">Money: {this.props.cash}€</h3>
                {
                    Object.keys(INGREDIENTS).map( key => 
                        <article key={"ingredient_"+INGREDIENTS[key].name} onClick={() => this.props.buyIngredient(INGREDIENTS[key].name)}>
                            <img src={"/assets/ingredients/" + INGREDIENTS[key].name.toLowerCase() + ".png" } />
                            <h3>{INGREDIENTS[key].name}</h3>
                            <h4>{INGREDIENTS[key].price}€</h4>
                        </article>    
                    )
                }
            </div>
        );
    }

}

function mapStateToProps(state){
    return{
        stock: state.stock,
        cash: state.cash
    };
}

function mapDispatchtoProps (dispatch) {
    return {
        buyIngredient: (ingredient) => { dispatch(actions.buyIngredient(ingredient)) }
    };
}

export default connect(mapStateToProps, mapDispatchtoProps)(StoreComponent);