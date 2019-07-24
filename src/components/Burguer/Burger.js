import React from 'react';

import classes from './Burguer.module.css';
import BurguerIngredient from './BurguerIngredient/BurguerIngredient';

const burguer = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map((igKey) => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurguerIngredient key={igKey + i} type={igKey}/>
            });
        });

    return (
       <div className={classes.Burguer}>
            <BurguerIngredient type="bread-top"></BurguerIngredient>
            {transformedIngredients}
            <BurguerIngredient type="bread-bottom"></BurguerIngredient>
       </div> 
    );
};

export default burguer;