pragma solidity >=0.4.22 <0.9.0;

contract Storage{
    struct Files{
        string fname;
        string ftype;
        string fhash;
        string fdate;
        string fsize;
    }


    mapping(address => Files[]) fileStorage;
    mapping(address => uint) counter;
    function addFile(string memory _name,string memory _ftype,string memory _fhash,string memory _fdate,string memory _fsize) public returns(string memory){
        Files memory f = Files(_name,_ftype,_fhash,_fdate,_fsize);
        fileStorage[msg.sender].push(f);
        counter[msg.sender] += 1;
        return "ok";
    }
    
    function unLinkData(uint index) public{
        for(uint i = index; i < counter[msg.sender]-1; i++){
            fileStorage[msg.sender][i] = fileStorage[msg.sender][i+1];      
        }
        counter[msg.sender] -= 1;
        fileStorage[msg.sender].pop();
    }

    function getData() public  view returns(string[] memory,string[] memory,string[] memory,string[] memory,string[] memory){
        
        uint n = counter[msg.sender];
        string[] memory _fname = new string[](n);
        string[] memory _ftype = new string[](n);
        string[] memory _fhash = new string[](n);
        string[] memory _fdate = new string[](n);
        string[] memory _fsize = new string[](n);
        for(uint i=0;i<counter[msg.sender];i++){
            _fname[i] = fileStorage[msg.sender][i].fname;
            _ftype[i] = fileStorage[msg.sender][i].ftype;
            _fhash[i] = fileStorage[msg.sender][i].fhash;
            _fdate[i] = fileStorage[msg.sender][i].fdate;
            _fsize[i] = fileStorage[msg.sender][i].fsize;

        }
        return (_fname,_ftype,_fhash,_fdate,_fsize);
    }
}
