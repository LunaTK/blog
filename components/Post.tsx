import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from 'next/error';
import ReactMarkdown from 'react-markdown';

/**
 * Typing Apollo
 * https://www.apollographql.com/docs/react/recipes/static-typing
 */

export interface Post {
  _id: number;
  title: string;
  content: string;
}

export const postQuery = gql`
  query Post($pid: Int!) {
    post(id: $pid) {
      title
      content
    }
  }
`;

class PostQuery extends Query<any, any> {}

function Post(props) {
  const pid = Number(props.postId);
  return (
    <PostQuery query={postQuery} variables={{ pid }}>
      {({ loading, error, data: { post } }) => {
        if (error) {
          return <div>Error!</div>;
        } else if (loading) {
          return <div>Loading</div>;
        } else if (post) {
          return (
            <div>
              <h1>{post.title}</h1>
              <ReactMarkdown source={post.content} />
            </div>
          );
        }
        return <Error statusCode={404} />;
      }}
    </PostQuery>
  );
}

export default Post;
