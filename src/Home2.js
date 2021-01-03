//import logo from './logo.svg';
//import './App.css';

import PiratesCatcher from './abis/PiratesCatcher.json';
import React, { Component } from 'react';
import Navigation from './components/navigation';
import Header from './components/header.js';
import Features from './components/features';
import About from './components/about';
//import Services from './components/services';
//import Gallery from './components/gallery';
//import Testimonials from './components/testimonials';
//import Team from './components/Team';
import Contact from './components/contact';
import JsonData from './data/data.json';
//import Identicon from 'identicon.js';
import Web3 from 'web3';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import './App.css';


  function Home2() {
    return (
     
      <div>
       
       
        
        <Navigation />
        <Header data={this.state.landingPageData.Header} />
        <Features data={this.state.landingPageData.Features} />
        <About data={this.state.landingPageData.About} />
        <Contact data={this.state.landingPageData.Contact} />
        
      </div>
     
      
        
    );
  }


export default Home2;
