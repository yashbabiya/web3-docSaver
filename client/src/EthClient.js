import Web3 from 'web3';
import  Storage from './contracts/Storage.json';
let account;
export const init = async()=>{
    
    
    //for meta mask
    let provider = window.ethereum;
    
    console.log(provider)
    if(typeof provider !== 'undefined'){
        await provider.request({method:'eth_requestAccounts'}).then(accounts=>{
            account = accounts[0];
            console.log(accounts);
        }).catch((err)=>{
            console.log(err);
        })
    }
    else{
        alert("oo")
    }
}
export const getContractStorage = async() =>{
    const web3 = new Web3(window.ethereum);
    
    const networkId = await web3.eth.net.getId();
    const storage = new web3.eth.Contract(Storage.abi,Storage.networks[networkId].address);
    return storage;

}
export const addFile = async(accoun,name,type,hash,size) =>{
   
    await init();
    if(!account){
        return null;
    }
 
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const storage = await getContractStorage();
    // console.log("_________",hash,account);
    const res = await storage.methods.addFile(name,type,hash,date,size.toString()).send({from:account},(err,res)=>{
        console.log(res);
    });
    console.log(res);
}

export const getFile = async(accoun,cb) =>{
   
    console.log(account);
    await init();
    if(!account){
        return null;
    }
    const storage = await getContractStorage();
    try{
        const res = await storage.methods.getData().call({from:account},(err,res)=>{
            console.log(res);
        })
        console.log(res);
        return res;
        // await storage.methods.getData().call().then((err,res)=>{
        //     console.log(err);
        //     })


    
    }
    catch(e){
        console.log(e);
    }
    return null;
}

export const unLinkData = async(index) =>{
   
    console.log(account);
    await init();
    if(!account){
        return null;
    }
    const storage = await getContractStorage();
    try{
        const res = await storage.methods.unLinkData(index).send({from:account},(err,res)=>{
            console.log(res);
        })
        console.log(res);
    }
    catch(e){
        console.log(e);
    }
}


