import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const added_todos = useSelector((state) => state.counter.added_todos);
  const deleted_todos = useSelector((state) => state.counter.deleted_todos);
  const updated_todos = useSelector((state) => state.counter.updated_todos);
  const failed_adding_todos = useSelector(
    (state) => state.counter.failed_adding_todos
  );
  const failed_operations = useSelector(
    (state) => state.counter.failed_operations
  );

  return (
    <footer className="main-footer">
      <div className="">Open Session Stats</div>
      <hr />
      <div class="stats">Added todos : {added_todos}</div>
      <div class="stats">Deleted todos : {deleted_todos}</div>
      <div class="stats">Updated todos : {updated_todos}</div>
      <div class="stats">Failed todos : {failed_adding_todos}</div>
      <div class="stats">Failed adding todos : {failed_operations}</div>
    </footer>
  );
};

export default Footer;
