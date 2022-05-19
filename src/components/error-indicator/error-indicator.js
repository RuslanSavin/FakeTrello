import React from "react";
import "./error-indicator.scss";

const ErrorIndicator = () => {
  return (
    <div className="alert alert-danger" role="alert">
      Something went wrong, please try later
    </div>
  );
};

export default ErrorIndicator;
