import React, { Component } from 'react';

import Burguer from '../../components/Burguer/Burger'
import Auxiliary from '../../hoc/Auxiliary'

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
                <div>Build Controls</div>
            </Auxiliary>
        );
    }
}

export default BurguerBuilder;