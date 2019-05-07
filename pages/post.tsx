import * as React from 'react';
import Layout from '../components/Layout';
import { withRouter } from 'next/router';
import Post from '../components/Post';

const post = withRouter(props => {
  return (
    <Layout>
      <Post postId={(props.router.query as any).id} />
    </Layout>
  );
});

export default post;
