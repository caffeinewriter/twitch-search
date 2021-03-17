import React from 'react';

import { RouteComponentProps } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';

import { searchStreams, TwitchStream } from '../services/twitch';
import { track } from '../services/insights';
import { RESULTS_PER_PAGE } from '../constants';
import StreamPreview from './StreamPreview';
import TailSpin from '../assets/TailSpin.svg';

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

const FullPageLoader = styled(Box)({
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: '#2D2D39',
  zIndex: 999,
});

const LoaderImage = styled('img')({
  top: '50%',
  left: '50%',
  position: 'relative',
  transform: 'translate(-50%, -50%)',
});

class SearchPage extends React.Component<SearchPageProps, SearchPageState> {
  defaultTerms = [
    'apex',
    'charity',
    'csgo',
    'drops',
    'gamedev',
    'league',
    'music',
    'overwatch',
    'public',
    'valheim',
    'vtuber',
    'warframe',
  ];

  async fetchInitialStreamData() {
    this.setState({
      loading: true,
    } as SearchPageState);
    let term: string =
      this.props.match.params.term ||
      this.defaultTerms[Math.floor(Math.random() * this.defaultTerms.length)];

    const { streams, _total: total } = await searchStreams(term);
    // let streams = chunk(results, DISPLAY_COLUMNS);
    this.setState(
      {
        streams,
        term,
        page: 0,
        loading: false,
        total,
      },
      () => {
        track({
          id: 'stream-search',
          parameters: {
            searchTerm: term,
          },
        });
      }
    );
  }

  async componentDidMount() {
    await this.fetchInitialStreamData();
  }

  async componentDidUpdate(prevProps: SearchPageProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      await this.fetchInitialStreamData();
    }
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
        this.setState(
          {
            streams,
            total,
            loading: false,
          } as SearchPageState,
          () => window.scrollTo(0, 0)
        );
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
        this.setState(
          {
            streams,
            total,
            loading: false,
          } as SearchPageState,
          () => window.scrollTo(0, 0)
        );
      }
    );
  }

  render() {
    if (!this.state || this.state.loading) {
      return (
        <FullPageLoader>
          <LoaderImage src={TailSpin} alt='loader' />
        </FullPageLoader>
      );
    }
    const { page, streams, term, total } = this.state;
    return (
      <PageContainer>
        <>
          <Typography variant='h5'>Results for {term}</Typography>
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
