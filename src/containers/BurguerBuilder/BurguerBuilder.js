import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    history
}) => {
    const [ purchasing, setIsPurchasing ] = useState(false);

    const dispatch = useDispatch();

    const ings = useSelector( state =>  state.burguerBuilder.ingredients );
    const price = useSelector( state => state.burguerBuilder.totalPrice );
    const error = useSelector( state => state.burguerBuilder.error );
    const isAuth = useSelector( state => state.auth.token !== null );

    const onIngredientAdded = ingredient => dispatch(actions.addIngredient(ingredient));
    const onIngredientRemoved = ingredient => dispatch(actions.removeIngredient(ingredient));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [ dispatch ]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = path => dispatch(actions.setAuthRedirectPath(path));

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

export default (withErrorHandler(BurguerBuilder, axios));