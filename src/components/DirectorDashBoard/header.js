import React, { Component } from "react";
import '../../App.css';
import './Director.css';
//import history from '../history';
import {Link} from 'react-router-dom';
export class Header extends Component {
  render() {
    return (
      <header id="header">
        <div className="intro2">
          <div className="overlay2">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1>
                    {this.props.title ? this.props.title : "Loading"}
                    <span></span>
                  </h1>
                  
                  <form>
                    
                  <button
                    onClick={() => window.open('/Video')}
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    New Movie Registration
                  </button>{" "}
                  
                  
                  </form>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </header>
    );
  }
}

export default Header;
