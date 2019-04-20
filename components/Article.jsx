import React from 'react';
import ReactMarkdown from 'react-markdown';

function Article(props) {
  const input = '# This is a header\n\nAnd this is a paragraph';
  console.log(props.content);
  return <ReactMarkdown source={props.content} />;
}

export default Article;
