import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../App";
import { init } from "../EthClient";
import {AnimatePresence, motion} from "framer-motion";
import Logo from "./Logo";

export default function Header() {
  // const [account, setAccount] = useState(window.ethereum.selectedAddress);
  const account = useContext(AccountContext);
  const [visible,setVisible] = useState(false);

  return (
    <div className="header">
      <div className="logo">
        <Logo />
      </div>
      <div className="menu">
        <li>
          <span>
            <Link to="/">Home</Link>
          </span>
        </li>
        <li>
          <span>
            <Link to="/lists">Documents</Link>
          </span>
        </li>
        <li>
          <span>
            <Link to="/upload">Upload</Link>
          </span>
        </li>
      </div>
      <div className="acc">
        {account ? (
          <img
            className="account"
            src={`https://avatars.dicebear.com/api/identicon/${account}.svg`}
            alt=""
          />
        ) : (
          <button className="mint" onClick={() => init()}>
            Mint account
          </button>
        )}
      </div>
      <div className="sandwich">
      <i class="im im-plus" onClick={()=>setVisible(!visible)}></i>
        {visible && <AnimatePresence exitBeforeEnter><motion.div
        key="menu"
        initial={{scaleY:0,origin:0,opacity:0,perspective:"top"}}
        animate={{scaleY:1,opacity:1}}
        exit={{scaleY:0}}
        transition={{duration:.5,type:"spring"}}
        className={`sandwichEx `}>
          <li>
            <span>
              <Link to="/">
                <i class="im im-home"></i>
              </Link>
            </span>
          </li>
          <li>
            <span>
              <Link to="/lists">
                <i class="im im-note-o"></i>
              </Link>
            </span>
          </li>
          <li>
            <span>
              <Link to="/upload">
                <i class="im im-cloud-upload"></i>
              </Link>
            </span>
          </li>
          {!account &&<li>
           
          <span>
            
              <i class="im im-leaf"  onClick={() => init()}></i>

          </span>
          </li>
          }
        </motion.div>
        </AnimatePresence>
        }
      </div>
    </div>
  );
}
