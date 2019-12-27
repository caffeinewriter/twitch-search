import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import './App.css';
import { searchStreams } from './services/twitch';
import SearchPage from './components/SearchPage';

class App extends React.Component {
  state = {
    streams: [],
    total: 0,
  };

  defaultTerms = [
    'drunk',
    'fail',
    'overwatch',
    'league',
    'drops',
    'csgo',
    'charity',
    'public',
  ];

  async componentDidMount() {
    const { streams, _total: total } = await searchStreams('public');
    // let streams = chunk(results, DISPLAY_COLUMNS);
    this.setState({
      streams,
      total,
    });
  }

  render() {
    const { streams, total } = this.state;
    return (
      <Router>
        <CssBaseline />
        <Switch>
          <Route exact path='/' component={SearchPage}></Route>
          <Route path='/search/:term(/:page)' component={SearchPage}></Route>
        </Switch>
        {/* <Grid container spacing={3} justify='space-evenly'>
          {streams.map((v, i) => (
            <Grid item md={3} sm={6} xs={12} key={i}>
              <StreamPreview stream={v} />
            </Grid>
          ))}
        </Grid> */}
      </Router>
    );
  }
}

export default App;
