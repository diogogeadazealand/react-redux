export const ACTIONS = {
    SELL_DRINK: "SELL_DRINK",
    BUY_INGREDIENT: "BUY_INGREDIENT",
    MAKE_DRINK: "MAKE_DRINK",
    CHANGE_PICTURE: "CHANGE_PICTURE",
    GET_PICTURE: "GET_PICTURE"
}

export const actions = {
    sellDrink: (drink) => ({type: ACTIONS.SELL_DRINK, drink: drink}),
    buyIngredient: (ingredient) => ({type: ACTIONS.BUY_INGREDIENT, ingredient: ingredient}),
    makeDrink: (drink) => ({type: ACTIONS.MAKE_DRINK, drink: drink}),
    getPicture: () => ({type: ACTIONS.GET_PICTURE})
}
