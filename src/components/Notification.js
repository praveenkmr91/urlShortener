import React from "react";
import Alert from "react-bootstrap/Alert";


export const Notification = (props) => {
  const { show } = props;
  const { variant, headingText, bodytext, bodytext2 } = props.data;
  return (
    <Alert variant={variant} show={show}>
      <Alert.Heading>{headingText}</Alert.Heading>
      <p>{bodytext}</p>
      <p>{bodytext2}</p>
    </Alert>
  );
}
