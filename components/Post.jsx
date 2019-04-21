import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Article from './Article';
import PostEditor from './PostEditor';

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
        return (
          <div>
            <Article content={post[0].content} />
            <PostEditor />
          </div>
        );
      }}
    </Query>
  );
}

export default Post;
