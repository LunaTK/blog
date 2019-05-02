import * as React from 'react';
import Layout from '../components/Layout';
import { withRouter } from 'next/router';
import Post from '../components/Post';

const post = withRouter(props => {
  return (
    <Layout>
      <h1>포스트 에디터 페이지</h1>
      <Post postId={(props.router.query as any).id} />
    </Layout>
  );
});

export default post;
