import React, { Component } from "react";
import {Link} from 'react-router-dom';
export class VideoList extends Component {
  render() {
    return (
      <div id="features" className="text-center">
        <div className="container">
          <div className="col-md-10 col-md-offset-1 section-title">
            <h2>Movies to watch</h2>
          </div>
          <div className="row">
            {this.props.data
              ? this.props.data.map((d,i) => (
                  <div  key={`${d.title}-${i}`} className="col-xs-6 col-md-3">
                    {" "}{" "}
                    <img src={d.icon} height="280px" width="280px"></img>
                    <h3>{d.title}</h3>
                    <Link to={{
                            pathname: '/Video',
                            state: {
                              link:d.link,
                              id:d.id,
                              link:d.link
                            }
                          }} >
                  <button
                    
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    View Movie
                  </button>{" "}
                  <br/>
                          </Link>
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    );
  }
}

export default VideoList;
