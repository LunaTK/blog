import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import dynamic from 'next/dynamic';
import 'simplemde/dist/simplemde.min.css';

const ISimpleMDE = dynamic(() => import('react-simplemde-v1'), {
  ssr: false
});

function PostEditor() {
  const option = {};

  const onReady = function(instance) {
    console.log(instance.value());
  };

  const onEvents = {
    change: function() {
      // the 'this' variable can get SimpleMDE instance
      console.log(this.value());
    }
  };

  return (
    <ISimpleMDE
      option={option}
      text={'Hello World!!!'}
      onReady={onReady}
      onEvents={onEvents}
    />
  );
}

export default PostEditor;
