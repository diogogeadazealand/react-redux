import { IngredientFactory } from './ingredient';

export default class Drink{

    constructor(name, price, ingredients, quantity = 0){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.ingredients = [];
        
        this.make = (drink, ingredientList) => {

            let compensation = 0;// since ingredientList can have ingredients removed, we need to compensate for that index difference
            let ingredientListCopy = ingredientList;

            for (let i = 0; i < ingredientListCopy.length; i++) {
                
                drink.ingredients.forEach(ingredient => {
                    if(ingredient.name === ingredientList[i-compensation].name){
                        ingredientList[i-compensation].quantity -= ingredient.quantity;

                        if(ingredientList[i-compensation].quantity <= 0){
                            ingredientList.splice(i-compensation, 1);
                            compensation++;
                        }
                    }
                });

            }

            drink.quantity++;
        }
    }

    canMake = (drink, ingredientList) => {

        let missing = [];
        let notEnought = [];
        let accepted = [];
        drink.ingredients.map( (ingredient) => {
        
            ingredientList.map( stockIngredient => {
                if(stockIngredient.name == ingredient.name){
                    debugger;
                    if(stockIngredient.quantity < ingredient.quantity){
                        notEnought.push(ingredient.name);
                        return;
                    } else {
                        accepted.push(ingredient); 
                        return;
                    }
                }
            });

            if(accepted[accepted.length-1] !== ingredient){
                missing.push(ingredient.name);
            }
        });

        if(missing.length > 0){
            return {response: false, reason: "You're missing "+missing.join(', ')+" to make "+this.name};
        } else if (notEnought.length > 0){
            return {response: false, reason: "You don't have enought "+notEnought.join(', ')+" to make "+this.name}
        }
        
        return {response: true};
    }
}

export const DRINKS = {
    lemonade: new Drink('lemonade', 0.25),
    appleJuice: new Drink("Apple Juice", 2.5)
};
DRINKS.lemonade.ingredients = [IngredientFactory("lemon", 2)];
DRINKS.appleJuice.ingredients = [IngredientFactory("apple", 4)];

export function DrinkFactory(drink, quantity){

    let item;
    try{
        item = {...DRINKS[drink]};
    } catch{
        console.error("There is no " + drink + " in drinks");
    }

    item.quantity = quantity;
    return Object.assign({}, item);
}