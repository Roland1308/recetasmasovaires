import {
    SET_LANGUAGE,
    SET_RECIPES,
    SET_USER,
    UPDATE_USER,
    EMAIL_SET,
    RECIPE_ADD,
    RECIPE_EDIT,
    RECIPE_RESET,
    INGREDIENT_ADD,
    INGREDIENT_REMOVE,
    SET_NR_OF_INGS,
    RECIPE_PUSH,
    RECIPE_DELETE,
    SET_LOADING,
    RECIPE_LIST,
    INGREDIENTS_EDIT_LIST,
    LOG_OUT,
    ADD_LIKE,
    REMOVE_LIKE,
    ADD_FAV,
    REMOVE_FAV,
    SET_PAGE,
    SET_LONGLIST,
    SET_FILTERFAV
} from '../actions/mainActions';


const initialState = {
    user: { email: "" },
    recipes: [],
    nrOfRecipes: 0,
    language: undefined,
    recipeAction: undefined,
    editRecipe: {
        editIngredients: []
    },
    nrOfIngredients: 0,
    isLoading: false,
    isLogged: false,
    renderToggle: 0,
    page: "home",
    isLongList: true,
    filterFav: false
};

export default function mainReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LONGLIST:
            return {
                ...state,
                isLongList: !state.isLongList
            }
        case SET_FILTERFAV:
            return {
                ...state,
                filterFav: !state.filterFav,
                renderToggle: !state.renderToggle
            }
        case SET_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case SET_LANGUAGE:
            return {
                ...state,
                language: action.payload
            }
        case SET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                nrOfRecipes: action.payload.length
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                isLogged: true
            }
        case UPDATE_USER:
            let userCopyForUpdate = state.user
            userCopyForUpdate.avatarimg = action.payload
            return {
                ...state,
                user: userCopyForUpdate
            }
        case EMAIL_SET:
            let userCopyForEmail = state.user
            userCopyForEmail.email = action.payload
            return {
                ...state,
                user: userCopyForEmail
            }
        case LOG_OUT:
            return {
                user: { email: "" },
                recipes: [],
                nrOfRecipes: 0,
                language: undefined,
                recipeAction: undefined,
                editRecipe: {
                    editIngredients: []
                },
                nrOfIngredients: 0,
                isLoading: false,
                isLogged: false,
                renderToggle: 0,
                page: "home",
                isLongList: true,
                filterFav: false
            }
        case RECIPE_ADD:
            return {
                ...state,
                recipeAction: "add"
            };
        case RECIPE_EDIT:
            const edit = {
                editIngredients: action.payload.ingredients,
                pictures: action.payload.pictures,
                _id: action.payload._id,
                name: action.payload.name,
                chef: action.payload.chef,
                type: action.payload.type,
                pax: action.payload.pax,
                preparation: action.payload.preparation,
                avatarimg: action.payload.avatarimg,
                chefid: action.payload.chefid
            }
            return {
                ...state,
                recipeAction: "edit",
                editRecipe: edit
            }
        case RECIPE_RESET:
            return {
                ...state,
                recipeAction: "add",
                editRecipe: {
                    editIngredients: []
                },
                nrOfIngredients: 0
            }
        case RECIPE_PUSH:
            let copyRecipes = state.recipes
            copyRecipes.push(action.payload)
            return {
                ...state,
                recipes: copyRecipes,
                nrOfRecipes: state.nrOfRecipes + 1
            }
        case RECIPE_DELETE:
            let copyRecipeDeleted = state.recipes
            const index = copyRecipeDeleted.findIndex(x => x._id === action.payload)
            copyRecipeDeleted.splice(index, 1)
            return {
                ...state,
                recipes: copyRecipeDeleted,
                nrOfRecipes: state.nrOfRecipes - 1
            }
        case RECIPE_LIST:
            return {
                ...state,
                recipeAction: "list"
            }
        case INGREDIENTS_EDIT_LIST:
            let copyRecipe = state.editRecipe
            copyRecipe.editIngredients = action.payload
            return {
                ...state,
                editRecipe: copyRecipe,
            }
        case INGREDIENT_ADD:
            let copyRecipeForAdd = state.editRecipe
            copyRecipeForAdd.editIngredients = [
                ...copyRecipeForAdd.editIngredients,
                action.payload
            ]
            return {
                ...state,
                editRecipe: copyRecipeForAdd,
                nrOfIngredients: state.nrOfIngredients + 1
            }
        case INGREDIENT_REMOVE:
            let copyRecipeForDel = state.editRecipe
            copyRecipeForDel.editIngredients.slice(action.payload, 1)
            return {
                ...state,
                editRecipe: copyRecipeForDel,
                nrOfIngredients: state.nrOfIngredients - 1
            }
        case SET_NR_OF_INGS:
            return {
                ...state,
                nrOfIngredients: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case ADD_LIKE:
            let copyRecipeForAddLike = state.recipes
            const indexAddLike = copyRecipeForAddLike.findIndex(recipe => recipe._id === action.payload._id)
            copyRecipeForAddLike[indexAddLike].likes.push(action.payload.chefId)
            return {
                ...state,
                recipes: copyRecipeForAddLike,
                renderToggle: state.renderToggle + 1
            }
        case REMOVE_LIKE:
            let copyRecipeForRemoveLike = state.recipes
            const indexRemoveLike = copyRecipeForRemoveLike.findIndex(recipe => recipe._id === action.payload._id)
            copyRecipeForRemoveLike[indexRemoveLike].likes = copyRecipeForRemoveLike[indexRemoveLike].likes.filter(userLiked => userLiked !== action.payload.chefId)
            return {
                ...state,
                recipes: copyRecipeForRemoveLike,
                renderToggle: state.renderToggle - 1
            }
        case ADD_FAV:
            let copyUserForAddFav = state.user
            copyUserForAddFav.favorites.push(action.payload)
            return {
                ...state,
                user: copyUserForAddFav,
                renderToggle: state.renderToggle + 1
            }
        case REMOVE_FAV:
            let copyUserForRemoveFav = state.user
            copyUserForRemoveFav.favorites = copyUserForRemoveFav.favorites.filter(userFaved => userFaved !== action.payload)
            return {
                ...state,
                user: copyUserForRemoveFav,
                renderToggle: state.renderToggle - 1
            }
        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}
