import React from 'react';
// import _ from 'lodash';
import SectionMint from '../components/SectionMint';
import { ReactElement } from 'react';
import Layout from '../components/layout/Layout';
import SectionFAQ from '../components/SectionFAQ';

export default function Page(): JSX.Element {
  return (
    <div>
      <SectionMint />
      <SectionFAQ />
    </div>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
