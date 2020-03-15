import React, { Component, createContext } from "react"

export const AnimationContext = createContext()

class AnimationContextProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spawnMain: false,
      despawnMain: false,
      spawnAbout: false,
      despawnAbout: false,
      despawnMainComplete: false,
      isFirstSpawnMain: true,
      removeLoader: false
    }
  }

  updateContext = (property, value, cb = () => {}) => this.setState({ [property]: value }, cb())

  render() {
    return (
      <AnimationContext.Provider
        value={{
          ...this.state,
          updateContext: this.updateContext
        }}>
        {this.props.children}
      </AnimationContext.Provider>
    )
  }
}

export default AnimationContextProvider
