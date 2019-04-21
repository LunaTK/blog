import React from 'react';
import Post from '../components/Post';
import Layout from '../components/Layout';

function post() {
  return (
    <Layout>
      <div>This is post page</div>
      <Post />
    </Layout>
  );
}

export default post;
