import React from 'react';
import Page from '../common/Page';
import Dashboard from './Dashboard';
import Navbar from '../navbar/Navbar';

const Wrapper = () => {
  return (
    <>
      <Navbar />
      <div>
        <Page>
          <Dashboard />
        </Page>
      </div>
    </>
  );
};

export default Wrapper;
