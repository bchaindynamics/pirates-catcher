import React, { Component } from "react";

export class Services extends Component {
  render() {
    return (
      <div id="services" className="text-center">
        <h1>Want to report a pirated movie?</h1>
        <button
                    onClick={() => window.open('https://siasky.net/fAAxbH-P071iaudq_xC0xZRUbknWFmOWePb3LEIELea08Q/')}
                    className="btn btn-warning btn-lg page-scroll"
                  >
                    Click here to report
                  </button>{" "}
      </div>
    );
  }
}

export default Services;
