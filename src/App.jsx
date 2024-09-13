import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [len, setLen] = useState(6);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [pass, setPass] = useState('');

  const passref = useRef(null);

  const copypass = useCallback(() => {
    passref.current?.focus();
    passref.current?.select()
    window.navigator.clipboard.writeText(pass)
  }, [pass])
 
  const password = useCallback(() => {
    let mypass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (num) str += '0123456789'
    if (char) str+= '{}[]()/#@$!^_*&.,='

    for (let index = 1; index <= len; index++) {
      const element = Math.floor((Math.random()* str.length) + 1);
      mypass += str.charAt(element);
    }
    setPass(mypass);
  }, [len, num, char, pass]);

  useEffect(() => {
    password()
  } , [len, num, char]);

  

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-700 bg-gray-700 p-5'>
        <h1 className='pb-3 text-center text-white'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={pass}
          className='outline-none w-full py-1 px-3 bg-white-700'
          placeholder='Password'
          readOnly
          ref={passref}
          />
          <button
          onClick={copypass}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2 text-white'>
          <div className="flex items-center gap-x-1">
            <input 
            type="range" 
            className='cursor-pointer'
            min={4}
            max={16}
            value={len}
            onChange={(e) => {setLen(e.target.value)}}
            />
            <label htmlFor="">Length : {len}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox" 
            defaultChecked={num}
            className='cursor-pointer'
            id='numinput'
            onChange={() => {setNum((ele) => !ele)}}
            />
            <label htmlFor="">Number</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox" 
            defaultChecked={num}
            className='cursor-pointer'
            id='numinput'
            onChange={() => {setChar((ele) => !ele)}}
            />
            <label htmlFor="">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

