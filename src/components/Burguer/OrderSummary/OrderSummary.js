import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = ({ ingredients, price, purchaseCancelled, purchaseContinued }) => {
    const ingredientSummary = Object.keys(ingredients)
    .map((igKey) => {
        return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {ingredients[igKey]}
            </li>
        );
    });

    return (
    <Auxiliary>
        <h3>Your Order</h3>
        <p>A delicious burguer with the following ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p><strong>Total Price: {price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={purchaseContinued}>CONTINUE</Button>
    </Auxiliary>
    );
}

export default OrderSummary;