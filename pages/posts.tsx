import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import Layout from '../components/Layout';
import PostPreview from '../components/PostPreview';
import LinearProgress from '@material-ui/core/LinearProgress';
export const allPostsQuery = gql`
  query {
    posts {
      title
      preview
      _id
      isNotion
      notion
    }
  }
`;

export default function posts() {
  const { loading, error, data } = useQuery(allPostsQuery);
  return (
    <Layout>
      {(() => {
        if (error) {
          return <div>{error}</div>;
        } else if (loading) {
          return <LinearProgress />;
        }
        const posts = data.posts;
        return (
          <div>
            {posts.map(post => (
              <PostPreview post={post} key={post._id} />
            ))}
          </div>
        );
      })()}
    </Layout>
  );
}
