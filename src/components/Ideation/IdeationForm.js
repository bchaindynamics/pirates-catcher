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
  
  export default class RegistrationForm extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        id:0,
        coreidea:'',
        producer:'',
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
        alert("accoun changed")
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
       // await this.state.piratescatcher.methods.ideation((this.state.id),(this.state.coreidea).toString(),(this.state.producer).toString()).send({
        //  from: this.state.account
       // });
  
       
        
        
  
        this.setState({
          loading: false,
          id:0,
          coreidea:'',
          producer:''
        });
  
        window.open('/Preproduction');
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
        
        <h1 > <font color="white">Ideation Form</font> < /h1> 
        <Segment inverted color = "grey" >
        <
        Message attached header = 'Welcome to PiratesCatcher'
        content = 'Enter your movie ideas'
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
                <Form.Group widths='equal'>
        <
        Form.Field >
        <
        Input label = "Core Idea"
  
        fluid ref = {
          (input) => {
            this.coreidea = input;
          }
        }
        //labelPosition=""
        value = {
          this.state.coreidea
        }
        onChange = {
          event => this.setState({
            coreidea: event.target.value
          })
        }
        /> 
        </Form.Field>
        </Form.Group>
        <br/>
        <Form.Group widths='equal'>
        <
        Form.Field >
        <
        Input label = " Producer"
        fluid ref = {
          (input) => {
            this.producer = input;
          }
        }
        //  labelPosition=""
        value = {
          this.state.producer
        }
        onChange = {
          event => this.setState({
            producer: event.target.value
          })
        }
        /> 
        </ Form.Field>
  
        </Form.Group><br/>
        
            
        
        <br/>
  
        
        
        
         <
        br / >
        <
        Button loading = {
          this.state.loading
        }
        disabled = {
          this.state.id=='' || this.state.coreidea=='' || this.state.producer==''
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