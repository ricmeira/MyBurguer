import React, { Component } from 'react';

import Burguer from '../../components/Burguer/Burger';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Auxiliary from '../../hoc/Auxiliary';

class BurguerBuilder extends Component{
    /*constructor(props) {
        super(props);
        this.state = {...};
    }*/

    state = {
        ingredients: {
            salad: 0,
            bacon: 2,
            chesse: 0,
            meat: 0
        }
    }

    render () {
        return (
            <Auxiliary>
                <Burguer ingredients={this.state.ingredients}></Burguer>
                <BuildControls />
            </Auxiliary>
        );
    }
}

export default BurguerBuilder;