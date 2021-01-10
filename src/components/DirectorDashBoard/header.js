import React, { Component } from "react";
import '../../App.css';
import './Director.css';
//import history from '../history';
import {Link} from 'react-router-dom';
export class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      yourmovies:[{"title":"ABCD","icon":"abcd"}],
      id:500,
      abcd:""
    }
    this.handleinput = this.handleinput.bind(this);
    
  }

  async handleinput()
  {
    const id = prompt("Please enter the id of movie");
    alert(id);

    this.setState({id:id});
    this.setState({abcd:"hello"});

    window.setTimeout(3000);
    alert(this.state.id);
    alert(this.state.abcd);
  }
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
                  <Link to={{
                            pathname: '/Registration',
                            state: {
                              id:0
                            }
                          }} >
                  <button
                    
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    New Movie Registration
                  </button>{" "}
                          </Link>

                          <Link to={{
                            pathname: '/Registration',
                            state: {
                              id:this.state.id
                            }
                          }} >
                  <button
                    onClick={this.handleinput}
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    Already Registered
                  </button>{" "}
                  </Link>
                  
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
