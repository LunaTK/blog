import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from 'next/error';

/**
 * Typing Apollo
 * https://www.apollographql.com/docs/react/recipes/static-typing
 */
export const postQuery = gql`
  query Post($pid: Int!) {
    post(id: $pid) {
      title
      content
    }
  }
`;

function Post(props) {
  const pid = Number(props.postId);
  return (
    <Query query={postQuery} variables={{ pid }}>
      {({ loading, error, data: { post } }) => {
        if (error) {
          return <div>Error!</div>;
        } else if (loading) {
          return <div>Loading</div>;
        } else if (post) {
          return (
            <div>
              <h1>{post.title}</h1>
              <p>{post.content}</p>
            </div>
          );
        }
        return <Error statusCode={404} />;
      }}
    </Query>
  );
}

export default Post;
