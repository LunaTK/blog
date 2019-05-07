import * as React from 'react';
import Navbar from './Navbar';

export default function Layout(props: any) {
  return (
    <div>
      <Navbar />
      <article id="article">{props.children}</article>
      <style jsx global>
        {`
          @import url('https://fonts.googleapis.com/css?family=Quicksand:300,500');

          body {
            margin: 0;
          }
        `}
      </style>
      <style jsx>
        {`
          #article {
            padding: 10px;
            max-width: 1024px;
            margin: auto;
          }
        `}
      </style>
    </div>
  );
}
