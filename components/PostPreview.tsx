import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export interface PostPreviewProps {
  pid: number;
  title: string;
  content: string;
}

const PostPreview = (props: PostPreviewProps) => {
  return (
    <Link>
      <a href={`/post/${props.pid}`} id="box">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <style jsx>{`
          #box {
            border: 1px solid black;
            transition: all 0.3s;
            cursor: pointer;
          }

          #box:hover {
            box-shadow: 3px 3px 0 #22222222;
            transform: scale(1.01);
          }
        `}</style>
      </a>
    </Link>
  );
};

PostPreview.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string
};

export default PostPreview;
