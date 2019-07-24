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
            salad: 1,
            bacon: 1,
            chesse: 2,
            meat: 2
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