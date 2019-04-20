import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const allPostsQuery = gql`
  query {
    post {
      title
      content
      date
      comments {
        author
        content
      }
    }
  }
`;

function Post() {
  return (
    <Query query={allPostsQuery}>
      {({ loading, error, data: { post } }) => {
        if (error) {
          return <div>Error!</div>;
        } else if (loading) {
          return <div>Loading</div>;
        }
        return <div>{post[0].title}</div>;
      }}
    </Query>
  );
}

export default Post;
