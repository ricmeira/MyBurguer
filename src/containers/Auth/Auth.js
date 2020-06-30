import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import classes from './Auth.module.css';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = ({
    building, authRedirectPath, onSetAuthRedirectPath, onAuth, loading, error, isAuth
}) => {
    const [ controls, setControls ] = useState({
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        });
    const [ isSignup, setIsSignup ] = useState(true);

    useEffect(() => {
        if (!building && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [ building, authRedirectPath, onSetAuthRedirectPath ]);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            }), 
        });
        
        setControls(updatedControls);
    }

    const submitHandler = event => {
        event.preventDefault();
        onAuth(controls.email.value, controls.password.value, isSignup);
    }

    const switchAuthModeHandler = () => {
        setIsSignup(prevState => !prevState);
    }

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        });
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)}
        />
    ));

    if(loading) {
        form = <Spinner />;
    }

    let errorMessage = null;
    if(error) {
        errorMessage = (
            <p>{error.message}</p>
        );
    }

    let authRedirect = null;
    if(isAuth) {
        authRedirect = (
            <Redirect to={authRedirectPath} />
        );
    }

    return (
        <div className={classes.Auth}>
            {errorMessage}
            {authRedirect}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button >
            </form>
            <Button clicked={switchAuthModeHandler} btnType="Danger">SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button >
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        building: state.burguerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);