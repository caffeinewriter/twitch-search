import type {
  GetServerSideProps,
  GetStaticProps,
  NextPage,
  NextPageContext,
} from 'next';
import { useRouter } from 'next/router';
import SearchPage from '../../components/SearchPage';
import { searchChannels } from '../../helpers/api';
import { getDefaultSearchTerm } from '../../helpers/defaultSearch';
import logger from '../../helpers/logger';
import { TwitchSearchResult } from '../../types/twitch';

const Search: NextPage<{ results: TwitchSearchResult[] }> = ({
  results,
}) => {
  const router = useRouter();
  const { term } = router.query;

  return <SearchPage term={term} results={results} />;
};

export const getServerSideProps: GetServerSideProps<{ results: TwitchSearchResult[] }> = async (context) => {
  if (!context.params) return {
    props: {
      results: [],
    }
  };
  const term =
    (Array.isArray(context.params.term)
      ? context.params.term.join(' ')
      : context.params.term);
  logger.debug(`Searching for ${term}`);
  const { data: results } = await searchChannels({ query: term ?? '', live: true });

  return {
    props: {
      results,
    },
  };
};

export default Search;
