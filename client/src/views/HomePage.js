import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Spinner } from 'reactstrap';

import { checkToken, recipeReset, setPage } from "../store/actions/mainActions";
import { connect } from "react-redux";
import RecipeCarousel from '../components/RecipeCarousel';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    componentDidMount() {
        const token = window.localStorage.token;
        const { isLogged } = this.props
        if (token && isLogged === false) {
            this.props.dispatch(checkToken(token));
        }
        this.props.dispatch(setPage("home"))
    }

    isAddRecipe() {
        this.props.dispatch(recipeReset());
        this.props.history.push("/addrecipe");
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div className="spinner">
                    <Spinner color="danger" />
                </div>
            )
        }
        const { language, user, recipes } = this.props
        let result = null
        recipes.sort((a, b) => {
            if (a._id > b._id) {
                result = -1;
            }
            if (a._id > b._id) {
                result = 1;
            }
            return result
        })
        const recipesForCarousel = recipes.slice(0, 4)
        let picsForCarousel = [],
            nameForCarousel = []
        recipesForCarousel.map(recipe => {
            picsForCarousel.push(recipe.pictures[0])
            nameForCarousel.push(recipe.name)
            return picsForCarousel
        })
        return (
            <div>
                <div type="button" className="pumpkin-flat-button" data-toggle="modal" data-target="#exampleModal">
                    {user.book}
                </div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{"Family's recipes"}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {language[8]}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal">Ok</button>
                            </div>
                        </div>
                    </div>
                </div>
                <h3>{language[1]}</h3>
                {/* <h2>{language[2]}</h2> */}
                <hr></hr>
                <Link to="listall" className="linkNoDecoration">
                    <button className="chunky chunkyBlue chunkyW101">
                        {language[3]}
                    </button>
                    <span>{language[4]}</span>
                </Link>
                <hr></hr>
                <div onClick={() => { this.isAddRecipe() }}>
                    <button className="chunky chunkyBlue chunkyW101">
                        {language[5]}
                    </button>
                    <span>{language[6]}</span>
                </div>
                <hr></hr>
                <Link to="chefprofile" className="linkNoDecoration">
                    <button className="chunky chunkyBlue chunkyW101">
                        {language[9]}
                    </button>
                    <span>{language[10]}</span>
                </Link>
                <hr></hr>                {recipesForCarousel.length > 0 &&
                    <h4 className="centerText">{language[7]}</h4>
                }
                <RecipeCarousel picsForCarousel={picsForCarousel} nameForCarousel={nameForCarousel} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    language: state.main.language.homepage,
    user: state.main.user,
    isLoading: state.main.isLoading,
    recipes: state.main.recipes,
});

export default connect(mapStateToProps)(HomePage);
