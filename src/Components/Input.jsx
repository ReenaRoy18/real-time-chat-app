import React from 'react'
import '../Stylesheets/input.scss';
import Img from '../img/img.png';
import Attach from '../img/attach.png';

function Input() {
  return (
    <div className='input'>
      <input type="text" placeholder='Type something...' />
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" style={{display:"none"}} id='file' />
        <label htmlFor="">
          <img src={Img} alt="" />
        </label>
        <button>send</button>
      </div>
    </div>
  )
}

export default Input