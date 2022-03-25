import React from 'react';
import { Layout } from '../component';
import { getUsername } from '../services/user.service'
const NoMatch = () => (
    <Layout className="app-404" isHeader={true} username={getUsername()}>
        <h1>Page not found  404</h1>
    </Layout>
)

export default NoMatch
