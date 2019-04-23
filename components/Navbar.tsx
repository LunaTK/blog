import * as React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import './hamburgers-settings.scss';

//#efeeee
interface Menu {
  title: string;
  href: string;
}

function Navbar() {
  const menus: Menu[] = [
    { title: 'About', href: 'https://lunatk.github.io' },
    { title: 'Posts', href: '/post' }
  ];
  return (
    <nav>
      <div id="nav-content">
        <button className="hamburger hamburger--collapse" type="button">
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>

        {menus.map(m => (
          <Link href={m.href} key={m.title}>
            <a className="menu">{m.title} </a>
          </Link>
        ))}
      </div>
      <style jsx>{`
        #nav-content {
          font-family: 'Quicksand', sans-serif;
          max-width: 768px;
          margin: auto;
          position: relative;
          height: 100%;
          width: 100%;
          display: flex;
          // flex-direction: row-reverse;
          align-items: center;
          padding: 0 5px;
          box-sizing: border-box;
        }
        nav {
          width: 100%;
          height: 50px;
          box-shadow: 0 0px 1px #404040;
        }

        .hamburger {
          position: absolute;
          right: 2px;
          cursor: pointer;
        }

        a {
          color: #404040;
          text-decoration: none;
          margin: 0 40px 0 0;
          transition: transform 0.3s, text-shadow 0.3s;
        }

        a:hover {
          transform: scale(1.1);
          text-shadow: 0px 1px 10px #00000077;
        }

        @media screen and (min-width: 768px) {
          .hamburger {
            display: none;
            pointer-events: none;
          }
        }

        //not pc
        @media screen and (max-width: 767px) {
          .menu {
            display: none;
            pointer-events: none;
          }
        }
      `}</style>
    </nav>
  );
}

export default withRouter(Navbar);
