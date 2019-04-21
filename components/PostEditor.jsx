import React, { useState, Component } from 'react';
import ReactDOM from 'react-dom';
import dynamic from 'next/dynamic';

// https://github.com/kkfor/for-editor
const Editor = dynamic(() => import('for-editor'), {
  ssr: false
});

export default function PostEditor() {
  const [value, setValue] = useState('');
  return (
    <Editor
      placeholder="Markdown here"
      value={value}
      onChange={setValue}
      onSave={() => alert(value)}
    />
  );
}
