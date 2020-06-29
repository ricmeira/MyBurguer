import React, { useState } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

const Layout = ({ isAuthenticated, children }) => {
    const [ sideDrawer, setSideDrawer ] = useState(false);

    return (
        <Auxiliary>
            <Toolbar
                drawerToggleClicked={() => setSideDrawer(prevState => !prevState)}
                isAuth={isAuthenticated}
            />
            <SideDrawer
                closed={() => setSideDrawer(false)}
                open={sideDrawer}
                isAuth={isAuthenticated}
            />
            <main className={classes.Content}>
                {children}
            </main>
        </Auxiliary>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(Layout);