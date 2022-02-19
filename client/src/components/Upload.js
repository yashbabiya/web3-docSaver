import { create } from "ipfs-http-client";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { addFile } from "../EthClient";
// import Xarrow from "react-xarrows";
import IPFSLogo from "../img/Ipfs-logo-1024-ice-text.png";
import MetaMaskLogo from "../img/metamask-logo.png";
import EthLogo from "../img/ethLogo.png";

import Card from "./Card";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

export default function IPFS(props) {
  const [ipfsHash, setIpfsHash] = useState("");
  const [buffer, setBuffer] = useState(null);
  const [isFile, setFile] = useState(null);
  const [fileX, setFileX] = useState(null);
  const [inp, setinp] = useState("");
  const [per, setPer] = useState(0);
  
  
  const captureFile = (event) => {

    if (event.target.files[0]) {
      event.preventDefault();
      setFile(URL.createObjectURL(event.target.files[0]));
      setFileX(event.target.files[0]);
      
      const reader = new FileReader();
      reader.readAsArrayBuffer(event.target.files[0]);
      reader.addEventListener("load", () => {
        setBuffer(reader.result);
      });
    }
  };
  const getFileExt = () => {
    return fileX.name.split(".").pop();
  };

  const getHash = async () => {
    let progress_func = function (len, total) {
      setPer((len / fileX.size) * 100);
    };
    try {
      const uploadResult = await ipfs.add(Buffer.from(buffer), {
        progress: progress_func,
      });
      setIpfsHash(uploadResult.path);

      addFile(
        props.account,
        inp === "" ? fileX.name.split(".").slice(0, -1).join(".") : inp,
        getFileExt(),
        uploadResult.path,
        fileX.size
      );
      console.log(ipfsHash);
    } catch (e) {
      console.log(e);

      return;
    }
  };
  const location = useLocation();
  return (
    <motion.div
    key={"1"}
    initial={{ y: 100,opacity:0 }}
        animate={{y:0, x: 0,opacity:1 }}
        exit={{ x: 100,opacity:0 }}
        transition={{ duration: .5 }}
        
    className="upload">
      <h1>File Upload</h1>
      <div className="uploadCardCover">
        <div className="uploadCard">
          <div className="top">
            <b>Name of Your File : </b>
            <input value={inp} onChange={(e) => setinp(e.target.value)} />
          </div>
          <div className="mid">
            <input type="file" id="file" onChange={captureFile} />
            <motion.label
            whileHover={{scale:1.01}}
            transition={{duration:.1}}
            htmlFor="file">Choose a File{fileX && "*"}</motion.label>
            {/* <img src={ `https://ipfs.io/ipfs/${ipfsHash}` } alt="" /> */}
            <button onClick={() => getHash()}>
              <i class="im im-cloud-upload"></i>
            </button>
          </div>
          <div className="bottom">
            <input type="range" name="" id="" value={per} />
            
          </div>
        </div>
        <div className="instructions">
          <ul>
            <li><b>/01</b> Choose a file</li>
            <li><b>/02</b> Click on the <i class="im im-cloud-upload"></i> button</li>
            <li><b>/03</b> Pay gas fees from your wallet</li>
            <li><b>/04</b> Done !!</li>

          </ul>
        </div>
      </div>

      <div className="processList">
        <div className="bottom">
          <h1><span>What will Happen after uploading your file?</span></h1>
        </div>
        
        <Card
          num="1"
          des="First It will goes to IPFS file system and save your file in a peer
            to peer newtork. And as an output, It will return a hash by which you
            can access your uploaded file"
          img={IPFSLogo}
        />
        
        <Card
          rev="rrev"
          num="2"
          des="Now We will store this hash in blockchain 
          and to do so you have to pay some gas fee
          
           For payment you ‘ll use metamask and 
           through that you ‘ll trasact ethers from 
           Your account to Smart Contract’s Account"
          img={MetaMaskLogo}
        />
        
        <Card
          num="3"
          des="After paying the gas fees we will 
          We will store that hash in Ethereum 
           Blockchain and return it whenever 
           You need that. "
          img={EthLogo}
        />
      </div>
      {/* <div   className="content">
        <h3>
          1. First It will goes to IPFS file system and save your file in a peer
          to peer newtork. And as an output, It will return a hash by which you
          can access your uploaded file
        </h3>

        <img  width="400em" src={IPFSLogo} alt="" />
      </div> */}
    </motion.div>
  );
}
