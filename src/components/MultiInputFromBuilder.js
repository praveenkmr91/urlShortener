import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { validateURL } from "../util/validators";
import { PropTypes } from "prop-types";

export default class MultiInputFromBuilder extends Component {
  state = {
    formValues: {
      urls: ""
    },
    isFormValid: false
  };

  submit = (e) => {
    e.preventDefault();

    let val = this.state.formValues.urls;
    if (!val) {
      this.props.onError('urls cannot be empty', e);
      return;
    }

    let values = val.split(",")
      .map((v) => v.trim()) // remove spaces
      .map((v) => v.replace(/(\r\n|\n|\r)/gm, "")) // remove line breaks
      .filter((v) => v.length > 0) // filter empty

    let validValues = values.filter((v) => validateURL(v));   // filter all valid;
    let inValidValues = values.filter((v) => !validateURL(v));  // filter all invalid 

    if (validValues.length > 0) {
      this.props.onSubmit(validValues, e);
    }

    if (inValidValues.length > 0) {
      this.props.onError({
        bodytext: 'Please check URL(s) you entered',
        bodytext2: inValidValues.join(',')
      }, e);
    }
  };

  // onAddMore = (e) => { };

  handleChange = (event) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        urls: event.target.value
      },
      isFormValid: event.target.value.length > 0
    });
  };

  handleReset = (event) => {
    this.setState({
      ...this.state,
      isFormValid: false,
      formValues: {
        urls: ""
      }
    });
    this.props.onReset();
  };

  render() {
    return (
      <div>
        <Form
          onSubmit={this.submit}
          onReset={this.handleReset}
        >
          <Form.Group as={Row}>
            <Col xs={12}>
              <Form.Label> URL(s) to Shorten </Form.Label>
            </Col>
            <Col xs={12}>
              <InputGroup>
                <Form.Control
                  as="textarea"
                  rows="4"
                  name="urls"
                  placeholder="http://google.com, www.outlook.com"
                  value={this.state.urls}
                  onChange={this.handleChange}
                />
              </InputGroup>
              <span className="notes">(please seperate Url's by comma)</span>
            </Col>
          </Form.Group>

          <Form.Group as={Row} >
            <Col sm={2} className="">
              <Button
                variant="primary"
                type="submit"
                disabled={!this.state.isFormValid}
              >
                Shorten Now
              </Button>
            </Col>
            <Col sm={1} className="">
              <Button variant="primary" type="reset">
                reset
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

MultiInputFromBuilder.defaultProps = {
  onSubmit: () => { },
  onError: () => { },
  onReset: () => { }
};

MultiInputFromBuilder.propTypes = {
  onSubmit: PropTypes.func,
  onError: PropTypes.func,
  onReset: PropTypes.func
};
