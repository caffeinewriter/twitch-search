import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Footer from './components/Footer';
import Header from './components/Header';
import SearchPage from './components/SearchPage';

import { init as initInsights } from './services/insights';

import './App.css';

class App extends React.Component {
  async componentDidMount() {
    initInsights();
  }

  render() {
    return (
      <Router>
        <CssBaseline />
        <Header />
        <Switch>
          <Route exact path='/' component={SearchPage} live={true}></Route>
          <Route path='/search/:term' component={SearchPage} live={true} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
