import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Burguer from '../../components/Burguer/Burger';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burguerBuilderActions from '../../store/actions/index';

class BurguerBuilder extends Component{
    /*constructor(props) {
        super(props);
        this.state = {...};
    }*/

    state = {
        purchasing: false
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {

        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }

        let orderSummary = null;

        let burguer = this.state.error ? <p>Ingredients can not be loaded</p> : <Spinner />;

        if(this.props.ings) {
            burguer = (
                <Auxiliary>
                    <Burguer ingredients={this.props.ings}></Burguer>
                    <BuildControls
                        price={this.props.price}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        disabled={disabledInfo}
                    />
                </Auxiliary>
            );

            orderSummary = 
                <OrderSummary 
                    purchaseCancelled={this.purchaseCancelHandler}
                    price={this.props.price}
                    purchaseContinued={this.purchaseContinueHandler}
                    ingredients={this.props.ings}
                />
        }

        return (
            <Auxiliary>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burguer}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredient) => dispatch(burguerBuilderActions.addIngredient(ingredient)),
        onIngredientRemoved: (ingredient) => dispatch(burguerBuilderActions.removeIngredient(ingredient))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));