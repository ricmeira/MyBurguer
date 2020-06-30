import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = ({ history, ings, purchased, match }) => {

    const checkoutCancelledHandler = () => {
        history.goBack();
    }

    const checkoutContinuedHandler = () => {
        history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to="/"/>
    
    if (ings) {
        const purchasedRedirect = purchased ? <Redirect to="/"/> : null;
        summary = (
            <div>
                {purchasedRedirect}       
                <CheckoutSummary 
                    onCheckoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                    ingredients={ings}
                />
                <Route 
                    path={match.path + '/contact-data'} 
                    component={ContactData}
                />
            </div>
        )
    }
    return summary;
}

const mapStateToProps = state => {
    return {
        ings: state.burguerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);