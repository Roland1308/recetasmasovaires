// Action types
export const SET_LANGUAGE = "SET_LANGUAGE"
export const SET_RECIPES = "SET_RECIPES"

export const SET_USER = "SET_USER"

export const RECIPE_ADD = "RECIPE_ADD";
export const RECIPE_EDIT = "RECIPE_EDIT";
export const RECIPE_RESET = "RECIPE_RESET";

export const INGREDIENT_ADD = "INGREDIENT_ADD";
export const INGREDIENT_REMOVE = "INGREDIENT_REMOVE";
export const SET_NR_OF_INGS = "SET_NR_OF_INGS"

export const setLanguage = (payload) => ({
    type: SET_LANGUAGE,
    payload
})
export const setRecipes = (recipes) => ({
    type: SET_RECIPES,
    payload: recipes
})
export const setUser = (user) => ({
    type: SET_USER,
    payload: user
})
export const recipeAdd = () => ({
    type: RECIPE_ADD,
});
export const recipeEdit = (recipe) => ({
    type: RECIPE_EDIT,
    payload: recipe
})
export const recipeReset = () => ({
    type: RECIPE_RESET
})

export const ingredientAdd = (ingAdd) => ({
    type: INGREDIENT_ADD,
    payload: ingAdd
})

export const ingredientRemove = (ingDel) => ({
    type: INGREDIENT_REMOVE,
    payload: ingDel
})

export const setNrOfIngs = (nrOfIngs) => ({
    type: SET_NR_OF_INGS,
    payload: nrOfIngs
})
