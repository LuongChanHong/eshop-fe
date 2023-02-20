import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailHistory from "./DetailHistory";
import MainHistory from "./MainHistory";

function History(props) {
  return (
    <Routes>
      <Route exact path="*" component={MainHistory} />
      <Route path="/:id" component={DetailHistory} />
    </Routes>
  );
}

export default History;
