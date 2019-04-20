import React from 'react';
import Markdown from 'react-markdown';

function Article(props) {
  return <Markdown>{props.children}</Markdown>;
}

export default Article;
