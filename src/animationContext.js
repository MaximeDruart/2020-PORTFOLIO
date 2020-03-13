import React, { Component, createContext } from "react"

export const AnimationContext = createContext()

class AnimationContextProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spawn: false,
      spawnMain: false,
      despawn: false,
      despawnMain: false
    }
  }

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
