import React, {
    Component
  } from 'react';
  import ReactDOM from 'react-dom';
  //import Select from 'react-select';
  import PiratesCatcher from '../../abis/PiratesCatcher.json';
  import Web3 from 'web3';
  import ReporterComp from './ReporterComp';
  import {
    Form,
    Modal,
    Header,
    Icon,
    Button,
    Input,
    Dropdown,
    Menu,
    Radio,
    Message,
    Segment,
    Checkbox,
    Confirm
  } from 'semantic-ui-react';
  //import {
    //DateInput
  //} from 'semantic-ui-calendar-react';
  //import ipfs from '../ipfs';

  //const ipfsClient = require('ipfs-http-client');
  //const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }); 
  // leaving out the arguments will default to these values
  var CryptoJS = require("crypto-js");
  export default class Reporter extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        totrequests:[],
        piratescatcher:null
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
      //console.log("props",this.props.location.state.id);
      const web3=window.web3;
      const accounts=await web3.eth.getAccounts();
      //var paccount = accounts[0];
      //var oldaccount=this.state.account;
      this.setState({account:accounts[0]});
      window.ethereum.on('accountsChanged', function (accounts) {
        // Time to reload your interface with accounts[0]!
        alert("account changed");
        this.setState({account:accounts[0]});
      }.bind(this));
  
      console.log(web3);
      console.log(accounts);
     // 
     if(this.state.account==0x243DA54F00927E3763b47c57757F5DF2e365124a)
     {
     const networkId=await web3.eth.net.getId();
      const networkdata=PiratesCatcher.networks[networkId];
      if(networkdata)
      {
        const piratescatcher=new web3.eth.Contract(PiratesCatcher.abi,networkdata.address);
        console.log(piratescatcher);
        this.setState({piratescatcher});
        //this.setState({piratescatcher});
        const requestcounter=await this.state.piratescatcher.methods.requestcounter().call();
        var requestarray=[];
        for(var i=1;i<=requestcounter;i++)
        {
            const request=await this.state.piratescatcher.methods.getreporterrequest(i).call();
            console.log(request);
            if(request.fulfill===false)
            {
                var movieobj=new Object();
            movieobj.address=request.reporter;
            var bytes  = CryptoJS.AES.decrypt(request.movielink, 'secret');
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
            movieobj.link=`https://siasky.net/${originalText}`;
            movieobj.requestid=i;
            requestarray.push(movieobj);
            }
        }
        this.setState({totrequests:requestarray});
      }
    }
    else
    {
      alert("Unauthorized Account");
      window.close();
    }
      //this.setState({totrequests:[{address:"0x163613C90525DDf901383cdD32554b969285cea6",link:"https://siasky.net/fAAkADuTZPWz6hirWbrcmb4uVWn2ZsowmAaYv6Qxa1-s1w/",requestid:1}]});
      
      
    }
    
    
    //handleClose = () => this.setState({ modalOpen: false })
    
   
  
    tipImageOwner=(addres,requestid)=>{
      //this.setState({loading:true});
      try {
        //alert("Transact");
        let tipamount=window.web3.utils.toWei('0.1', 'Ether');
        console.log("address",addres);
         this.state.piratescatcher.methods.reporterbounty(addres,addres,requestid).send({from:this.state.account,value:tipamount});
        
        //window.location.reload();
      } 
      catch (error) {
  
      }
      
        
   
  }
    

    
      
    
    
    handleChange = (event, {
      name,
      value
    }) => {
      if (this.state.hasOwnProperty(name)) {
        this.setState({
          [name]: value
        });
      }
    }

    
    
    
  
    render() {
      return ( 
        <div>
            
        <ReporterComp data={this.state.totrequests} tipImageOwner={this.tipImageOwner}/>
        </div>
      );
    }
  }