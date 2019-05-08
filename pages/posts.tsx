import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Layout from '../components/Layout';
import PostPreview from '../components/PostPreview';
import LinearProgress from '@material-ui/core/LinearProgress';
import Error from 'next/error';

class AllPostQuery extends Query<any, any> {}

export const allPostsQuery = gql`
  query {
    posts {
      title
      preview
      _id
    }
  }
`;

export default function posts() {
  return (
    <Layout>
      <AllPostQuery query={allPostsQuery}>
        {({ loading, error, data: { posts } }) => {
          if (error) {
            return <div>{error}</div>;
          } else if (loading) {
            return <LinearProgress />;
          }
          return (
            <div>
              {posts.map(post => (
                <PostPreview post={post} key={post._id} />
              ))}
            </div>
          );
        }}
      </AllPostQuery>
    </Layout>
  );
}
