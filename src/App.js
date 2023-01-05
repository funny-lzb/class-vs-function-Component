import React, { useState } from 'react'
import Counter from './Counter'
import CounterHooks from './CounterHooks'

export const ThemeContext = React.createContext()

function App() {
  const [style, setStyle] = useState('red')
  console.log('App rendered')
  return (
    <ThemeContext.Provider value={{ backgroundColor: style }}>
      Counter
      <Counter />
      CounterHook
      <CounterHooks initialCount={0} />
      <button onClick={handleClick}>Toggle styles</button>
    </ThemeContext.Provider>
  )

  function handleClick() {
    style === 'red' ? setStyle('blue') : setStyle('red')
  }
}

export default App
