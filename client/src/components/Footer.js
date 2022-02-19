import React from 'react';
import Logo from './Logo';

export default function Footer() {
  return <div className='footer'>
      <div className="left">
        ©2022 DocSaver
      </div>
      <div className="mid">
        <Logo/>
      </div>
      <div className="right">
        <div className="social">
            <i class="im im-twitter"></i>
            <i class="im im-linkedin"></i>
            <i class="im im-instagram"></i>


        </div>
      </div>
  </div>;
}
