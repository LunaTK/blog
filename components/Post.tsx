import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-apollo';
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
  isNotion?: boolean;
  notion?: string;
}

export const postQuery = gql`
  query Post($pid: Int!) {
    post(id: $pid) {
      title
      content
    }
  }
`;

type PostProps = {
  postId: string;
};

const Post: FunctionComponent<PostProps> = props => {
  const pid = Number(props.postId);
  if (!pid) return <Error statusCode={400} />;
  const { loading, error, data } = useQuery(postQuery, {
    variables: { pid }
  });

  return (
    <>
      {(() => {
        if (error) {
          return <div>{error}</div>;
        } else if (loading) {
          return <LinearProgress />;
        } else if (data) {
          const post = data.post;
          return (
            <>
              <Head>
                <title>{`${post.title} - LunaTK`}</title>
              </Head>
              <div>
                <h1>{post.title}</h1>
                <div className="markdown-body" dangerouslySetInnerHTML={{ __html: marked(post.content) }} />
              </div>
            </>
          );
        }
        return <Error statusCode={404} />;
      })()}
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
};

export default Post;
