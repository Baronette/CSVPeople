import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Generate from './pages/Generate';
import Home from './pages/Home';
import Upload from './pages/Upload';


export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/generate' component={Generate} />
        <Route exact path='/upload' component={Upload} />
      </Layout>
    );
  }
}
