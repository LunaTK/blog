import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PostEditor from './PostEditor';

/**
 * Typing Apollo
 * https://www.apollographql.com/docs/react/recipes/static-typing
 */
class AllPostQuery extends Query<any, any> {}

export const allPostsQuery = gql`
  query {
    posts {
      title
      content
    }
  }
`;

function Post(props) {
  const postId = props.postId;
  return <PostEditor postId={postId} />;
  /*
  return (
    <AllPostQuery query={allPostsQuery}>
      {({ loading, error, data: { posts } }) => {
        if (error) {
          return <div>Error!</div>;
        } else if (loading) {
          return <div>Loading</div>;
        }
        console.log(posts);
        return (
          <div>
            <PostEditor postId={postId} post={posts[0]} />
          </div>
        );
      }}
    </AllPostQuery>
  );
  */
}

export default Post;
