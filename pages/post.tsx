import * as React from 'react';
import Post from '../components/Post';
import Layout from '../components/Layout';

function post() {
  return (
    <Layout>
      <h1>포스트 에디터 페이지</h1>
      <Post />
    </Layout>
  );
}

export default post;
