'use client'
import React, { useCallback, useState } from 'react'

const Test = () => {

const a=['anwar','ahmed']
const b=['b','a']
const [test,setTest]=useState(a[0])

    const testFunction=useCallback(()=>{
        console.log(b[1])
    },[b])
  return (
    <div>
<h1 onClick={()=>testFunction()}>test</h1>
<h1>{test}</h1>
<button onClick={()=>{setTest(a[1]);b[0]}}>click</button>
    </div>
  )
}

export default Test