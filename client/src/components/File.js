import React from 'react';
import { unLinkData } from '../EthClient';
import {motion} from 'framer-motion'

export default function File({name,date,size,type,hash,inx,fun}) {
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  return <motion.div 
    key={inx}
    animate={{scale:1,rotate:0}}
    initial={{scale:0.8}}
    whileHover={{scale:1.1}}
    onHoverEnd={{rotate:0}}
    exit={{scale:0}}
    transition={{
      default: { duration: .1 },
    }}
  className={`FileCard ${type}`}>
      <div className="top">
        
         
              {type=="png"||type=="jpg"||type=="jpeg"? <div>
                  <img className="preview" src={`https://ipfs.io/ipfs/${hash}`} alt="img"/>
              </div>
               
               : <div><i class="im im-file cardFile"></i></div>}
               <button onClick={async()=>{
                await unLinkData(inx)
                 fun();
                 }}><i class="im im-unlink"></i>
                 </button>
      </div>
      <div className="bottom">
        <a href={`https://ipfs.io/ipfs/${hash}`}>
        <p><b className="filename">{name}</b></p>
        <p><b>{date}</b></p>
        <p><b>{formatBytes(parseInt(size))}</b></p>
        </a>
      </div>
  </motion.div>;
}
