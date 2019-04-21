import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('for-editor'), {
  ssr: false
});

class PostEditor extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  handleChange(value) {
    this.setState({
      value
    });
  }

  render() {
    const { value } = this.state;
    return <Editor value={value} onChange={this.handleChange.bind(this)} />;
  }
}

export default PostEditor;
