import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { searchStreams, TwitchStream } from '../services/twitch';
import StreamPreview from './StreamPreview';

interface SearchPageState {
  streams: TwitchStream[];
}

interface SearchRouteProps {
  term: string | null | undefined;
}

class SearchPage extends React.Component<
  RouteComponentProps<SearchRouteProps>,
  SearchPageState
> {
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
    let term: string = this.props.match.params.term;
    const page: number = this.props.match.params.page;

    if (!term)
      term = this.defaultTerms[
        Math.floor(Math.random() * this.defaultTerms.length)
      ];

    const { streams } = await searchStreams(term);
    // let streams = chunk(results, DISPLAY_COLUMNS);
    this.setState({
      streams,
    });
  }

  render() {
    if (!this.state) {
      return <div>Searching...</div>;
    }
    const { streams } = this.state;
    return (
      <>
        <Grid container spacing={3} justify='space-evenly'>
          {streams.map((v, i) => (
            <Grid item md={3} sm={6} xs={12} key={i}>
              <StreamPreview stream={v} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
}

export default SearchPage;
