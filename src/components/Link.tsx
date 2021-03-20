import { Link as RouterLink } from 'react-router-dom';

import Link from '@material-ui/core/Link';
import { styled } from '@material-ui/core/styles';

const StyledLink = styled(Link)({
  color: '#7986cb',
  '&:visited': {
    color: '#ba68c8'
  },
});

export const StyledRouterLink = styled(RouterLink)({
  textDecoration: 'none',
  color: '#7986cb',
  '&:visited': {
    color: '#ba68c8'
  },
  '&:hover': {
    textDecoration: 'underline',
  },
})

export default StyledLink;