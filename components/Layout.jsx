import React from 'react';
import Navbar from './Navbar';
export default function Layout(props) {
  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <article id="article">{props.children}</article>
      <style jsx global>
        {`
          @import url('https://fonts.googleapis.com/css?family=Gugi');

          body {
            margin: 0;
          }
        `}
      </style>
      <style jsx>
        {`
          #article {
            flex: 1;
            padding: 10px;
          }
        `}
      </style>
    </div>
  );
}
