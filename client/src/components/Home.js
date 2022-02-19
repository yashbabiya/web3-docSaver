import React, { useContext } from 'react'
import { addFile, getFile, init } from '../EthClient'
import { AccountContext } from '../App'
import Ship from "../img/oldship.png"
import Card from './Card';
import EthLogo from '../img/ethLogo.png'
import IPFSLogo from '../img/Ipfs-logo-1024-ice-text.png'
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
export default function Home(props) {
    const account = useContext(AccountContext);
  const location = useLocation();

    return (
        <motion.div 
        key={"2"}
        initial={{ y: 100,opacity:0 }}
        animate={{y:0, x: 0,opacity:1 }}
        exit={{ x: 100,opacity:0 }}
        transition={{ duration: .5 }}
        className="home">
            
            <motion.h1
            // initial={{y:100}}
            // animate={{y:0,rotate:0}}
            
            transition={{duration:0.4}}
            className='hero highlight'><span>A Decentralized Data Storage Drive Build with IPFS and Ethereum BlockChain</span></motion.h1>
            <motion.img
            animate={{y:[0,-100,0]}}
            
            transition={{type: "keyframes",duration:2,repeat: Infinity}}
            onAnimationEnd={{y:0}}
            className="ship" src={Ship} alt="" />
            <Card id="i1" title="Ethereum" des="Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. Amongst cryptocurrencies, Ether is second only to Bitcoin in market capitalization." 
            img={EthLogo}
            />
            <Card id="i2" title="IPFS" des="IPFS is a file sharing system that can be leveraged to more efficiently store and share large files. It relies on cryptographic hashes that can easily be stored on a blockchain." 
            img={IPFSLogo}
            />
            
        </motion.div>
    )
}
