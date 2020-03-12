import React, { Component, createContext } from "react"

export const AnimationContext = createContext()

class AnimationContextProvider extends Component {
	constructor(props) {
		super(props)
		this.state = {
			spawn: false,
			spawnMain: false,
			despawn: false,
			despawnMain: false,
			$transitionHack: null
		}
	}

	updateState = (property, value, cb = () => {}) => this.setState({ [property]: value }, cb())

	render() {
		return (
			<AnimationContext.Provider
				value={{
					...this.state,
					updateState: this.updateState
				}}>
				{this.props.children}
			</AnimationContext.Provider>
		)
	}
}

export default AnimationContextProvider
