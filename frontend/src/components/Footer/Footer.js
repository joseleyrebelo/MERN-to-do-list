import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const counted = useSelector((state) => state.counter.added_todos);

  return (
    <footer className="main-footer">Footer ; Added todos : {counted}</footer>
  );
};

export default Footer;
