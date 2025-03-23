import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  // const [count, setCount] = useState(0)
  const [length, setLength] = useState(8);
  const [number, SetNumber] = useState(false);
  const [character, SetCharacter] = useState(false);
  const [password, SetPassword] = useState("");

  const passwordRef = useRef(null);

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*()_+?[]|/.";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    SetPassword(pass);
  }, [length, number, character]);

  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    // window.navigator.clipboard.writeText(password)
  }, [password]);

  useEffect(() => {
    PasswordGenerator();
  }, [length, character, number, PasswordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md
      rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordtoClipboard}
            className="outline-none bg-blue-700 
          text-white px-3 py-0.5 shrink-0"
          >
            copy
          </button>
        </div>


        <div>
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>


            <div className="flex items-center gap-x-1 px-3">
              <input
                type="checkbox"
                defaultChecked={number}
                id="numberInput"
                onChange={() => {
                  SetNumber((prev) => !prev);
                }}
              />
              <label>numbers</label>
            </div>


            <div className="flex items-center gap-x-1 ">
              <input
                type="checkbox"
                defaultChecked={character}
                id="characterInput"
                onChange={() => {
                  SetCharacter((prev) => !prev);
                }}
              />
              <label>character</label>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
