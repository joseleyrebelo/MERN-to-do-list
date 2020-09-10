import React from "react";

const Header = (props) => {
  return (
    <header className="main-header">
      <a href="/">Home</a>
      <a href="/todolist">Todolist</a>
      <a href="/stats">stats</a>
      <a href="/edit">Edit</a>
    </header>
  );
};

export default Header;
