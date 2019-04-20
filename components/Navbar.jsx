import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

function Navbar() {
  return (
    <nav>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/post">
        <a>Posts</a>
      </Link>
      <Link href="/tours">
        <a>Tours</a>
      </Link>
      <style jsx>{`
        color: #b2bdc9;
        text-decoration: none;
        nav {
          background-color: #33363d;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          min-width: 20em;
          height: 100vh;
        }
      `}</style>
    </nav>
  );
}

export default withRouter(Navbar);
