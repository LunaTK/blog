import * as React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

function Navbar() {
  return (
    <nav>
      <div id="upper">
        <div id="title">돌태근의 블로그</div>
        <img
          id="avatar"
          width="50"
          src="https://avatars2.githubusercontent.com/u/15868333?s=460&v=4"
        />
      </div>

      <Link href="/about">
        <a className="category">About</a>
      </Link>
      <Link href="/post">
        <a className="category">Posts</a>
      </Link>
      <Link href="/tours">
        <a className="category">Tours</a>
      </Link>

      <style jsx>{`
        color: #b2bdc9;
        text-decoration: none;
        nav {
          background-color: #33363d;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 0 3px black;
          transition: width 2s ease-in;
          min-height: 100vh;
        }

        @media (min-width: 1024px) {
          nav {
            min-width: 20em;
            height: 100%;
            min-height: 100vh;
          }
        }
        @media (min-width: 400px) and (max-width: 1023px) {
          nav {
            opacity: 0;
            width: 0;
          }
        }

        #avatar {
          position: absolute;
          border-radius: 50%;
          width: 50%;
          bottom: 0;
          left: 0;
          transform: translate(50%, 50%);
        }

        #upper {
          position: relative;
          background-color: #efeeee;
          height: 200px;
          width: 100%;
          margin-bottom: 100px;
        }

        #title {
          color: black;
          font-size: 2em;
          text-align: center;
          margin-top: 20%;
        }

        a.category {
          font-size: 24px;
        }
      `}</style>
    </nav>
  );
}

export default withRouter(Navbar);
