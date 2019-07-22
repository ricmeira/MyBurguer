import React, { Component } from 'react';

import Burguer from '../../components/Burguer/Burger'
import Auxiliary from '../../hoc/Auxiliary'

class BurguerBuilder extends Component{
    render () {
        return (
            <Auxiliary>
                <Burguer></Burguer>
                <div>Build Controls</div>
            </Auxiliary>
        );
    }
}

export default BurguerBuilder;