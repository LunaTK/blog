import * as React from 'react';
import ReactMarkdown from 'react-markdown';

export interface Props {
  content: string;
}

function Article(props: Props) {
  const input = '# This is a header\n\nAnd this is a paragraph';
  return <ReactMarkdown source={props.content} />;
}

export default Article;
