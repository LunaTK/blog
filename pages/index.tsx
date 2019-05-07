import * as React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { withRouter } from 'next/router';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

function index() {
  return (
    <Layout>
      <div>Hi</div>
      <br />
      <Link href={`/lab`}>
        <a>GO to Lab</a>
      </Link>
      <Jazzicon diameter={30} seed={jsNumberForAddress('123')} />
    </Layout>
  );
}

export default withRouter(index);
