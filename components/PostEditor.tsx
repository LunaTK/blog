import React, { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
// import { Query, ApolloConsumer, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Error from 'next/error';
import { Post } from './Post';
import { useState } from 'react';
import { Mutation } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Router from 'next/router';

export interface ForEditorProps {
  placeholder: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => any;
}

declare global {
  interface Window {
    cloudinary: any;
    ml: any;
  }
}

const UPDATE_POST = gql`
  mutation updatePost($post: PostI!) {
    upsertPost(post: $post) {
      modifiedCount
      upsertedCount
      _id
    }
  }
`;

// https://github.com/kkfor/for-editor
const ForEditor = dynamic<any>(() => import('for-editor'), {
  ssr: false
});

export type PostEditorProps = {
  post: Post;
};

// class PostQuery extends Query<any, any> {}
const PostEditor: FunctionComponent<PostEditorProps> = props => {
  const post: Post = props.post;
  if (post) {
    const [content, setContent] = useState(post.content!);
    const [title, setTitle] = useState(post.title!);
    const [dialog, setDialog] = useState(false);
    return (
      <>
        <Mutation mutation={UPDATE_POST}>
          {(upsertPost, _) => (
            <>
              <button id="upload_widget">Upload files</button>
              <button id="my_btn">my btn</button>
              <TextField
                id="outlined-name"
                label="Title"
                value={title}
                onChange={event => {
                  setTitle(event.target.value);
                }}
                margin="normal"
                variant="outlined"
                fullWidth
              />
              <ForEditor
                placeholder=""
                value={content}
                onChange={setContent}
                onSave={() => {
                  setDialog(true);
                }}
              />
              <Dialog fullScreen={false} open={dialog} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{'Update post?'}</DialogTitle>
                <DialogContent>
                  <DialogContentText>The post will be updated. It cannot be undo.</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setDialog(false);
                    }}
                    color="secondary"
                  >
                    No
                  </Button>
                  <Button
                    onClick={() => {
                      upsertPost({
                        variables: { post: { _id: post._id, title, content } }
                      }).then(result => {
                        Router.push(`/post/${(result as any).data.upsertPost._id}`);
                      });
                    }}
                    color="primary"
                    autoFocus
                  >
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </Mutation>
      </>
    );
  } else {
    return <Error statusCode={404} />;
  }
};

export default PostEditor;
