import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import PostEditor from '../components/PostEditor';
import { withRouter } from 'next/router';
import Layout from '../components/Layout';

function editor(props) {
  const [post, setPost] = useState<any>(null);
  const postId = (props.router.query as any).id;

  const postQuery = gql`
    query {
      post(id: ${postId}) {
        _id
        title
        content
      }
    }
  `;

  useEffect(() => {
    props.client
      .query({
        query: postQuery
      })
      .then(({ data: { post } }) => {
        setPost(post);
      });
  }, []);

  return (
    <Layout>
      <PostEditor post={post} />
    </Layout>
  );
}

export default withRouter(withApollo(editor));
