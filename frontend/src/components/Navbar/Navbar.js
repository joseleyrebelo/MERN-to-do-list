import React from 'react';

const Header = props => {
  return (
    <header className="main-header">
      <a href="/">Home</a>
      <a href="/stats">Stats</a>
      <a href="/search">Search</a>
      <a href="/edit">Edit</a>
    </header>
  );
};

export default Header;
