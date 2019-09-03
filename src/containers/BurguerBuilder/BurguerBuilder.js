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
import * as actions from '../../store/actions/index';

class BurguerBuilder extends Component{
    /*constructor(props) {
        super(props);
        this.state = {...};
    }*/

    state = {
        purchasing: false
    }

    componentDidMount () {
        this.props.onInitIngredients();
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
        this.props.onInitPurchase();
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

        let burguer = this.props.error ? <p>Ingredients can not be loaded</p> : <Spinner />;

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
        ings: state.burguerBuilder.ingredients,
        price: state.burguerBuilder.totalPrice,
        error: state.burguerBuilder.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredient) => dispatch(actions.addIngredient(ingredient)),
        onIngredientRemoved: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));