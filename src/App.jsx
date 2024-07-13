import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const [copy, setCopy] = useState("Copy");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) string += "0123456789";
    if (symbolAllowed) string += "`~!@#$%^&*()_+-={}[]|:;,.?/"

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * string.length)
      pass += string.charAt(index);
      setPassword(pass)
      setCopy("Copy")
    }

  }, [setPassword, length, numberAllowed, symbolAllowed])

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, symbolAllowed, generatePassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  const copyClicked = () => {
    setCopy("Copied");
    copyPasswordToClipboard();
  }

  return (
    <div className='body'>
      <div className="main-container">
        <h1>Password Generator</h1>
        <div className="min-container">
          <div className='password'>
            <input type="text" className='password-field' readOnly value={password} ref={passwordRef} />
            <button className='copy' onClick={copyClicked}>{copy}</button>
          </div>
          <div className="settings">
            <input type="range" max={32} min={8} value={length} onChange={(e) => { setLength(e.target.value) }} />
            <label htmlFor="length" style={{ marginLeft: "5px" }}>Length: {length}</label>
            <input style={{ marginLeft: "70px" }} type="checkbox" defaultChecked={numberAllowed} onChange={() => { setNumberAllowed((prev) => !prev) }} />
            <label htmlFor="numberAllowed">Numbers</label>
            <input style={{ marginLeft: "16px" }} type="checkbox" defaultChecked={symbolAllowed} onChange={() => { setSymbolAllowed((prev) => !prev) }} />
            <label htmlFor="symbolAllowed">Symbols</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
