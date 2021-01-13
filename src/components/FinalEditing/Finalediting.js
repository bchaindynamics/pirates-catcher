import React, {
    Component
  } from 'react';
  import ReactDOM from 'react-dom';
  //import Select from 'react-select';
  import PiratesCatcher from '../../abis/PiratesCatcher.json';
  import Web3 from 'web3';
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
  const { SkynetClient } = require('@nebulous/skynet');

  //import { SkynetClient } from "skynet-js";



  export default class FinalEditing extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        id:0,
        siahash:'',
        filename:'',
        extension:'',
        piratescatcher:null
        
      };
      this.captureFile = this.captureFile.bind(this);
      this.getFile = this.getFile.bind(this);
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
     const networkId=await web3.eth.net.getId();
      const networkdata=PiratesCatcher.networks[networkId];
      if(networkdata)
      {
        const piratescatcher=new web3.eth.Contract(PiratesCatcher.abi,networkdata.address);
        console.log(piratescatcher);
        this.setState({piratescatcher});
        const counter=await piratescatcher.methods.counter().call();
        this.setState({id:counter});
      }
      
      
    }
    
    
    //handleClose = () => this.setState({ modalOpen: false })
    getFile=(filePath)=> {
        return filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[0];
    }
   captureFile=(event)=>{
       
       const inputfile=document.forms["siaupload"]["inputfile"].value;
       console.log(inputfile);

       const filename=this.getFile(inputfile.toString());
       console.log(filename);
       const extension=inputfile.split('.')[1];
       console.log(filename);
       console.log(extension);
       this.setState({filename:filename});
       this.setState({extension:extension});
       console.log(this.state.filename);
       console.log(this.state.extension);
   }

   async uploadVideo(event) {
     event.preventDefault();
    try {

      // create a client
      const client = new SkynetClient();
      // upload

      var file=new File([""],'data.txt');
      console.log(file);
      //const skylink = await client.uploadFile(file);
    //console.log(`Upload successful, skylink: ${skylink}`);
      const skylink = await client.uploadFile(file);
      console.log(`Upload successful, skylink: ${skylink}`);
  
      // download
      //await client.downloadFile(skylink);
      //console.log('Download successful');
    } catch (error) {
      console.log(error)
    }
  }

  

   
  
   
    handleconf = async (event) => {
      event.preventDefault();
     
      //console.log(parseInt(this.state.quant)+10);
      //console.log(this.state.id + this.state.toc + this.state.fromc + this.state.fno+this.state.tno+this.state.date+this.state.defcheck+this.state.emailid);
      try {
        //let reacth;
        //let travel;
        //test = (this.state.id + this.state.toc + this.state.fromc + this.state.expl+this.state.quant).toString();
        //test = test.toLowerCase();
        //console.log(test);
        //reacth = crypt.SHA256(test).toString();
        //console.log(reacth);
        //const accounts = await web3.eth.getAccounts();
        //console.log(accounts[0]);
        //await trackpass.methods.storegold(reacth,(this.state.id).toString(),(this.state.quant).toString(),(this.state.toc).toString(),(this.state.fromc).toString(),(this.state.expl).toString(),parseInt(this.state.billamt)).send({
          //from: accounts[0]
        //});
        //alert(this.state.id);
        //alert(this.state.coreidea);
        //alert(this.state.producer);
        await this.state.piratescatcher.methods.finalediting((this.state.id),(this.state.siahash).toString()).send({
          from: this.state.account
        });
  
       
        
        
  
        this.setState({
          loading: false,
          id:0
        });
  
        window.open('/Done');
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false
         
        });
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
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <
        Segment inverted color = 'black'>
        
        <h1 > <font color="white">Final Editing Form</font> < /h1> 
        <Segment inverted color = "grey" >
        <
        Message attached header = 'Welcome to PiratesCatcher'
        content = "Enter your movie's final editing details"
        icon = "searchengin"
        color = 'black' /
        >
        <
        Form >
        <
        br / >
  
  
        <Form.Group widths='equal'>
        <
        Form.Field >
        <
        Input label = "Id"
        fluid ref = {
          (input) => {
            this.id = input;
          }
        }
        //  labelPosition=""
        value = {
          this.state.id
        }
        onChange = {
          event => this.setState({
            id: event.target.value
          })
        }
  
        
        /> 
        </Form.Field>
        </Form.Group>

        <br/>
        <form name="siaupload">
       <input type="file" name="inputfile" onChange={this.captureFile}/>
       <br/>
       <input type="button" name='Upload' value='Upload' className="btn btn-primary" onClick={this.uploadVideo}></input>
       </form>
            
        
        <br/>
  
        
        
        
         <
        br / >
        <
        Button loading = {
          this.state.loading
        }
        disabled = {
          this.state.id=='' || this.state.siahash=='' 
        }
        primary onClick = {
          this.handleconf
        }
         > Submit < /Button>
        
        
        </Form> 
        </Segment>  
        </Segment>
        </div>
      );
    }
  }