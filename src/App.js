import React from "react"
import AppWrap from "./AppWrap"
import AnimationContextProvider from "./AnimationContext"

const App = () => {
  return (
    <AnimationContextProvider>
      <AppWrap />
    </AnimationContextProvider>
  )
}

export default App
