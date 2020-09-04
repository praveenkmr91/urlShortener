import React from "react";
import Container from "react-bootstrap/Container";
import { Header } from "./components/layout/Header";
import { Notification } from "./components/Notification";
import { DataTable } from "./components/DataTable";
import MultiInputFromBuilder from "./components/MultiInputFromBuilder";
import { LoadingSpinner } from "./components/LoadingSpinner";
import axios from "axios";
import "./App.css";

export default class App extends React.Component {
  state = {
    loading: false,
    tableRows: [],
    notif: {
      show: false,
      data: {}
    }
  };

  handleClick = (values = [], e) => {
    if (values.length === 0) {
      this.setState({
        notif: {
          show: true,
          data: {
            variant: "danger",
            headingText: "Oh snap! You got an error!",
            bodytext: "URL(s) that you entered is empty.",
          },
        },
      });
      return;
    }

    this.setState({
      ...this.state,
      loading: true
    });

    axios
      .post("http://localhost:5000/api/shorten", {
        urls: values
      })
      .then((res) => {
        this.setState({
          ...this.state,
          tableRows: res.data,
          loading: false
        });
      })
      .catch((e) => {
        this.setState({
          ...this.state,
          loading: false
        });
        alert("something went really bad!!");
      });
  };

  handleError = (data, e) => {
    this.setState({
      ...this.state,
      notif: {
        show: true,
        data: {
          variant: "danger",
          headingText: "Oh snap! You got an error!",
          bodytext: data.bodytext,
          bodytext2: data.bodytext2,
        }
      }
    });
  };

  handleReset = (data, e) => {
    this.setState({
      ...this.state,
      notif: {
        show: false,
        data: {}
      }
    });
  };



  render() {
    return (
      <div className="App">
        <LoadingSpinner show={this.state.loading} />
        <Header title={"URL Shortner"} />
        <Container className="body">
          <Notification
            show={this.state.notif.show}
            data={this.state.notif.data}
          />

          <MultiInputFromBuilder
            onSubmit={this.handleClick}
            onError={this.handleError}
            onReset={this.handleReset}
          />
          <br />
          {this.state.tableRows.length > 0 && (
            <DataTable rows={this.state.tableRows} />
          )}
        </Container>
      </div>
    );
  }
}
