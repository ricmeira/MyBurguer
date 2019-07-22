import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary'

class BurguerBuilder extends Component{
    render () {
        return (
            <Auxiliary>
                <div>Burguer</div>
                <div>Build Controls</div>
            </Auxiliary>
        );
    }
}

export default BurguerBuilder;