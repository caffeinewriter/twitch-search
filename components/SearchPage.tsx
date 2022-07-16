import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SearchCard from './StreamCard';
import { TwitchSearchResult } from '../types/twitch';

const SearchPage: React.FC<{
  term?: string | string[];
  results?: TwitchSearchResult[];
}> = ({ term, results = [] }) => {
  console.log(term);
  const searchTerm = Array.isArray(term) ? term.join(' ') : term;
  return (
    <Box>
      Searching for {searchTerm}...
      <Grid container spacing={2} style={{
        padding: '20px',
      }}>
        {results.map(v => (
          <SearchCard data={v} key={v.id} />
        ))}
      </Grid>
    </Box>
  );
};

export default SearchPage;
