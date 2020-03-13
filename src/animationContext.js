import React, { Component, createContext } from "react"

export const AnimationContext = createContext()

class AnimationContextProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spawnMain: false,
      despawnMain: false,
      despawnMainComplete: false,
      $transitionHack: null,
      test: null,
      isFirstSpawnMain: true,
      removeLoader: false
    }
  }

  // updating context from child components, if no callback is provided, run an empty function
  updateContext = (property, value, cb = () => {}) => this.setState({ [property]: value }, cb())

  render() {
    return (
      <AnimationContext.Provider
        value={{
          ...this.state,
          updateContext: this.updateContext
        }}
      >
        {this.props.children}
      </AnimationContext.Provider>
    )
  }
}

export default AnimationContextProvider
