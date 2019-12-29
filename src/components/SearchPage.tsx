import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import { searchStreams, TwitchStream } from '../services/twitch';
import { RESULTS_PER_PAGE } from '../constants';
import StreamPreview from './StreamPreview';

interface SearchPageState {
  loading: boolean;
  page: number;
  streams: TwitchStream[];
  term: string;
  total: number;
}

interface SearchRouteProps {
  term: string | undefined;
}

interface SearchPageProps extends RouteComponentProps<SearchRouteProps> {
  live: boolean;
}

const PageContainer = styled(Box)({
  margin: '0px 36px',
});

const PaginationContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '24px 36px',
});

const PaginationButton = styled(Button)({
  color: 'white',
  '&:disabled': {
    color: '#ccc',
  },
});

class SearchPage extends React.Component<SearchPageProps, SearchPageState> {
  defaultTerms = [
    'drunk',
    'fail',
    'overwatch',
    'league',
    'drops',
    'csgo',
    'charity',
    'public',
    'apex',
  ];

  async componentDidMount() {
    let term: string =
      this.props.match.params.term ||
      this.defaultTerms[Math.floor(Math.random() * this.defaultTerms.length)];

    const { streams, _total: total } = await searchStreams(term);
    // let streams = chunk(results, DISPLAY_COLUMNS);
    this.setState({
      streams,
      term,
      page: 0,
      loading: false,
      total,
    });
  }

  async nextPage(): Promise<void> {
    this.setState(
      ({ page }) => ({
        page: page + 1,
        loading: true,
      }),
      async () => {
        const { page, term } = this.state;
        const { streams, _total: total } = await searchStreams(
          term,
          undefined,
          page
        );
        this.setState({
          streams,
          total,
          loading: false,
        });
      }
    );
  }

  async prevPage(): Promise<void> {
    this.setState(
      ({ page }) => ({
        page: page - 1,
        loading: true,
      }),
      async () => {
        const { page, term } = this.state;
        const { streams, _total: total } = await searchStreams(
          term,
          undefined,
          page
        );
        this.setState({
          streams,
          total,
          loading: false,
        });
      }
    );
  }

  render() {
    if (!this.state || this.state.loading) {
      return <div>Searching...</div>;
    }
    const { page, streams, term, total } = this.state;
    return (
      <PageContainer>
        <>
          <Typography variant='h4'>Results for {term}</Typography>
          <Typography variant='subtitle1'>
            Showing {page * RESULTS_PER_PAGE + 1}-
            {Math.min((page + 1) * RESULTS_PER_PAGE, total)} of {total} results
          </Typography>
        </>
        <Grid container spacing={3} justify='space-evenly'>
          {streams.map((v, i) => (
            <Grid item md={3} sm={6} xs={12} key={i}>
              <StreamPreview stream={v} />
            </Grid>
          ))}
        </Grid>
        <PaginationContainer>
          <PaginationButton
            onClick={() => this.prevPage()}
            disabled={page === 0}
          >
            <NavigateBefore /> Previous
          </PaginationButton>
          <PaginationButton
            onClick={() => this.nextPage()}
            disabled={(page + 1) * RESULTS_PER_PAGE > total}
          >
            Next <NavigateNext />
          </PaginationButton>
        </PaginationContainer>
      </PageContainer>
    );
  }
}

export default SearchPage;
