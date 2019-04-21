import React from 'react';
import ReactMarkdown from 'react-markdown';

function Article(props) {
  const input = '# This is a header\n\nAnd this is a paragraph';
  return <ReactMarkdown source={props.content} />;
}

export default Article;
