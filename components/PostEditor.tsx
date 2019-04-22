import * as React from 'react';
import dynamic from 'next/dynamic';
import { Query, ApolloConsumer, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
const { useState, useEffect } = React;
import Error from 'next/error';

export interface ForEditorProps {
  placeholder: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => any;
}

// https://github.com/kkfor/for-editor
const ForEditor = dynamic<ForEditorProps>(() => import('for-editor'), {
  ssr: false
});

// class PostQuery extends Query<any, any> {}
const PostEditor = props => {
  const { postId, client } = props;
  const [post, setPost] = useState<any>(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const postQuery = gql`
    query {
      post(id: ${postId}) {
        title
        content
      }
    }
  `;
  useEffect(() => {
    client
      .query({
        query: postQuery
      })
      .then(({ data: { post } }) => {
        setPost(post);
        if (post) {
          setContent(post.content);
          setTitle(post.title);
        }
      });
  }, []);

  if (post) {
    return (
      <ForEditor
        placeholder=""
        value={content}
        onChange={setContent}
        onSave={() => alert(content)}
      />
    );
  } else {
    return <Error statusCode={404} />;
  }
};

export default withApollo(PostEditor);
