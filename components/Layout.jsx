import React from 'react';
import Navbar from './Navbar';
// import './common.css';
export default function Layout(props) {
  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <article id="article">{props.children}</article>
      <style jsx global>
        {`
          body {
            margin: 0;
          }
        `}
      </style>
      <style jsx>
        {`
          #article {
            flex: 1;
            padding: 1em;
          }
        `}
      </style>
    </div>
  );
}
