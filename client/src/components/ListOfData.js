import React, { useContext, useEffect, useState } from "react";
import { getAddressBalance, getFile } from "../EthClient";
import { AccountContext } from "../App";
import File from "./File";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function ListOfData(props) {
  const account = useContext(AccountContext);
  const [fname, setFname] = useState([]);
  const [ftype, setFType] = useState([]);
  const [fhash, setFHash] = useState([]);
  const [fdate, setFDate] = useState([]);
  const [fsize, setFsize] = useState([]);
  const [cond, setCond] = useState(ftype);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [totalSize, setTotalSize] = useState(0);
  const [condName, setCondName] = useState(fname);
  const [inp, setInp] = useState("");
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  useEffect(() => {
    getData();
    window.ethereum.on("accountsChanged", (accounts) => {
      getData();
    });
    window.ethereum.on("diconnect", (accounts) => {
      getData();
    });
    
  }, []);


  useEffect(() => {
    setCond(ftype);
    setCondName(fname);
    getUniqueTypes();
    
  }, [ftype, fname]);
  useEffect(() => {
    calcToatalSize();
  }, [fsize]);

  

  const getData = async () => {
    const data = await getFile();
    console.log(data);
    if (data) {
      setFname(data[0]);
      setFType(data[1]);
      setFHash(data[2]);
      setFDate(data[3]);
      setFsize(data[4]);
      
    }
  };
  const calcToatalSize = () => {
    let tSize = 0;
    fsize.map((sz) => {
      tSize += parseInt(sz);
    });
    setTotalSize(tSize);
  };

  const getUniqueTypes = () =>{
    let st = new Set();
    ftype.map((i)=>{
        st.add(i);
    })
    setUniqueTypes(Array.from(st));
  }
  const location = useLocation();

  return (
    <motion.div
    key={"3"}
    initial={{ y: 100,opacity:0 }}
    animate={{y:0, x: 0,opacity:1 }}
    exit={{ x: 100,opacity:0 }}
    transition={{ duration: .5 }}
    className="list">
      <div className="top accountInfo">
        <div className="left">
          <img
            className="account"
            src={`https://avatars.dicebear.com/api/identicon/${account}.svg`}
            alt=""
          />
          <p>{account}-{}</p>
        </div>
        <div className="right">
          <p className="totalData">
            Total Data :{" "}
            <b>
              <span>{formatBytes(parseInt(totalSize))}</span>
            </b>{" "}
          </p>

          <div className="search">
            <p>Search FileName: </p>
            <div>
              <input
                type="text"
                value={inp}
                onChange={(e) => {
                  setInp(e.target.value);
                }}
              />
              <button
                onClick={() =>
                  {inp && setCondName([fname.find((val) => val.startsWith(inp))])}
                }
              >
                <i class="im im-magnifier"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1>All Documents</h1>
      <div className="typeList">
        {uniqueTypes.map((ty) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{duration : .1}}
            className={`typePill ${ty}`}
            onClick={() => setCond([ty])}
          >
            {ty}
          </motion.div>
        ))}
        <div
          className={`typePill`}
          onClick={() => {
            setCond(ftype);
            setCondName(fname);
          }}
        >
          All ({fname.length})
        </div>
      </div>
      <div className="FileList">
        {fname.length ? (
          <>
            {fname.map((st, index) => (
              <>
                {condName.includes(fname[index]) &&
                  cond.includes(ftype[index]) && (
                    <div className="cardCover">
                      <File
                        fun={getData}
                        name={`${st}.${ftype[index]}`}
                        type={ftype[index]}
                        hash={fhash[index]}
                        inx={index}
                        size={fsize[index]}
                        date={fdate[index]}
                      />
                    </div>
                  )}
              </>
            ))}
          </>
        ) : (
          <h3>Nothing</h3>
        )}
      </div>
    </motion.div>
  );
}
