import React, { useCallback, useEffect, useRef, useState } from "react";

const PasswordComponent = () => {

    const [length, setLength] = useState(10);
    const [number, setNumber] = useState();
    const [characters, setCharacters] = useState();
    const [password, setPassword] = useState("");

    const passwordRef = useRef();

    const copyPassword = useCallback(()=>{
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);
    },[password])

    const generatePassword = useCallback(()=>{
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        if (number) str += '1234567890'
        if (characters) str += '!@#$%^&*(){}[]:">?~!``'
        for (let i = 1; i <= length; i++) {
            let randomIndex = Math.floor(Math.random() *  str.length)
            pass += str.charAt(randomIndex)
        }
        setPassword(pass)
    },[length, number, characters]);

    useEffect(()=>{
        generatePassword()
    },[length, number, characters, generatePassword])

    return(
        <div className="my-8 bg-emerald-400 w-auto">
        <div className="my-4 flex justify-center px-6">
        <input placeholder="password" className="text-color-orange-700 bg-white-700 px-2 py-2 w-full" type="text" value={password} ref={passwordRef} readOnly/>
        <button onClick={copyPassword} className="bg-cyan-400 px-2 py-2 text-lg">Copy</button>
        </div> 
        <div className="flex flex-col justify-between py-4 sm:flex-row">
            <div className="px-4">
            <input type="range"max={99} min={10} value={length} onChange={(e)=>{setLength(e.target.value)}}/>
            <label className="px-2 text-lg">Length {length}</label>
            </div>
            <div className="px-4">
                <input type="checkbox" name="number" id="number" value={number} onChange={()=>{setNumber((prev)=>!prev)}}/>
                <label className="px-2 text-lg">Number</label>
            </div>
            <div className="px-4">
                <input type="checkbox" name="character" id="character" value={number} onChange={()=>{setCharacters((prev)=>!prev)}}/>
                <label className="px-2 text-lg">Character</label>
            </div>
        </div>
        </div>
    )
}

export default PasswordComponent;