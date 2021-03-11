import React from 'react';
import {
    IngredientFactory,
    INGREDIENTS
} from '../models/ingredient';
import {
    DrinkFactory,
    DRINKS,
    Drinks
} from '../models/drink'
import {
    ACTIONS,
    actions
} from '../actions';

const initialState = {
    stock: {
        drinks: [DrinkFactory("lemonade", 4)],
        ingredients: [],
    },
    cash: 0.2,
    picture: "https://via.placeholder.com/500x500"
};

export const standReducer = (state = initialState, action) => {

    let ingredients = state.stock.ingredients;
    let ingredient, index;

    switch (action.type) {
        case ACTIONS.SELL_DRINK:

            for (index = 0; index < state.stock.drinks.length; index++) {

                if (action.drink === state.stock.drinks[index].name) {
                    break;
                }
            }

            if (index <= state.stock.drinks.length && state.stock.drinks[index].quantity > 0) {

                let drinks = state.stock.drinks;
                let drink = {
                    ...drinks[index]
                };

                if (--drink.quantity > 0) {
                    drinks[index] = drink;
                } else {
                    drinks.splice(index, 1);
                }

                return {
                    ...state,
                    stock: {
                        ...state.stock,
                        drinks: drinks
                    },
                    cash: state.cash + drink.price
                }
            }

            return state;
        case ACTIONS.BUY_INGREDIENT:

            state.stock.ingredients.forEach((stockIngredient, i) => {
                if (stockIngredient.name == action.ingredient) {
                    ingredient = stockIngredient;
                    index = i;
                    return;
                }
            });
            let cash = state.cash;

            if (!ingredient) {
                ingredient = IngredientFactory(action.ingredient, 0);
                ingredients.push(ingredient);
            }

            if (cash < ingredient.price) {
                console.error("You don't have enought money to buy " + ingredient.name + "s");
                return state;
            }

            ingredient.quantity++;
            ingredients[index] = ingredient;
            cash -= ingredient.price;


            return {
                ...state,
                stock: {
                        ...state.stock,
                        ingredients: ingredients
                    },
                    cash: state.cash - ingredient.price
            };
        case ACTIONS.MAKE_DRINK:

            let drink;
            let drinks = state.stock.drinks;
            ingredients = state.stock.ingredients;

            for (let stockDrink in DRINKS) {
                if (DRINKS[stockDrink].name === action.drink) {
                    drink = DRINKS[stockDrink];
                }
            }

            index = -1;
            for (let i = 0; i < drinks.length; i++) {
                if (drinks[i].name === action.drink) {
                    index = i;
                    break;
                }
            }

            let canMakeDrink = drink.canMake(drink, state.stock.ingredients);

            if (canMakeDrink.response === false) {
                console.error(canMakeDrink.reason);
                return state;
            }

            if (index === -1) {
                drink.quantity = 0;
                drinks.push(drink);
                index = drinks.indexOf(drink);
            }

            drinks.forEach(stockDrink => {
                if (stockDrink.name == action.drink) {
                    stockDrink.make(stockDrink, ingredients);
                    return;
                }
            })

            return {
                ...state,
                stock: {
                    ...state.stock,
                    drinks: drinks,
                    ingredients: ingredients
                }
            }
        case ACTIONS.CHANGE_PICTURE:
            return {
                ...state,
                picture: action.url
            }
    }

    return state;
}