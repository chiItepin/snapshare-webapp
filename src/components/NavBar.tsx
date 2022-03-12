import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { IState } from '../reducer';
import logo from '../assets/icon.png';

const NavBar: FunctionComponent = () => {
  const user = useSelector((state: IState) => state.user);

  return (
    <nav className="teal lighten-2">
      <div className="nav-wrapper max-90-p">
        <Link href="/">
          <a className="brand-logo">
            <Image src={logo} alt="home" width={40} height={40} />
          </a>
        </Link>
        <ul className="left hide-on-large-only">
          <li><a href="sass.html"><i className="material-icons">menu</i></a></li>
        </ul>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="/">Sass</a></li>
          <li><a href="badges.html">Components</a></li>

          {!user?._id && (
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
