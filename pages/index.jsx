import React, { Component } from 'react';
import Link from 'next/link';
export default class index extends Component {
  render() {
    return (
      <div>
        <div>Hi</div>
        <Link as="/post/타이틀" href={`/post?title=${'타이틀'}`}>
          <a>GO to Post</a>
        </Link>
      </div>
    );
  }
}
