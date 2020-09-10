import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../_shared/constants";
import { useHttpClient } from "../../_hooks/http-request";

const Home = () => {
  const { sendRequest } = useHttpClient();

  const [states, setStates] = useState({
    totalEntries: 0,
    doneEntries: 0,
  });

  useEffect(() => {
    shortStats();
  }, []);

  // Retrieves the latest Todo entries
  // * From MongoDB database via backend
  const shortStats = () => {
    sendRequest(`${API_ENDPOINT}/todos`, `GET`).then((response) => {
      let data = response.data;
      let amountDone = 0;
      let amountTotal = data.length;
      data.forEach((row) => {
        amountDone = row.done ? amountDone + 1 : amountDone;
      });
      let percentage = Math.round((amountDone / amountTotal) * 100);
      setStates({
        ...states,
        doneEntries: amountDone,
        totalEntries: amountTotal,
        percentageDone: percentage,
      });
    });
  };

  return (
    <div className="app__home">
      <div>
        <div style={{ fontSize: "1rem" }}>Welcome, your todolist is</div>
        <div style={{ fontSize: "4rem", fontWeight: 700 }}>
          {states.percentageDone}% <span style={{ fontSize: "70%" }}>done</span>
        </div>
        <div>
          ({states.doneEntries}/{states.totalEntries})
        </div>
      </div>
    </div>
  );
};

export default Home;
