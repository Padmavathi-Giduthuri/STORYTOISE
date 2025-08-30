"use client";
//1. Example for useState Hook
{/*"use client"
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

export default function Dashboard() {
  const [color, setColor] = useState("red");
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{color}</p>
      <button type="button" onClick={() => setColor("blue")}>Blue</button>
      <button onClick={() => setColor("red")}>Red</button>
      <button onClick={() => setColor("green")}>Green</button>
      <button onClick={() => setColor("yellow")}>Yellow</button>
      <button onClick={() => setColor("purple")}>Purple</button>
      <button onClick={() => setColor("orange")}>Orange</button>
      <button onClick={() => setColor("pink")}>Pink</button>
      <button onClick={() => setColor("brown")}>Brown</button>
    </div>
  );
}*/}


//2. Example for useContext Hook
{/*import React, { createContext, useContext } from 'react';

const MyValueContext = createContext('Default Value');

function ChildComponent() {
  const sharedValue = useContext(MyValueContext);

  return (
    <div style={{ border: '1px dashed blue', padding: '10px', marginTop: '10px' }}>
      <h3>Child Component</h3>
      <p>I received this value from the Context: <strong>{sharedValue}</strong></p>
      <p>Notice: I did NOT receive it as a prop!</p>
    </div>
  );
}

export default function ParentComponent() {
  const valueToShare = "Hello from the Context Provider!";

  return (
    <MyValueContext.Provider value={valueToShare}>
      <div style={{ border: '2px solid green', padding: '20px' }}>
        <h1>Parent Component (The Provider)</h1>
        <p>I am providing the value: <strong>"{valueToShare}"</strong> to the context.</p>
        <ChildComponent />
      </div>
    </MyValueContext.Provider>
  );
}*/}

//3. Example for useEffect Hook 
{/*import React, { useEffect } from 'react';

export default function Dashboard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
}*/}

//4. Example for useContext Hook 
{/*import React, { createContext, useContext } from 'react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
*/}

//5. Example for useRef Hook
{/*import React, { useRef } from 'react';


export default function Dashboard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <input type="text" ref={inputRef} />
      <button onClick={handleFocus}>Focus</button>
    </div>
  )
}
*/}

//6. Example for useMemo Hook
{/*import React, { useMemo, useState } from 'react';

export default function Dashboard() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  const expensiveCalculation = useMemo(() => {
    return count * 2;
  }, [count]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Count: {count}</p>
      <p>Expensive Calculation: {expensiveCalculation}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <p>Name: {name}</p>
    </div>
  );  
}
*/}

//7. Example for useCallback Hook
import React, { useCallback, useState } from 'react';

export default function Dashboard() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  const handleIncrement = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <p>Name: {name}</p>
    </div>
  );
}

//8. Example for useImperativeHandle Hook 
{/*import React, { useImperativeHandle, useRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../globals.css';

export default function Dashboard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <input type="text" ref={inputRef} />
      <button onClick={handleFocus}>Focus</button>
    </div>
  )
*/}

//9. Example for useLayoutEffect Hook 
{/*import React, { useLayoutEffect, useRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../globals.css';

export default function Dashboard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <input type="text" ref={inputRef} />
      <button onClick={handleFocus}>Focus</button>
    </div>
  )
*/}

//10. Example for useDebugValue Hook 
{/*import React, { useDebugValue, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../globals.css';

export default function Dashboard() {
  const [count, setCount] = useState(0);
  useDebugValue('Count', (count) => count);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
*/}

//11. Example for useTransition Hook    
{/*import React, { useTransition } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../globals.css';

export default function Dashboard() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
*/}
//12. Example for useInsertionEffect Hook 
{/*import React, { useInsertionEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../globals.css';

export default function Dashboard() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
*/}
//13. Example for useSyncExternalStore Hook 
{/*import React, { useSyncExternalStore } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../globals.css';

export default function Dashboard() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
*/}



