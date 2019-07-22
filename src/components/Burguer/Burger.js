import React from 'react';

import classes from './Burguer.module.css';
import BurguerIngredient from './BurguerIngredient/BurguerIngredient';

const burguer = (props) => {
    return (
       <div className={classes.Burguer}>
            <BurguerIngredient type="bread-top"></BurguerIngredient>
            <BurguerIngredient type="cheese"></BurguerIngredient>
            <BurguerIngredient type="meat"></BurguerIngredient>
            <BurguerIngredient type="bread-bottom"></BurguerIngredient>
       </div> 
    );
};

export default burguer;