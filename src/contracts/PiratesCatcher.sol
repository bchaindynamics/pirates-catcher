pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract PiratesCatcher
{
    struct Movie
    {
        string id;
        string name;
        string director;
        string writer;
        string genre;
        string language;
        string country;
        string coreidea;
        string producer;
        string cast;
        string budget;
        string shootlocation;
        string shoothashes;
        string siahash;
        string shootdate;
        address directoraddress;
        //uint counter;
    }  
    mapping(string=>Movie) movies;
    mapping(string=>bool) movielist;
    uint counter;
    event RegistrationDone(string id,string name,string director,string writer,string genre,string language,string country,address directoraddress);
    event IdeationDone(string coreidea,string producer);
    event Preproduction(string cast,string budget,string shootlocation);
    event Production(string shoothash,string shootdate);
    event FinalEditingDone(string siahash);
    event CinemaTelecasted(address cinema,string id,string time);
    event PirateReported(address piratecinema,address reporter);
    //Movie m;
    function register(string memory id,string memory name,string memory director,string memory writer,string memory genre,string memory language,string memory country) public
    {
        //director registers movie
        Movie memory m;
        m.id=id;
        m.name=name;
        m.director=director;
        m.writer=writer;
        m.genre=genre;
        m.language=language;
        m.country=country;
        m.directoraddress=msg.sender;
        //m.counter=0;
        movies[id]=m;
        movielist[id]=true;
        emit RegistrationDone(m.id,m.name,m.director,m.writer,m.genre,m.language,m.country,m.directoraddress);
    }
    function ideation(string memory id,string memory coreidea,string memory producer) public
    {
        //director allowed
        require(msg.sender==movies[id].directoraddress);
        Movie memory m=movies[id];
        m.coreidea=coreidea;
        m.producer=producer;
        movies[id]=m;
        emit IdeationDone(m.coreidea,m.producer);
    }
    function preproduction(string memory id,string memory cast,string memory budget,string memory shootlocation)public
    {
        //director allowed
        require(msg.sender==movies[id].directoraddress);
        Movie memory m=movies[id];
        m.cast=cast;
        m.budget=budget;
        m.shootlocation=shootlocation;
        movies[id]=m;
        emit Preproduction(m.cast,m.budget,m.shootlocation);
    }
    function productionshoot(string memory id,string memory ipfshashes,string memory shootdate)public 
    {
        //director allowed
        require(msg.sender==movies[id].directoraddress);
        Movie memory m=movies[id];
        m.shoothashes=ipfshashes;
        //gethashes[m.counter]=ipfshash;
        //m.counter=m.counter+1;
        //m.shoothashes=gethashes;
        m.shootdate=shootdate;
        movies[id]=m;
        emit Production(m.shoothashes,m.shootdate);
    }
    function finalediting(string memory id,string memory siahash)public 
    {
        //director allowed
        require(msg.sender==movies[id].directoraddress);
        Movie memory m=movies[id];
        m.siahash=siahash;
        movies[id]=m;
    }
    function getmovie(string memory id)public view returns(Movie memory)
    {
        //director allowed
        require(msg.sender==movies[id].directoraddress);
        return movies[id];
    }
    function getmoviehash(string memory id)public view returns(string memory)
    {
        //director,3 cinemas allowed
        require(msg.sender==movies[id].directoraddress || msg.sender==0xa79802199A381B3fcd2Bd06c84795627607A7E83 || msg.sender==0x6ac459937a1d1fc58b3f8C615153D91E75106D48 || msg.sender==0xA1B0e0b3a4E8b4E6C897b3fA8eC0a22F89272094);
        return movies[id].siahash;
    }
    function reporterbounty(string memory id,address payable piratecinema,address payable reporter)public payable
    {
        //director allowed
        require(msg.sender==movies[id].directoraddress);
        require(piratecinema==0xa79802199A381B3fcd2Bd06c84795627607A7E83 || piratecinema==0x6ac459937a1d1fc58b3f8C615153D91E75106D48 || piratecinema==0xA1B0e0b3a4E8b4E6C897b3fA8eC0a22F89272094);
        address(reporter).transfer(msg.value);
        emit PirateReported(piratecinema,reporter);
    }
    function cinematelecasted(address cinema,string memory id,string memory time)public
    {
        //3 cinemas allowed
        require(movielist[id]==true);
        require(msg.sender==0xa79802199A381B3fcd2Bd06c84795627607A7E83 || msg.sender==0x6ac459937a1d1fc58b3f8C615153D91E75106D48 || msg.sender==0xA1B0e0b3a4E8b4E6C897b3fA8eC0a22F89272094);
        emit CinemaTelecasted(cinema,id,time);
    }
   
}