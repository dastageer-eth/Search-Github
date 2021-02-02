import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="container">
      <h1>404</h1>
      <h3>"Sorry, the page you tried cannot be found"</h3>
      <Link to="/" className= "btn">Back Login
      </Link>
    </div>
  );
};

export default Error;
