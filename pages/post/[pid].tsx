import * as React from 'react';
import Layout from '../../components/Layout';
import Post from '../../components/Post';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const post: NextPage = () => {
  const router = useRouter();
  return (
    <Layout>
      <Post postId={router.query.pid as string} />
    </Layout>
  );
};

export default post;
