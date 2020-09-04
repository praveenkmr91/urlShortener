import React from "react";
import Spinner from "react-bootstrap/Spinner";

export const LoadingSpinner = (props) => <React.Fragment>
  {props.show && (
    <div className="overlay">
      <Spinner
        animation="border"
        role="status"
        variant="primary"
      ></Spinner>
      <span className="spinner-text">Please wait...</span>
    </div>
  )}
</React.Fragment>
