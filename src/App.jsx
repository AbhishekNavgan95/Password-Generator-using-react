import { useCallback, useState, useEffect,useRef } from 'react'

function App() {
  const [length, setLength] = useState(12);
  const [allowNum, setAllowNum] = useState(true);
  const [allowChar, setAllowChar] = useState(true);
  const [password, setPassword] = useState("");
  const passRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

    if(allowNum) str += "0123456789";
    if(allowChar) str += "!@#$%-_|";

    for(let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, allowNum, allowChar, setPassword]);

  const CopyToClip = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
    alert("Copied to Clipboard")
  }, [password])

  useEffect(()=> {
    passwordGenerator();
  },[length, allowNum, allowChar, setPassword])

  return (
    <>
      <div className='select-none flex flex-col justify-center items-center gap-4 w-full h-screen bg-gray-200'>
        <div className='flex flex-col justify-center items-center gap-8 bg-gray-50 p-10 rounded-3xl'>
        <h1 className='text-center text-7xl text-red-400'>Password Generator</h1>
        <div className='text-4xl input-container flex items-center'>
          <input
          value={password} 
          className='border  border-black outline-none px-6 py-2 rounded-tl-lg rounded-bl-lg'
          placeholder='Password'
          readOnly
          type="text"
          ref={passRef}
          />
          <button
          onClick={CopyToClip} 
          className='px-6 py-2 border border-black bg-red-300 rounded-tr-lg rounded-br-lg transition duration-150 ease-out hover:ease-in hover:bg-red-400'>Copy</button>
        </div>
        <div className=' text-2xl param-container flex flex-col '>
          <div className='flex gap-2'>
            <input 
            defaultChecked={allowChar}
            type="checkbox" 
            name="Char" 
            value={allowChar} 
            id="Char" 
            onChange={() => setAllowChar((e)=> !e)}
            />
            <label htmlFor="Char">Include Charactors</label>
          </div>
          <div className='flex gap-2'>
            <input 
            defaultChecked={allowNum}
            type="checkbox" 
            name="Num" v
            alue={allowNum} 
            id="Num" 
            onChange={() => setAllowNum((e)=> !e)}
            />
            <label htmlFor="Num">Include Number</label>
          </div>
        </div>
        <div className='text-2xl flex gap-4 px-4 py-1 bg-gray-500 rounded-lg'>
          <input 
          type="range" 
          min={8}
          max={15}
          value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <h2>{length}</h2>
        </div>
        </div>
      </div>
    </>
  )
}

export default App
