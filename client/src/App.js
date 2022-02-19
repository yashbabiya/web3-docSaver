import "./App.css";
import { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Upload from "./components/Upload";
import ListOfData from "./components/ListOfData";
import Home from "./components/Home";
import Header from "./components/Header";
import './css/index.css'
import Footer from "./components/Footer";
import {useLocation} from "react-router-dom";
import {AnimatePresence} from 'framer-motion'

export const AccountContext = createContext();
function App() {
  const [account, setAccount] = useState(window.ethereum.selectedAddress);
  useEffect(() => {
    window.ethereum.request({method:'eth_requestAccounts'}).then(accounts=>{
      setAccount(accounts[0]);
      
      }).catch((err)=>{
          console.log(err);
      })
      window.ethereum.on('accountsChanged',(accounts)=>{
        setAccount(accounts[0]);
      })
      window.ethereum.on('disconnect',(accounts)=>{
        setAccount(accounts[0]);
      })
  },[]);
  const location = useLocation();

  return (
    <div className="App">
      <AccountContext.Provider value={account}>
        <AnimatePresence>
        <Header/>
        <Routes>
          <Route  exact path="/" element={<Home account={account}/>} />
          <Route exact path="/lists" element={<ListOfData account={account} />} />
          <Route exact path="/upload" element={<Upload account={account} />} />
        </Routes>
        <Footer/>
        </AnimatePresence>
      </AccountContext.Provider>
    </div>
  );
}

export default App;
