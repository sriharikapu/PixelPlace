
import React, { Component } from 'react';

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="/" className="pure-menu-heading pure-menu-link">PixelPlace</a>
        </nav>
    );
  }
}

export default Nav;
