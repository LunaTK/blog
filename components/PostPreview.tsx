import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { Post } from './Post';

export type PostPreviewProps = {
  post: Post;
};

const PostPreview: FunctionComponent<PostPreviewProps> = props => {
  const { post } = props;

  return (
    <Link href={post.isNotion ? post.notion! : '/post/[pid]'} as={post.isNotion ? '' : `/post/${post._id}`} prefetch={post.isNotion ? false : true}>
      <a style={{ textDecoration: 'none', color: 'black' }} target={post.isNotion ? '_blank' : ''}>
        <div className="box">
          <h3 className="title">
            {post._id}. {post.title}
          </h3>
          {!post.isNotion && <p className="preview">{post.preview}</p>}
          {post.isNotion && <img style={{ display: 'inline' }} width="32" src="/static/notion.png" />}
        </div>
        <style jsx>{`
          a {
            text-decoration: none;
          }
          .box {
            transition: all 0.3s;
            cursor: pointer;
            box-sizing: border-box;
            position: relative;
            border-radius: 10px;
            padding: 10px;
            box-sizing: border-box;
          }

          .box > * {
            margin: 0;
          }

          .box > *:first-child {
            margin-bottom: 5px !important;
          }

          .box:hover {
            box-shadow: 3px 3px 0 #22222222;
            transform: scale(1.01);
            background: #00000007;
          }

          .preview,
          .title {
            word-break: keep-all;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            box-sizing: border-box;
          }
          .preview {
            margin-left: 2em !important;
          }

          h3 {
            display: inline-block;
          }
        `}</style>
      </a>
    </Link>
  );
};

export default PostPreview;
