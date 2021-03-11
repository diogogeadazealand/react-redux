import React from 'react';
import { connect } from 'react-redux';
import './stand.css';
import stand from './stand.jpg';

import { actions } from '../../actions';
import { DRINKS } from '../../models/drink';

class StandComponent extends React.Component {

    state = {
        isClosed: true
    }

    render() {
        return (
            <div className="grid">
                <article>
                    <h2>Drinks</h2>
                    <ul>
                        {
                            this.props.stock.drinks.map( drink =>
                                <li key={drink.name}><h3 className="title">{drink.name}</h3><div><h3>{drink.quantity}</h3></div></li>
                            )
                        }
                    </ul>
                    <h2>Recipes</h2>
                    <div id="recipes">
                        {
                            Object.keys(DRINKS).map( drink =>
                                <article key={'drink_'+DRINKS[drink].name}>
                                    <h3 key={'recipe_' + DRINKS[drink].name+ '_title'}>{DRINKS[drink].name} <span className="price">{DRINKS[drink].price}€</span><button onClick={() => this.props.makeDrink(DRINKS[drink].name)} disabled={DRINKS[drink].canMake(DRINKS[drink], this.props.stock.ingredients).response ? false : true}>Make</button></h3>

                                    <ul key={'recipe_' + DRINKS[drink].name+ '_ingredients'}>
                                        {

                                            DRINKS[drink].ingredients.map( ingredient => 
                                                <li key={'recipe_' + DRINKS[drink].name+'_'+ingredient.name} 
                                                className={this.getIngredientQuantity(ingredient.name) >= ingredient.quantity ? "positiv" : "" }>{ingredient.name} {this.getIngredientQuantity(ingredient.name)}/{ingredient.quantity}</li>
                                            )
                                        }
                                    </ul>
                                </article>
                            )
                        }
                    </div>
                </article>
                
                <div>
                    <h3 className="cash">{this.props.cash}€</h3>
                    <div id="stand" className={this.state.isClosed ? 'closed' : ''}>
                        <div>
                            <h1>Closed</h1>
                        </div>
                        <img id="stand" src={stand} />
                    </div>
                    <button onClick={this.openStand} id="openStand">Open Stand</button>
                </div>

                <article>
                    <h2>Ingredients</h2>
                    <ul>
                        {
                            this.props.stock.ingredients.map( ingredient =>
                                <li key={ingredient.name}>{ingredient.name} <span className="quantity" >{ingredient.quantity}</span></li>
                            )
                        }
                    </ul>
                </article>
            </div>
        );
    }
    
    openStand = () => {

        if(this.props.stock.drinks.length === 0) {
            document.querySelector("#openStand").disabled = false;
            this.setState({...this.state, isClosed: true});
            return;
        };

        document.querySelector("#openStand").disabled = true;
        this.setState({...this.state, isClosed: false});

        let totalDrinks = 0;
        let lastTime = 0;

        this.props.stock.drinks.forEach( drink => {
            totalDrinks += drink.quantity;
        });

        let drinkIndex = (this.props.stock.drinks.length <= 1) ? 0 : Math.round(Math.random() * this.props.stock.drinks.length-1);

        setTimeout(() => {
            this.props.sellDrink(this.props.stock.drinks[drinkIndex].name);
            this.openStand();
        }, (Math.random() * 5000)+500);
    }

    getIngredientQuantity(name){
        let quantity = 0;
        this.props.stock.ingredients.forEach(ingredient => {
            if(ingredient.name == name){
                quantity = ingredient.quantity;
                return;
            }
        });
        return quantity;
    }
}

function mapStateToProps (state) {
    return{
        stock: state.stock,
        cash: state.cash
    };
}

function mapDispatchtoProps (dispatch) {
    return {
        sellDrink: (drink) => { dispatch(actions.sellDrink(drink)) },
        makeDrink: (drink) => { dispatch(actions.makeDrink(drink)) }
    };
}

export default connect(mapStateToProps, mapDispatchtoProps)(StandComponent);