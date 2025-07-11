'use client'
import React, { useCallback, useMemo, useState } from 'react'

const Test = () => {
  const a = ['anwar', 'ahmed']

  // ✅ الحل هنا
  const b = useMemo(() => ['b', 'a'], [])

  const [test, setTest] = useState(a[0])

  const testFunction = useCallback(() => {
    console.log(b[1])
  }, [b]) // ✅ الآن b ثابتة

  return (
    <div>
      <h1 onClick={() => testFunction()}>test</h1>
      <h1>{test}</h1>
      <button onClick={() => setTest(a[1])}>click</button>
    </div>
  )
}

export default Test
