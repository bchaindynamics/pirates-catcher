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
  //import ipfs from '../ipfs';

  const ipfsClient = require('ipfs-http-client');
  const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }); // leaving out the arguments will default to these values
  
  export default class ProductionForm extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        id:0,
        buffer:'',
        ipfshash:'',
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
        alert("account changed")
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
        await this.state.piratescatcher.methods.productionshoot((this.state.id),(this.state.ipfshash).toString()).send({
          from: this.state.account
        });
  
       
        
        
  
        this.setState({
          loading: false,
          id:0,
          ipfshash:'',buffer:''
        });
  
        window.open('/FinalEditing');
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false
         
        });
      }
    }

    handleonsubmit=async(event)=>{
        event.preventDefault();
        alert("on submit");
          console.log("handle submit");
          console.log(this.state.buffer);
          ipfs.files.add(this.state.buffer,(error,result)=>{
            if(error)
            {
            console.error(error);
            return 
            }
            this.setState({ipfshash:result[0].hash});
            console.log('ipfshash',this.state.ipfshash);
          })
      }
      captureFile=event=>{
          alert("hellooooooo");
        event.preventDefault();
        const file=event.target.files[0];
        const reader=new window.FileReader();
        reader.readAsArrayBuffer(file);
    
        reader.onloadend=()=>{
          this.setState({buffer:Buffer(reader.result)});
          console.log("buffer",this.state.buffer);
        }
      }

      uploadImage=(event)=>{
        event.preventDefault();

        alert("hellooooooo");
        console.log("Submitting file to IPFS...");

        console.log(this.state.buffer);
    
        ipfs.add(this.state.buffer,(error,result)=>{
          if(error)
          {
              alert("Error in uploading");
          }
          else
          {
            console.log("ipfs hash",result);
           
          }
        });
        
    
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
        
        <h1 > <font color="white">Production Form</font> < /h1> 
        <Segment inverted color = "grey" >
        <
        Message attached header = 'Welcome to PiratesCatcher'
        content = "Enter your movie's production details"
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
        <h2><font color="black">Cover photo:</font></h2>
        <form>
       <input type="file" onChange={this.captureFile}/>
       <br/>
       <input type="button" name='Upload' value='Upload' className="btn btn-primary" onClick={this.uploadImage}></input>
       </form>
       <br/><br/>
        
        
        
         <
        br / >
        <
        Button loading = {
          this.state.loading
        }
        disabled = {
          this.state.id=='' || this.state.ipfshash==''
        }
        primary onClick = {
          this.handleconf
        }
         > Save and Proceed < /Button>
        
        
        </Form> 
        </Segment>  
        </Segment>
        </div>
      );
    }
  }