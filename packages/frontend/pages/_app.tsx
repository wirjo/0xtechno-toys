import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faWallet,
  faRocket,
  faDizzy,
  faVoteYea,
  faImages,
  faArrowCircleRight,
  faLevelUpAlt,
  faPeopleCarry,
  faExternalLinkAlt,
  faEnvelope,
  faCircleNotch,
  faCheckCircle,
  faSpinner,
  faExclamationTriangle,
  faInfoCircle,
  faChevronCircleDown,
  faChevronCircleUp,
  faLongArrowAltRight,
  faPlayCircle,
  faVolumeUp,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;
import '@fortawesome/fontawesome-svg-core/styles.css';
library.add(
  fab,
  faWallet,
  faRocket,
  faVoteYea,
  faDizzy,
  faImages,
  faArrowCircleRight,
  faLevelUpAlt,
  faPeopleCarry,
  faExternalLinkAlt,
  faEnvelope,
  faCircleNotch,
  faCheckCircle,
  faSpinner,
  faExclamationTriangle,
  faInfoCircle,
  faChevronCircleDown,
  faChevronCircleUp,
  faLongArrowAltRight,
  faPlayCircle,
  faVolumeUp,
  faVolumeMute,
);

import '../styles/globals.css';
import Head from '../components/layout/Head';
import Layout from '../components/layout/Layout';
import { DAppProvider } from '@usedapp/core';
import { Provider as ReduxProvider } from 'react-redux';
import type { AppProps } from 'next/app';
import store, { useTypedSelector } from '../redux/store';
import { getDappConfig } from '../conf/config';

import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const ConnectedDappProvider: React.FC = ({ children }) => {
  const { currentNetworkChainId } = useTypedSelector((state) => state.app);
  return <DAppProvider config={getDappConfig(currentNetworkChainId)}>{children}</DAppProvider>;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <ReduxProvider store={store}>
      <ConnectedDappProvider>
        <Head />
        {getLayout(<Component {...pageProps} />)}
      </ConnectedDappProvider>
    </ReduxProvider>
  );
}

export default MyApp;
