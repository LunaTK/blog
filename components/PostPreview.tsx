import React from 'react';
import Link from 'next/link';
import { Post } from './Post';

export interface PostPreviewProps {
  post: Post;
}

const PostPreview = (props: PostPreviewProps) => {
  const { post } = props;
  return (
    <Link href={`/post/${post._id}`}>
      <div className="box">
        <h3>
          {post._id}. {post.title}
        </h3>
        <p className="preview">{post.preview}</p>
        <style jsx>{`
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

          .preview {
            word-break: keep-all;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            box-sizing: border-box;
            margin-left: 2em !important;
          }
        `}</style>
      </div>
    </Link>
  );
};

export default PostPreview;
