import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from 'next/error';
import Head from 'next/head';
import 'github-markdown-css/github-markdown.css';
import marked from '../lib/marked';
import 'highlight.js/styles/tomorrow.css';
import LinearProgress from '@material-ui/core/LinearProgress';
/**
 * Typing Apollo
 * https://www.apollographql.com/docs/react/recipes/static-typing
 */

export interface Post {
  _id?: number;
  title: string;
  content?: string;
  preview?: string;
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
  if (isNaN(props.postId)) return <Error statusCode={400} />;
  const pid = Number(props.postId);
  return (
    <>
      <PostQuery query={postQuery} variables={{ pid }}>
        {({ loading, error, data: { post } }) => {
          if (error) {
            return <div>Error!</div>;
          } else if (loading) {
            return <LinearProgress />;
          } else if (post) {
            return (
              <>
                <Head>
                  <title>{`${post.title} - LunaTK`}</title>
                </Head>
                <div>
                  <h1>{post.title}</h1>
                  <div
                    className="markdown-body"
                    dangerouslySetInnerHTML={{ __html: marked(post.content) }}
                  />
                </div>
              </>
            );
          }
          return <Error statusCode={404} />;
        }}
      </PostQuery>
      <style jsx global>
        {`
          img {
            display: block;
            margin: auto;
          }
        `}
      </style>
    </>
  );
}

export default Post;
