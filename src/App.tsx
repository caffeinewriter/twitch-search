import React, { PropsWithChildren } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Footer from './components/Footer';
import Header from './components/Header';

import AboutPage from './pages/About';
import SearchPage from './pages/Search';

import { init as initInsights } from './services/insights';

import './App.css';

class App extends React.Component<{}, {}> {
  async componentDidMount() {
    initInsights();
  }

  render() {
    return (
      <Router>
        <CssBaseline />
        <Header />
        <Switch>
          <Route exact path='/' component={(props: PropsWithChildren<{}> ) => (
            <SearchPage {...props} live={true} />
          )} />
          <Route path='/search/:term' component={(props: PropsWithChildren<{}> ) => (
            <SearchPage {...props} live={true} />
          )} />
          <Route path='/about' component={AboutPage} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
