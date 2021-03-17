import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';

import { Search } from '@material-ui/icons';

const HeaderContainer = styled(Box)({
  height: '44px',
  margin: '0 10px',
  display: 'flex',
  '@media (max-width: 500px)': {
    height: '94px',
    flexWrap: 'wrap',
  },
});

const Logo = styled(Box)({
  height: '44px',
  fontFamily: '"Titan One", sans-serif',
  fontSize: '34px',
  lineHeight: '44px',
  padding: '0 1rem',
  flex: 'initial',
  '@media (max-width: 500px)': {
    fontSize: '24px',
  },
});

const SearchContainer = styled(Box)({
  flex: 'auto',
  display: 'flex',
  margin: '0 10px',
  padding: '0 1rem',
});

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

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const history = useHistory();

  const handleSearch = () => {
    if (searchTerm.length < 1) return;
    history.push(`/search/${searchTerm}`);
  };

  const _handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const _handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <HeaderContainer>
      <Logo>SearchTwitch</Logo>
      <SearchContainer>
        <SearchBox
          id='search-box'
          label='Search...'
          onChange={_handleChange}
          onKeyDown={_handleKeyDown}
        />
        <SearchButton onClick={handleSearch}>
          <Search />
          <Hidden lgDown> Search</Hidden>
        </SearchButton>
      </SearchContainer>
    </HeaderContainer>
  );
};

export default Header;
