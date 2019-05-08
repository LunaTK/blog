import React, { useState } from 'react';
import PostEditor from '../components/PostEditor';
import Layout from '../components/Layout';

export default function newpost() {
  const [post, setPost] = useState({ title: '', content: '' });
  return (
    <Layout>
      <PostEditor post={post} />
    </Layout>
  );
}
