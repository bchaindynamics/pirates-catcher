//import logo from './logo.svg';
//import './App.css';

import PiratesCatcher from '../abis/PiratesCatcher.json';
import React, { Component } from 'react';
//import Identicon from 'identicon.js';
import Web3 from 'web3';
import './App.css';
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: ''
    }

    
  }

  async componentDidMount()
  {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
  async loadWeb3()
  {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        console.log(window.web3);
        //console.log(web3.eth.getAccounts());
        // Acccounts now exposed
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      console.log(window.web3);
      // Acccounts always exposed
    }
    // Non-dapp browsers...
    else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData()
  {
    const web3=window.web3;
    const accounts=await web3.eth.getAccounts();
    //var paccount = accounts[0];
    //var oldaccount=this.state.account;
    this.setState({account:accounts[0]});
    window.ethereum.on('accountsChanged', function (accounts) {
      // Time to reload your interface with accounts[0]!
      this.setState({account:accounts[0]});
    }.bind(this));

    console.log(web3);
    console.log(accounts);
   // 
   const networkId=await web3.eth.net.getId();
    const networkdata=PiratesCatcher.networks[networkId];
    if(networkdata)
    {
      const piratescatcher=new web3.eth.Contract(PiratesCatcher.abi,networkdata.address);
      console.log(piratescatcher);
    }
    
    
  }
  

  render() {
    return (
      <div>
        <h1>HELLO</h1>
        {this.state.account}
      </div>
      
      
        
    );
  }
}

export default App;
