import React from 'react';

import Footer from './components/Footer';
import Header from './components/Header';


const PageWrapper: React.FC = ({
  children
}) => (
    <>
      <Header />
      {children}
      <Footer />
    </>
);

export default PageWrapper;
