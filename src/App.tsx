import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { searchStreams } from './services/twitch';

import Footer from './components/Footer';
import Header from './components/Header';
import SearchPage from './components/SearchPage';
import './App.css';

class App extends React.Component {
  state = {
    streams: [],
    total: 0,
  };

  async componentDidMount() {
    const { streams, _total: total } = await searchStreams('public');
    // let streams = chunk(results, DISPLAY_COLUMNS);
    this.setState({
      streams,
      total,
    });
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
