import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Layout from '../components/Layout';
import PostPreview from '../components/PostPreview';

class AllPostQuery extends Query<any, any> {}

export const allPostsQuery = gql`
  query {
    posts {
      title
      content
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
            return <div>Error!</div>;
          } else if (loading) {
            return <div>Loading</div>;
          }
          return (
            <div>
              {posts.map(post => (
                <PostPreview
                  title={post.title}
                  content={post.content}
                  pid={post._id}
                  key={post._id}
                />
              ))}
            </div>
          );
        }}
      </AllPostQuery>
    </Layout>
  );
}
