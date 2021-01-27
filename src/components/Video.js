import React, { Component } from 'react';
//import Identicon from 'identicon.js';
import './Video.css';
import PiratesCatcher from '../abis/PiratesCatcher.json';
import Web3 from 'web3';
const CryptoJS = require("crypto-js");
class Video extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      moviedirectoraddress:'',
      siahash:'',
      interval:5
    }
 
    
  }
  async componentDidMount()
  {
    await this.loadWeb3();
    await this.loadBlockchainData();
    document.documentElement.webkitRequestFullscreen();
    this.interval = setInterval(this.handlefullscreen, 10000);
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
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
    window.ethereum.on('accountsChanged',function (accounts) {
 
      
      // Time to reload your interface with accounts[0]!
      alert("Account changed");
      window.location.reload();
      if(this.state.account!==this.state.moviedirectoraddress && this.state.account!==0xa79802199A381B3fcd2Bd06c84795627607A7E83 && this.state.account!==0x6ac459937a1d1fc58b3f8C615153D91E75106D48 && this.state.account!==0xA1B0e0b3a4E8b4E6C897b3fA8eC0a22F89272094)
      {
        alert("Unauthorized Account");
        window.close();
      }
      this.setState({account:accounts[0]});
      //if(this.state.account)
      
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
      const  {handle} =this.props.match.params;
      const {id}=this.props.location.state;
      //const {link}=this.props.location.state;
      //this.setState({siahash:link});
      //console.log(icon);
      try {
        //var counter=await piratescatcher.methods.counter().call();
        //console.log("cc",counter);
 
        var siahash=await piratescatcher.methods.getmoviehash(id).call({from:this.state.account});
        var bytes  = CryptoJS.AES.decrypt(siahash, 'secret');
          var originalsiahash = bytes.toString(CryptoJS.enc.Utf8);
          this.setState({siahash:`https://siasky.net/${originalsiahash}`});
          console.log(this.state.siahash);
 
        //console.log("siahash",siahash);
        var movieobj=await piratescatcher.methods.getmovie(id).call({from:this.state.account});
        this.setState({moviedirectoraddress:movieobj.directoraddress});
        
        //console.log(originalhash);
      } catch (error) {
        console.log(error);
          alert("Unauthorized Account");
          window.close();
      }
    }
    
    
  }
 
  handlefullscreen()
  {
    //alert("Handle fs");
    if (document.addEventListener)
    {
     // alert("add event");
     document.addEventListener('fullscreenchange',()=>{alert("Exiting Full Screen is not allowed.");window.close();}, false);
     //document.addEventListener('mozfullscreenchange', exitHandler, false);
     //document.addEventListener('MSFullscreenChange', exitHandler, false);
     document.addEventListener('webkitfullscreenchange',()=>{alert("Exiting Full Screen is not allowed.");window.close();}, false);
     document.addEventListener("keydown", e => {
       alert("You are not allowed to press any key");
       window.close();
      //if(e.key == "F11") e.preventDefault();
  });
    }
    
    
  }
  /* exitHandler()
    {
        alert("handle exit");
        var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
        if(fullscreenElement==null)
        {
          alert("Not fs");
        }
        // if in fullscreen mode fullscreenElement won't be null
    
    }*/
 
  handleinspect(e) 
  {
    alert("key down");
    if(e.keyCode == 123) 
    {
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
    return false;
    }
  }
  
 
 
 
  render() {
    return (
      
      <div onContextMenu={e => e.preventDefault()} onKeyDown={this.handleinspect} tabIndex="0" style={{ width: "100%" }} className="container-fluid mt-5" >
           <center>
      <header>
  
    <video src={this.state.siahash} controls controlsList="nodownload" onKeyDown={e=>e.preventDefault()}></video>
    <div class="overlay">
        <h1 id='abcd'>{this.state.account}</h1>
    </div>
</header>
</center>
      </div>
      
    );
  }
}
 
export default Video;

