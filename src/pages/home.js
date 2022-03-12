import React from 'react';
import { Layout } from '../component';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Home = () => (
  <Layout className="app-home" isHeader={true}>
    <h1>Welcome to Home</h1>
    <Link to="/page-1" >Page_One</Link>
  </Layout>
)

export default Home
