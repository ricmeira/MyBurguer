import React, { useState, useEffect } from 'react';
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

const BurguerBuilder = ({
    onInitIngredients, isAuth, onSetAuthRedirectPath, history,
    onInitPurchase, ings, error, price, onIngredientAdded, onIngredientRemoved
}) => {
    const [ purchasing, setIsPurchasing ] = useState(false);

    useEffect(() => {
        onInitIngredients();
    }, [ onInitIngredients ]);

    const updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if(isAuth) {
            setIsPurchasing(true);
        }
        else {
            onSetAuthRedirectPath('/checkout');
            history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setIsPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        history.push('/checkout');
    }

    const disabledInfo = {
        ...ings
    };
    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <=0;
    }

    let orderSummary = null;

    let burguer = error ? <p>Ingredients can not be loaded</p> : <Spinner />;

    if(ings) {
        burguer = (
            <Auxiliary>
                <Burguer ingredients={ings}></Burguer>
                <BuildControls
                    price={price}
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    purchaseable={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    disabled={disabledInfo}
                    isAuth={isAuth}
                />
            </Auxiliary>
        );

        orderSummary = 
            <OrderSummary 
                purchaseCancelled={purchaseCancelHandler}
                price={price}
                purchaseContinued={purchaseContinueHandler}
                ingredients={ings}
            />
    }

    return (
        <Auxiliary>
            <Modal 
                show={purchasing}
                modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burguer}
        </Auxiliary>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burguerBuilder.ingredients,
        price: state.burguerBuilder.totalPrice,
        error: state.burguerBuilder.error,
        isAuth: state.auth.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingredient => dispatch(actions.addIngredient(ingredient)),
        onIngredientRemoved: ingredient => dispatch(actions.removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));