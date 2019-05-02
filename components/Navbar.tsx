import React, { useState } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import './hamburgers-settings.scss';

interface Menu {
  title: string;
  href: string;
}

function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const menus: Menu[] = [
    { title: 'About', href: 'https://lunatk.github.io' },
    { title: 'Posts', href: '/posts' }
  ];
  return (
    <nav>
      <div id="nav-content">
        <button
          onClick={() => {
            setMenuVisible(!menuVisible);
          }}
          className={`hamburger hamburger--collapse ${
            menuVisible ? 'is-active' : ''
          }`}
          type="button"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
        <div id="menu-box" className={`${menuVisible ? 'open' : ''}`}>
          {menus.map(m => (
            <Link href={m.href} key={m.title}>
              <a className="menu">{m.title} </a>
            </Link>
          ))}
        </div>
      </div>
      <style jsx>{`
        #nav-content {
          font-family: 'Quicksand', sans-serif;
          max-width: 768px;
          margin: auto;
          position: relative;
          height: 100%;
          width: 100%;
          align-items: center;
          padding: 0 5px;
          box-sizing: border-box;
        }

        #menu-box {
          height: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, max-content));
          align-items: center;
        }

        nav {
          width: 100%;
          height: 50px;
          box-shadow: 0 0px 1px #404040;
        }

        .hamburger {
          position: absolute;
          right: 0px;
          cursor: pointer;
          z-index: 10;
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
          #menu-box {
            background: white;
            position: fixed;
            display: grid;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            grid-template-columns: repeat(1, 1fr);
            justify-items: center;
            width: 100%;
            transition: clip-path 1s ease-out;
            clip-path: circle(100px at 90% 10%);
            -webkit-clip-path: circle(100px at 90% 10%);
            visibility: hidden;
          }

          #menu-box.open {
            visibility: visible;
            clip-path: circle(1000px at 90% 10%);
            -webkit-clip-path: circle(1000px at 90% 10%);
          }

          a {
            margin: 0;
          }
        }
      `}</style>
    </nav>
  );
}

export default withRouter(Navbar);
