import React from 'react';
import Layout from './core/Layout';
import { Helmet } from 'react-helmet';

const App = () => {
    const head = () => (
        <Helmet>
            <meta charSet="utf-8" />
            <title>MERN Stack</title>
            <link rel="canonical" href="https://mern-stack.com" />
        </Helmet>
    );
    return (
        <Layout>
            {head()}
            <div className="col-md-6 offset-md-3 text-center">
                <h1 className="p-5">Complete User Authentication System using React and Node</h1>
                <h2>MERN STACK</h2>
                <hr />
                <p className="lead">
                    MERN stack login register system with account activation, forgot password, reset password, login
                    with google as well as private and protected routes for authenticated user and users
                    with the role of admin.
                </p>
                <h4 className="p2">Deployment</h4>
                <p className="lead">Profile update & deployed to digital ocean cloud servers</p>
            </div>
        </Layout>
    );
};

export default App;