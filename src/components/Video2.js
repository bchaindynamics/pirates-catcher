import React, { Component } from 'react';
//import Identicon from 'identicon.js';
//import './Video.css';
import PiratesCatcher from '../abis/PiratesCatcher.json';
import Web3 from 'web3';
import VideoList from './VideoList';
var CryptoJS = require("crypto-js");
class Video2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      moviehashes:[]
    };

    
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
      var counter=await piratescatcher.methods.counter().call();
      console.log("cc",counter);
      var movie=await piratescatcher.methods.getmovie(counter).call();
      console.log(movie);
      //var checkreporters=await piratescatcher.methods.getReporters(counter).call();
      //console.log(checkreporters);
      var array = [];
      for(var i=1;i<counter;i++)
      {
        console.log("i=",i);
        var movie=await piratescatcher.methods.getmovie(i).call();
        //movie.directoraddress=this.state.account;
        //if(movie.directoraddress==this.state.account)
        //{
            var movieobj=new Object();
            var bytes  = CryptoJS.AES.decrypt(movie.siahash, 'secret');
            var originalsiahash = bytes.toString(CryptoJS.enc.Utf8);
            movieobj.link=`https://siasky.net/${originalsiahash}`;
            movieobj.title=movie.name;
            movieobj.icon=`https://ipfs.io/ipfs/${movie.shoothashes}`;
            movieobj.siahash=originalsiahash;
            //console.log(movieobj.shoothases);
            movieobj.id=movie.id;
            movieobj.account=this.state.account;
            
            array.push(movieobj);

            //reporters
          /* var checkreporters=await piratescatcher.methods.getReporters(i).call();
           console.log(checkreporters);
           if(checkreporters.length!=0)
           {

           }*/
        //}
        //console.log(movie);
      }
      this.setState({moviehashes:array});
    }
   // this.setState({moviehashes:[{"title":"ABCD","icon":"https://ipfs.io/ipfs/QmWRZBfJUC3648KRYH7RLCbnGTTZi7G1VgubzwWXDdYTAP","id":1,"link":"abcd"},{"title":"ABCD","icon":"https://ipfs.io/ipfs/QmWRZBfJUC3648KRYH7RLCbnGTTZi7G1VgubzwWXDdYTAP","id":1,"link":"abcd"},{"title":"ABCD","icon":"https://ipfs.io/ipfs/QmWRZBfJUC3648KRYH7RLCbnGTTZi7G1VgubzwWXDdYTAP","id":1,"link":"abcd"},{"title":"ABCD","icon":"https://ipfs.io/ipfs/QmWRZBfJUC3648KRYH7RLCbnGTTZi7G1VgubzwWXDdYTAP","id":1,"link":"abcd"},{"title":"ABCD","icon":"https://ipfs.io/ipfs/QmWRZBfJUC3648KRYH7RLCbnGTTZi7G1VgubzwWXDdYTAP","id":1,"link":"abcd"}]});
    
    console.log("abcd",this.state.moviehashes);
    
  }
  
 


  render() {
    return (
      <div >
        <VideoList data={this.state.moviehashes} />
      </div>
    );
  }
}

export default Video2;