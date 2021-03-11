export default class Ingredient {

    constructor(name, price, quantity = 1){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

}

export const INGREDIENTS = {
    lemon: new Ingredient('Lemon', 0.1, 0),
    apple: new Ingredient('Apple', 0.5, 0)
}

export function IngredientFactory(ingredient, quantity){
    
    let item;
    try{
        item = INGREDIENTS[ingredient.toLowerCase()];
    } catch{
        console.error("There is no item called " + item + " in ingredient list");
        return;
    }

    item.quantity = quantity;
    
    return Object.assign({},item);// clone object so that functions can modify it's own properties
}