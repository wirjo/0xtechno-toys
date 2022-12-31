import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import _ from 'lodash';
// import { useState } from 'react';
// import Image from 'next/image';
import { nftDescription } from '../conf/content';

const Section = (): JSX.Element => {
  return (
    <>
      <section
        id="section-about"
        className="border-t-8 border-b-8 border-black text-white"
        style={{ backgroundColor: '#1D90F3' }}
      >
        <div className="container max-w-screen-lg mx-auto text-center py-20 px-5">
          <div className="mb-3 text-3xl font-bold uppercase">
            <b>Toys by 0xTechno</b>
          </div>
          <div className="mx-auto mb-12 text-center">
            {nftDescription}
            <br />
            <br />
            20% of the proceeds will be donated to the{' '}
            <a rel="noreferrer" target="_blank" href="https://app.endaoment.org/orgs/20-3021444">
              Marine Toys for Tots Foundation
            </a>
            .
          </div>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://twitter.com/0xTechno/status/1606804656382177280"
            className="mx-auto p-3 border border-white"
            style={{ textDecoration: 'none !important' }}
          >
            <FontAwesomeIcon icon={['fab', 'twitter']} /> Learn more on Twitter
          </a>
        </div>
      </section>
    </>
  );
};

export default Section;
