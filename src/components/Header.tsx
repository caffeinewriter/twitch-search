import React, { useState } from 'react';

import {
  Link,
  useHistory,
} from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';

import {
  // FiberManualRecord,
  Search as SearchIcon,
  // Videocam as VideocamIcon
} from '@material-ui/icons';

const HeaderContainer = styled(Box)({
  height: '44px',
  margin: '0 10px 15px',
  display: 'flex',
  // '@media (max-width: 619px)': {
  '@media (max-width: 555px)': {
    height: '94px',
    flexWrap: 'wrap',
  },
});

const Logo = styled(Link)({
  color: '#fff',
  height: '44px',
  fontFamily: '"Titan One", sans-serif',
  fontSize: '34px',
  lineHeight: '44px',
  padding: '0 1rem',
  flex: 'initial',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'none',
  },
  // '@media (max-width: 619px)': {
  '@media (max-width: 555px)': {
    fontSize: '24px',
  },
});

// const Record = styled(FiberManualRecord)({
//   animationDirection: 'alternate',
//   animationDuration: '2s',
//   animationIterationCount: 'infinite',
//   animationName: 'red-pulse',
//   animationTimingFunction: 'ease-in-out',
//   marginRight: '8px',
//   '@media (max-width: 1279px)': {
//     marginRight: '0px',
//   },
// });

// const Videocam = styled(VideocamIcon)({
//   marginRight: '8px',
//   '@media (max-width: 1279px)': {
//     marginRight: '0px',
//   },
// });

const Search = styled(SearchIcon)({
  marginRight: '8px',
  '@media (max-width: 1279px)': {
    marginRight: '0px',
  },
});

const SearchContainer = styled(Box)({
  flex: 'auto',
  display: 'flex',
  margin: '0 5px',
  padding: '0 1rem',
});

const AlertContainer = styled(Box)({
  padding: '0.5rem',
  backgroundColor: '#F9A825',
  fontSize: '1rem'
})

const SearchBox = styled(TextField)({
  flex: 'auto',
  '& input, & .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'white',
  },
  '& .MuiInput-underline:hover::after': {
    borderBottomColor: 'white',
  },
  '& .MuiInput-underline:hover::before': {
    borderBottomColor: 'white',
  },
});

const SearchButton = styled(Button)({
  color: 'white',
  '&:hover': {
    color: '#2D2D39',
    backgroundColor: 'white',
  },
});

// const LiveToggleButton = styled(Button)({
//   color: 'white',
//   '&:hover': {
//     color: '#2D2D39',
//     backgroundColor: 'white',
//   }
// })

const Header: React.FC = () => {
  // const searchAllRegexp = /^\/search\/[^/]+\/all$/gi;
  const history = useHistory();
  // const location = useLocation();
  // const [searchLive, setSearchLive] = useState<boolean>(!searchAllRegexp.test(location.pathname));
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = () => {
    if (searchTerm.length < 1) return;
    // if (searchLive)
    history.push(`/search/${searchTerm}`);
    // else
    //   history.push(`/search/${searchTerm}/all`);
  };

  // const toggleLive = () => {
  //   setSearchLive(!searchLive);
  // }

  const _handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const _handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <AlertContainer>
        We're currently experiencing issues with the results returned from the Twitch API. You can follow the status of this issue <a href='https://github.com/caffeinewriter/twitch-search/issues/17'>here</a>.
      </AlertContainer>
      <HeaderContainer>
        <Logo to="/">SearchStream</Logo>
        <SearchContainer>
          <SearchBox
            id='search-box'
            label='Search...'
            onChange={_handleChange}
            onKeyDown={_handleKeyDown}
            aria-label='Search Box'
          />
          {/*<LiveToggleButton onClick={toggleLive}>
            {searchLive ? (
              <>
                <Record />
                <Hidden mdDown> Live Channels</Hidden>
              </>
            ) : (
              <>
                <Videocam />
                <Hidden mdDown> All Channels</Hidden>
              </>
            )}
          </LiveToggleButton>*/}
          <SearchButton
            onClick={handleSearch}
            aria-label="Search Button"
          >
            <Search />
            <Hidden mdDown> Search</Hidden>
          </SearchButton>
        </SearchContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;
