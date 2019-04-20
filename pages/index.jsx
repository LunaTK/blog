import React, { Component } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { withRouter } from 'next/router';
class index extends Component {
  render() {
    return (
      <Layout>
        <div>Hi</div>
        <Link prefetch as="/post/타이틀" href={`/post?title=${'타이틀'}`}>
          <a> GOGO </a>
        </Link>
      </Layout>
    );
  }
}

export default withRouter(index);
