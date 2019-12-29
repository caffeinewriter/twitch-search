import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import { searchStreams } from './services/twitch';
import SearchPage from './components/SearchPage';

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
        <Switch>
          <Route exact path='/' component={SearchPage} live={true}></Route>
          <Route
            path='/search/live/:term'
            component={SearchPage}
            live={true}
          ></Route>
          <Route
            path='/search/:term'
            component={SearchPage}
            live={false}
          ></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
