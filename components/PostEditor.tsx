import * as React from 'react';
import dynamic from 'next/dynamic';

const { useState, Component } = React;

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

export default function PostEditor() {
  const [value, setValue] = useState('');
  return (
    <ForEditor
      placeholder="Markdown here"
      value={value}
      onChange={setValue}
      onSave={() => alert(value)}
    />
  );
}
