import React from "react";

const Header = (props) => {
  return (
    <header className="main-header">
      <a className="logo" href="/">
        TDo
      </a>
      <a href="/todolist">Todolist</a>
    </header>
  );
};

export default Header;
